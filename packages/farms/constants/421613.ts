import { arbGoerliTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'ARB-OSCAR LP',
    lpAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
    token: arbGoerliTestnetTokens.oscar,
    quoteToken: arbGoerliTestnetTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'ARB-USDC LP',
    lpAddress: '0x6c02DDb383dEd2e3F41BE9BF8F7503e417820F2B',
    token: arbGoerliTestnetTokens.usdt,
    quoteToken: arbGoerliTestnetTokens.wbnb,
  },
  {
    pid: 2,
    lpSymbol: 'ARB-USDT LP',
    lpAddress: '0x53E2f2AC09921cf9de20541fF724cF2ab1493Ed8',
    token: arbGoerliTestnetTokens.rosh,
    quoteToken: arbGoerliTestnetTokens.wbnb,
  },
  // {
  //   pid: 4,
  //   lpSymbol: 'CAKE-BNB LP',
  //   lpAddress: '0xa96818CA65B57bEc2155Ba5c81a70151f63300CD',
  //   token: bscTestnetTokens.rosh,
  //   quoteToken: bscTestnetTokens.wbnb,
  // },
  // {
  //   pid: 10,
  //   lpSymbol: 'BNB-BUSD LP',
  //   lpAddress: '0x4E96D2e92680Ca65D58A0e2eB5bd1c0f44cAB897',
  //   token: bscTestnetTokens.wbnb,
  //   quoteToken: bscTestnetTokens.busd,
  // },
  // {
  //   pid: 9,
  //   lpSymbol: 'USDC-BUSD LP',
  //   lpAddress: '0xd1742b5eC6798cEB8C791e0ebbEf606A4946f67E',
  //   token: bscTestnetTokens.usdc, // coins[0]
  //   quoteToken: bscTestnetTokens.busd, // coins[1]
  //   stableSwapAddress: '0x1288026D2c5a76A5bfb0730F615131A448f4Ad06',
  //   infoStableSwapAddress: '0xaE6C14AAA753B3FCaB96149e1E10Bc4EDF39F546',
  // },
].map((p) => ({ ...p, token: p.token.serialize, quoteToken: p.quoteToken.serialize }))

export default farms
