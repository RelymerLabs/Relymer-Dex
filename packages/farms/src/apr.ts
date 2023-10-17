import { FixedNumber } from '@ethersproject/bignumber'
import { FarmWithPrices } from './farmPrices'

// copy from src/config, should merge them later
const BSC_BLOCK_TIME = 3
const BLOCKS_PER_YEAR = (60 / BSC_BLOCK_TIME) * 60 * 24 * 365 // 10512000

const FIXED_ZERO = FixedNumber.from(0)
const FIXED_100 = FixedNumber.from(100)

export const getFarmMonkRewardApr = (farm: FarmWithPrices, cakePriceBusd: FixedNumber, oscarPerSec: number) => {
  let monkRewardsAprAsString = '0'
  if (!cakePriceBusd) {
    return monkRewardsAprAsString
  }
  const totalLiquidity = FixedNumber.from(farm.lpTotalInQuoteToken).mulUnsafe(
    FixedNumber.from(farm.quoteTokenPriceBusd),
  )
  const poolWeight = FixedNumber.from(farm.poolWeight)
  if (totalLiquidity.isZero() || poolWeight.isZero()) {
    return monkRewardsAprAsString
  }
  const yearlyCakeRewardAllocation = poolWeight
    ? poolWeight.mulUnsafe(FixedNumber.from(BLOCKS_PER_YEAR).mulUnsafe(FixedNumber.from(String(oscarPerSec))))
    : FIXED_ZERO
  const monkRewardsApr = yearlyCakeRewardAllocation
    .mulUnsafe(cakePriceBusd)
    .divUnsafe(totalLiquidity)
    .mulUnsafe(FIXED_100)
  if (!monkRewardsApr.isZero()) {
    monkRewardsAprAsString = monkRewardsApr.toUnsafeFloat().toFixed(2)
  }
  return monkRewardsAprAsString
}
