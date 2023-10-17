import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import { BLOCKS_PER_YEAR } from 'config'
import lpAprs56 from 'config/constants/lpAprs/56.json'
import lpAprs1 from 'config/constants/lpAprs/1.json'
import lpAprs421613 from 'config/constants/lpAprs/421613.json'
import lpAprs42161 from 'config/constants/lpAprs/42161.json'
import { BIG_ZERO } from '@pancakeswap/utils/bigNumber'

const getLpApr = (chainId: number) => {
  switch (chainId) {
    case ChainId.BSC:
      return lpAprs56
    case ChainId.ETHEREUM:
      return lpAprs1
    case ChainId.GOERLI:
      return lpAprs421613
      case ChainId.BSC_TESTNET:
        return lpAprs42161
    default:
      return {}
  }
}

/**
 * Get the APR value in %
 * @param stakingTokenPrice Token price in the same quote currency
 * @param rewardTokenPrice Token price in the same quote currency
 * @param totalStaked Total amount of stakingToken in the pool
 * @param tokenPerBlock Amount of new cake allocated to the pool for each new block
 * @returns Null if the APR is NaN or infinite.
 */
export const getPoolApr = (
  stakingTokenPrice: number,
  rewardTokenPrice: number,
  totalStaked: number,
  tokenPerBlock: number,
): number => {
  const totalRewardPricePerYear = new BigNumber(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR)
  const totalStakingTokenInPool = new BigNumber(stakingTokenPrice).times(totalStaked)
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100)
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber()
}

/**
 * Get farm APR value in %
 * @param poolWeight allocationPoint / totalAllocationPoint
 * @param cakePriceUsd Cake price in USD
 * @param poolLiquidityUsd Total pool liquidity in USD
 * @param farmAddress Farm Address
 * @returns Farm Apr
 */
export const getFarmApr = (
  chainId: number,
  poolWeight: BigNumber,
  cakePriceUsd: BigNumber,
  poolLiquidityUsd: BigNumber,
  farmAddress: string,
  regularMonkPerBlock: number,
): { monkRewardsApr: number; lpRewardsApr: number } => {
  const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.times(BLOCKS_PER_YEAR * regularMonkPerBlock)
    : new BigNumber(NaN)
  const monkRewardsApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(poolLiquidityUsd).times(100)
  let monkRewardsAprAsNumber = null
  if (!monkRewardsApr.isNaN() && monkRewardsApr.isFinite()) {
    monkRewardsAprAsNumber = monkRewardsApr.toNumber()
  }

  // console.log(chainId,poolWeight.toString(), cakePriceUsd,poolLiquidityUsd, farmAddress, regularMonkPerBlock)
  const lpRewardsApr = (getLpApr(chainId)[farmAddress?.toLowerCase()] || getLpApr(chainId)[farmAddress]) ?? 0 // can get both checksummed or lowercase
  return { monkRewardsApr: 1, lpRewardsApr:10 }
}

export const getFarmAprLocal = (
  chainId: number,
  farmAddress: string,
  totalLiquidity: BigNumber,
  cakePriceUsd: BigNumber,
  ethPrice: BigNumber,
  oscarPerSec
): { oscarApr: number; wethApr: number, stableApr: number } => {
  const poolInfo = (getLpApr(chainId)[farmAddress?.toLowerCase()] || getLpApr(chainId)[farmAddress]) ?? null
  // console.log(cakePriceUsd)
  // const oscarPoolWeight = Number(poolInfo.oscarAllocPoint) / Number(poolInfo.oscarPoolWeight) 
  
  const oscarPoolWeight =  poolInfo?.oscarAllocPoint ? new BigNumber(Number(poolInfo.oscarAllocPoint) / Number(poolInfo.oscarPoolWeight)) : BIG_ZERO
  const yearlyCakeRewardAllocation = oscarPoolWeight
    ? oscarPoolWeight.times(BLOCKS_PER_YEAR * oscarPerSec)
    : new BigNumber(NaN)

  const oscarApr = yearlyCakeRewardAllocation.times(cakePriceUsd).div(totalLiquidity).times(100)
  
  // const ethPrice = new BigNumber(1860)
  const usdtPrice = new BigNumber(1)

  const wethPoolWeight =  poolInfo?.wethAllocPoint ? new BigNumber(Number(poolInfo.wethAllocPoint) / Number(poolInfo.wethPoolWeight)) : BIG_ZERO
  const yearlyCakeRewardAllocationWeth = wethPoolWeight
    ? wethPoolWeight.times(BLOCKS_PER_YEAR * 0.000001182033097)
    : new BigNumber(NaN)

  const wethApr = yearlyCakeRewardAllocationWeth.times(ethPrice).div(totalLiquidity).times(100)
  
  const stablePoolWeight =  poolInfo?.stableAllocPoint ? new BigNumber(Number(poolInfo.stableAllocPoint) / Number(poolInfo.stablePoolWeight)) : BIG_ZERO
  const yearlyCakeRewardAllocationWethStable = stablePoolWeight
    ? wethPoolWeight.times(BLOCKS_PER_YEAR * 0.002927400468)
    : new BigNumber(NaN)

  const stableApr = yearlyCakeRewardAllocationWethStable.times(usdtPrice).div(totalLiquidity).times(100)

  // console.log(oscarApr.toString(), wethApr.toString(), stableApr.toString())
  // const lpRewardsApr = (getLpApr(chainId)[farmAddress?.toLowerCase()] || getLpApr(chainId)[farmAddress]) ?? 0 // can get both checksummed or lowercase
  return { oscarApr: Number(oscarApr), wethApr:Number(wethApr), stableApr:Number(stableApr) }
}

export default null
