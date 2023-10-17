import { getAddress } from '@ethersproject/address'
import memoize from 'lodash/memoize'
import { ChainId, Token } from '@pancakeswap/sdk'

const mapping = {
  [ChainId.BSC_TESTNET]: 'smartchain',
  // [ChainId.BSC_TESTNET]: 'smartchain',
  [ChainId.ETHEREUM]: 'ethereum',
}

const getTokenLogoURL = memoize(
  (token?: Token) => {
    if (token && mapping[token.chainId]) {
      return `images/tokens/${token.address}.png`
    }
    return null
  },
  (t) => `${t.chainId}#${t.address}`,
)

export default getTokenLogoURL
