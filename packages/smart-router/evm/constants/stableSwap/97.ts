import { bscTestnetTokens } from '@pancakeswap/tokens'

import { StableSwapPool } from '../../types/pool'

export const pools: StableSwapPool[] = [
  {
    lpSymbol: 'USDC-BUSD LP',
    lpAddress: '0x5D422EfeFB33409A45fdCB2abf3dCAF249174df1',
    token: bscTestnetTokens.usdc, // coins[0]
    quoteToken: bscTestnetTokens.busd, // coins[1]
    stableSwapAddress: '0x1288026D2c5a76A5bfb0730F615131A448f4Ad06',
    infoStableSwapAddress: '0xaE6C14AAA753B3FCaB96149e1E10Bc4EDF39F546',
  },
]
