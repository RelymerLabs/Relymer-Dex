import { ChainId, ERC20Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, ROSH_TESTNET } from './common'

export const arbTestnetTokens = {
  // wbnb: WBNB[ChainId.BSC_TESTNET],
  // oscar: new ERC20Token(ChainId.BSC_TESTNET, '0xe77e0C559494585aC396A91BF35fB164E272b896', 18, 'OSCAR', 'OSCAR Token'),
  // arb: new ERC20Token(ChainId.BSC_TESTNET, '0x912CE59144191C1204E64559FE8253a0e49E6548', 18, 'ARB', 'ARB Token'),

  wbnb: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped ETH',
  ),

  wbnbSushi: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    18,
    'WETH',
    'Wrapped ETH',
  ),
  rosh: ROSH_TESTNET,
  busd: BUSD_TESTNET,
  syrup: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x409164845071cD19801141f60A5b2e9629f18eb3',
    18,
    'SYRUP',
    'SyrupBar Token',
    'localhost:3000/',
  ),
  bake: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
    18,
    'BAKE',
    'Bakeryswap Token',
    'https://www.bakeryswap.org/',
  ),
  hbtc: new ERC20Token(ChainId.BSC_TESTNET, '0x3Fb6a6C06c7486BD194BB99a078B89B9ECaF4c82', 18, 'HBTC', 'Huobi BTC'),
  wbtc: new ERC20Token(ChainId.BSC_TESTNET, '0xfC8bFbe9644e1BC836b8821660593e7de711e564', 8, 'WBTC', 'Wrapped BTC'),
  usdt: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
    6,
    'USDT',
    'USDT Token',
  ),
}
