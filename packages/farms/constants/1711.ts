import { bscTestnetTokens } from '@pancakeswap/tokens'
import { SerializedFarmConfig } from '@pancakeswap/farms'

const farms: SerializedFarmConfig[] = [
  /**
   * These 3 farms (PID 0, 2, 3) should always be at the top of the file.
   */
  {
    pid: 0,
    lpSymbol: 'ARB',
    lpAddress: '0xCD6Db4eC90e6e7Ed78C85d50be162c3d19490552',
    token: bscTestnetTokens.syrup,
    quoteToken: bscTestnetTokens.wbnb,
  },
  {
    pid: 1,
    lpSymbol: 'USDT-ARB LP',
    lpAddress: '0x6c02DDb383dEd2e3F41BE9BF8F7503e417820F2B',
    token: bscTestnetTokens.usdt,
    quoteToken: bscTestnetTokens.rosh,
  },
  // {
  //   pid: 2,
  //   lpSymbol: 'BUSD-AETH LP',
  //   lpAddress: '0x96AFCF30C0B65629866FDe90d31121bd6f7954B5',
  //   token: bscTestnetTokens.busd,
  //   quoteToken: bscTestnetTokens.rosh,
  // },
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
