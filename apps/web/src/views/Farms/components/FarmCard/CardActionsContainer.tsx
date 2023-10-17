import { useTranslation } from '@pancakeswap/localization'
import { Flex, Skeleton, Text, Button, useModal, useToast } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { useCallback, useContext } from 'react'
import styled from 'styled-components'
import { ToastDescriptionWithTx } from 'components/Toast'
import { HarvestActionContainer, ProxyHarvestActionContainer } from '../FarmTable/Actions/HarvestAction'
import { ProxyStakedContainer, StakedContainer } from '../FarmTable/Actions/StakedAction'
import { FarmWithStakedValue } from '../types'
import BoostedAction from '../YieldBooster/components/BoostedAction'
import { YieldBoosterStateContext } from '../YieldBooster/components/ProxyFarmContainer'
import HarvestAction from './HarvestAction'
import StakeAction from './StakeAction'
import MultiChainHarvestModal from '../MultiChainHarvestModal'
import { getBalanceAmount } from '@pancakeswap/utils/formatBalance'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'
import { usePriceCakeBusd } from 'state/farms/hooks'
import useCatchTxError from 'hooks/useCatchTxError'
import useNonBscHarvestFarm from 'views/Farms/hooks/useNonBscHarvestFarm'
import { useFarmCProxyAddress } from 'views/Farms/hooks/useFarmCProxyAddress'
import { ChainId } from '@pancakeswap/sdk'
import useHarvestFarm from 'views/Farms/hooks/useHarvestFarm'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAppDispatch } from 'state'
import { fetchFarmUserDataAsync } from 'state/farms'

const Action = styled.div`
  padding-top: 16px;
  color: #fff;
`

const ActionContainer = styled.div`
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

interface FarmCardActionsProps {
  farm: FarmWithStakedValue
  account?: string
  addLiquidityUrl?: string
  lpLabel?: string
  displayApr?: string
}

const CardActions: React.FC<React.PropsWithChildren<FarmCardActionsProps>> = ({
  farm,
  account,
  addLiquidityUrl,
  lpLabel,
  displayApr,
}) => {
  const { t } = useTranslation()
  const { pid, token, quoteToken, vaultPid, lpSymbol, lpAddress } = farm
  const { fetchWithCatchTxError, loading: pendingTx } = useCatchTxError()

  const { earnings, earningsWeth, earningsStableCoin } = farm.userData || {}
  const { shouldUseProxyFarm } = useContext(YieldBoosterStateContext)
  const isReady = farm.multiplier !== undefined
  const { stakedBalance, tokenBalance, proxy } = farm.userData
  const rawEarningsBalance = account ? getBalanceAmount(earnings) : BIG_ZERO;
  const {  chainId } = useActiveWeb3React()
  const cakePrice = usePriceCakeBusd()
  // const { cProxyAddress } = useFarmCProxyAddress(account, chainId);
  const { toastSuccess } = useToast()
  const earningsBusd = rawEarningsBalance ? rawEarningsBalance.multipliedBy(cakePrice).toNumber() : 0
  const { onReward } = useHarvestFarm(pid)
  const dispatch = useAppDispatch()

  const onDone = useCallback(
    () => dispatch(fetchFarmUserDataAsync({ account, pids: [pid], chainId })),
    [account, dispatch, chainId, pid],
  )

  // return children({ ...props, onDone, onReward })

  // console.log(earningsWeth)
  
  const onClickHarvestButton = () => {
    if (vaultPid) {
      onPresentNonBscHarvestModal()
    } else {
      handleHarvest()
    }
  }
  const handleHarvest = async () => {
    const receipt = await fetchWithCatchTxError(() => {
      return onReward()
    })
    if (receipt?.status) {
      toastSuccess(
        `${t('Harvested')}!`,
        <ToastDescriptionWithTx txHash={receipt.transactionHash}>
          {t('Your %symbol% earnings have been sent to your wallet!', { symbol: 'AETH' })}
        </ToastDescriptionWithTx>,
      )
      onDone?.()
    }
  }
  const [onPresentNonBscHarvestModal] = useModal(
    <MultiChainHarvestModal
      pid={pid}
      token={token}
      lpSymbol={lpSymbol}
      quoteToken={quoteToken}
      earningsBigNumber={earnings}
      earningsBusd={earningsBusd}
    />,
  )

  return (
    <Action>
  
      <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
      Earn   BNB
        </Text>
      <HarvestActionContainer
        earnings={earnings}
        pid={pid}
        vaultPid={vaultPid}
        token={token}
        quoteToken={quoteToken}
        lpSymbol={lpSymbol}
        harvest="Harvest BNB"
        harvesting="Harvesting BNB"
      >
        {(props) => <HarvestAction {...props} />}
      </HarvestActionContainer>
      </Flex>
      {/* <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
      Earn   ETH
        </Text>
      <HarvestActionContainer
        earnings={earningsWeth}
        pid={pid}
        vaultPid={vaultPid}
        token={token}
        quoteToken={quoteToken}
        lpSymbol={lpSymbol}
        harvest="Harvest ETH"
        harvesting="Harvesting ETH"
      >
        {(props) => <HarvestAction {...props} />}
      </HarvestActionContainer>
      </Flex> */}
      {/* <Flex mb="8px" justifyContent="space-between" alignItems="center">
      <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
      Earn DAI
        </Text>
      <HarvestActionContainer
        earnings={earningsStableCoin}
        pid={pid}
        vaultPid={vaultPid}
        token={token}
        quoteToken={quoteToken}
        lpSymbol={lpSymbol}
        harvest="Harvest USDT"
        harvesting="Harvesting USDT"
      >
        {(props) => <HarvestAction {...props} />}
      </HarvestActionContainer>
      </Flex> */}
      <Button mb={2} disabled={rawEarningsBalance.eq(0) || pendingTx} onClick={onClickHarvestButton} width={300} padding={0}>
        Harvest
      </Button>
      {farm.boosted && (
        <BoostedAction
          title={(status) => (
            <Flex>
              <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px" pr="4px">
                {t('Yield Booster')}
              </Text>
              <Text bold textTransform="uppercase" color="secondary" fontSize="12px">
                {status}
              </Text>
            </Flex>
          )}
          desc={(actionBtn) => <ActionContainer>{actionBtn}</ActionContainer>}
          farmPid={farm.pid}
          lpTotalSupply={farm.lpTotalSupply}
          userBalanceInFarm={
            (stakedBalance.plus(tokenBalance).gt(0)
              ? stakedBalance.plus(tokenBalance)
              : proxy?.stakedBalance.plus(proxy?.tokenBalance)) ?? new BigNumber(0)
          }
        />
      )}
      {/* {isReady ? (
        <Flex>
          <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="4px">
            {farm.lpSymbol}
          </Text>
          <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
            {t('Staked')}
          </Text>
        </Flex>
      ) : (
        <Skeleton width={80} height={18} mb="4px" />
      )} */}
      {!account ? (
        <ConnectWalletButton mt="8px" width="100%" />
      ) : shouldUseProxyFarm ? (
        <ProxyStakedContainer {...farm} lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} displayApr={displayApr}>
          {(props) => <StakeAction {...props} />}
        </ProxyStakedContainer>
      ) : (
        <StakedContainer {...farm} lpLabel={lpLabel} addLiquidityUrl={addLiquidityUrl} displayApr={displayApr}>
          {(props) => <StakeAction {...props} />}
        </StakedContainer>
      )}
    </Action>
  )
}

export default CardActions
