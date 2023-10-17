    import { FixedNumber } from '@ethersproject/bignumber'
import { getFullDecimalMultiplier } from './getFullDecimalMultiplier'

export const FIXED_ZERO = FixedNumber.from(0)
export const FIXED_ONE = FixedNumber.from(1)
export const FIXED_TWO = FixedNumber.from(2)

export const FIXED_TEN_IN_POWER_18 = FixedNumber.from(getFullDecimalMultiplier(18))

export const masterChefAddresses = {
  97: '0x3b878a6FCfEa579F7699308907262b4B16bB7Bd9',
  421613: '0x9B2648F04bA32EF3895d4A9b49ae1Ce3e1fd63FC',
  56: '0x355D03Badc44a926E69bFFaB9811a42fFFe51c5D',
}

export const nonBSCVaultAddresses = {
  1: '0x2e71B2688019ebdFDdE5A45e6921aaebb15b25fb',
  421613: '0x9B2648F04bA32EF3895d4A9b49ae1Ce3e1fd63FC',
  97: '0x3b878a6FCfEa579F7699308907262b4B16bB7Bd9',
  56: '0x355D03Badc44a926E69bFFaB9811a42fFFe51c5D',
}
