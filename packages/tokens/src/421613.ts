import { ChainId, ERC20Token, WETH9 } from '@pancakeswap/sdk'
import { USDC_GOERLI } from './common'

export const arbGoerliTestnetTokens = {
  wbnb: new ERC20Token(ChainId.GOERLI, '0x0488DE6b5592ec03c800e45a6350F53c9cd2324d', 18, 'WETH', 'Wrapped ETH'),
  syrup: new ERC20Token(ChainId.GOERLI, '0x409164845071cD19801141f60A5b2e9629f18eb3', 18, 'SYRUP', 'SyrupBar Token'),
  rosh: new ERC20Token(ChainId.GOERLI, '0xCD6Db4eC90e6e7Ed78C85d50be162c3d19490552', 18, 'MONK', 'Monk Token'),
  usdt: new ERC20Token(ChainId.GOERLI, '0x311434A472af3dF043EB04996b07D4eA3Be413f6', 18, 'USDT', 'Theter USD'),
}
