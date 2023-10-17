import { ChainId, ERC20Token, WBNB } from '@pancakeswap/sdk'
import { BUSD_TESTNET, ROSH_TESTNET } from './common'

export const bscTestnetTokens = {
  wbnb: WBNB[ChainId.BSC_TESTNET],

  rosh: ROSH_TESTNET,
  busd: BUSD_TESTNET,
  usdc: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0xCA8eB2dec4Fe3a5abbFDc017dE48E461A936623D',
    18,
    'USDC',
    'Binance-Peg USD Coin',
  ),
  hbtc: new ERC20Token(ChainId.BSC_TESTNET, '0x3Fb6a6C06c7486BD194BB99a078B89B9ECaF4c82', 18, 'HBTC', 'Huobi BTC'),
  wbtc: new ERC20Token(ChainId.BSC_TESTNET, '0xfC8bFbe9644e1BC836b8821660593e7de711e564', 8, 'WBTC', 'Wrapped BTC'),
  usdt: new ERC20Token(ChainId.BSC_TESTNET, '0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96', 18, 'USDT', 'Tether USD'),

  mockBusd: new ERC20Token(
    ChainId.BSC_TESTNET,
    '0x3304dd20f6Fe094Cb0134a6c8ae07EcE26c7b6A7',
    18,
    'BUSD',
    'Binance USD',
  ),
}
