import { useAccount } from 'wagmi'
import { NftToken, ApiResponseCollectionTokens } from 'state/nftMarket/types'
import useSWR from 'swr'
import {
  getNftsMarketData,
  getMetadataWithFallback,
  getRoshiniBunniesAttributesField,
  combineApiAndSgResponseToNftToken,
} from 'state/nftMarket/helpers'
import { FAST_INTERVAL } from 'config/constants'
import { FetchStatus } from 'config/constants/types'
import { formatBigNumber } from '@pancakeswap/utils/formatBalance'
import { RoshiniBunniesAddress } from '../constants'
import { getLowestUpdatedToken } from './useGetLowestPrice'

type WhereClause = Record<string, string | number | boolean | string[]>

const fetchCheapestBunny = async (
  whereClause: WhereClause = {},
  nftMetadata: ApiResponseCollectionTokens,
): Promise<NftToken> => {
  const nftsMarket = await getNftsMarketData(whereClause, 100, 'currentAskPrice', 'asc')

  if (!nftsMarket.length) return null

  const nftsMarketTokenIds = nftsMarket.map((marketData) => marketData.tokenId)
  const lowestPriceUpdatedBunny = await getLowestUpdatedToken(RoshiniBunniesAddress.toLowerCase(), nftsMarketTokenIds)

  const cheapestBunnyOfAccount = nftsMarket
    .filter((marketData) => marketData.tokenId === lowestPriceUpdatedBunny?.tokenId)
    .map((marketData) => {
      const apiMetadata = getMetadataWithFallback(nftMetadata.data, marketData.otherId)
      const attributes = getRoshiniBunniesAttributesField(marketData.otherId)
      const bunnyToken = combineApiAndSgResponseToNftToken(apiMetadata, marketData, attributes)
      const updatedPrice = formatBigNumber(lowestPriceUpdatedBunny.currentAskPrice)
      return {
        ...bunnyToken,
        marketData: { ...bunnyToken.marketData, ...lowestPriceUpdatedBunny, currentAskPrice: updatedPrice },
      }
    })
  return cheapestBunnyOfAccount.length > 0 ? cheapestBunnyOfAccount[0] : null
}

export const useRoshiniBunnyCheapestNft = (bunnyId: string, nftMetadata: ApiResponseCollectionTokens) => {
  const { address: account } = useAccount()
  const { data, status, mutate } = useSWR(
    nftMetadata && bunnyId ? ['cheapestBunny', bunnyId, account] : null,
    async () => {
      const allCheapestBunnyClause = {
        collection: RoshiniBunniesAddress.toLowerCase(),
        otherId: bunnyId,
        isTradable: true,
      }
      if (!account) {
        return fetchCheapestBunny(allCheapestBunnyClause, nftMetadata)
      }

      const cheapestBunnyOtherSellersClause = {
        collection: RoshiniBunniesAddress.toLowerCase(),
        currentSeller_not: account.toLowerCase(),
        otherId: bunnyId,
        isTradable: true,
      }
      const cheapestBunnyOtherSellers = await fetchCheapestBunny(cheapestBunnyOtherSellersClause, nftMetadata)
      return cheapestBunnyOtherSellers ?? fetchCheapestBunny(allCheapestBunnyClause, nftMetadata)
    },
    { refreshInterval: FAST_INTERVAL },
  )

  return {
    data,
    isFetched: [FetchStatus.Failed, FetchStatus.Fetched].includes(status),
    refresh: mutate,
  }
}
