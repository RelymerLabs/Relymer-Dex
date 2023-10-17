import { useFarmUser } from 'state/farms/hooks'
import { Farm as FarmUI, FarmTableFarmTokenInfoProps } from '@pancakeswap/uikit'

const { FarmTokenInfo } = FarmUI.FarmTable

const Farm: React.FunctionComponent<React.PropsWithChildren<FarmTableFarmTokenInfoProps>> = ({
  token,
  quoteToken,
  label,
  pid,
  isReady,
  isStable,
}) => {
  const { stakedBalance } = useFarmUser(pid)

  return (
    <FarmTokenInfo
      pid={pid}
      label={label}
      token={token}
      quoteToken={quoteToken}
      isReady={isReady}
      isStable={isStable}
      stakedBalance={stakedBalance}
      />
  )
}

export default Farm
