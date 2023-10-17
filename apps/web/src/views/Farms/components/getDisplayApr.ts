export const getDisplayApr = (monkRewardsApr?: number, lpRewardsApr?: number) => {
  // console.log(monkRewardsApr, lpRewardsApr)
  if (monkRewardsApr && lpRewardsApr) {
    return (monkRewardsApr + lpRewardsApr).toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  if (monkRewardsApr) {
    return monkRewardsApr.toLocaleString('en-US', { maximumFractionDigits: 2 })
  }
  return null
}
