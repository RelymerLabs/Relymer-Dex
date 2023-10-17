import { Grid } from '@pancakeswap/uikit'
import orderBy from 'lodash/orderBy'
import { CollectibleLinkCard } from '../../components/CollectibleCard'
import useAllRoshiniBunnyNfts from '../../hooks/useAllRoshiniBunnyNfts'
import GridPlaceholder from '../../components/GridPlaceholder'

interface CollectionNftsProps {
  address: string
  sortBy?: string
}

const RoshiniBunniesCollectionNfts: React.FC<React.PropsWithChildren<CollectionNftsProps>> = ({
  address,
  sortBy = 'updatedAt',
}) => {
  const allRoshiniBunnyNfts = useAllRoshiniBunnyNfts(address)

  const sortedNfts = allRoshiniBunnyNfts
    ? orderBy(allRoshiniBunnyNfts, (nft) => (nft.meta[sortBy] ? Number(nft?.meta[sortBy]) : 0), [
        sortBy === 'currentAskPrice' ? 'asc' : 'desc',
      ])
    : []

  if (!sortedNfts.length) {
    return <GridPlaceholder />
  }

  return (
    <>
      <Grid
        gridGap="16px"
        gridTemplateColumns={['1fr', null, 'repeat(3, 1fr)', null, 'repeat(4, 1fr)']}
        alignItems="start"
      >
        {sortedNfts.map((nft) => {
          return <CollectibleLinkCard key={`${nft?.tokenId}-${nft?.collectionName}`} nft={nft} />
        })}
      </Grid>
    </>
  )
}

export default RoshiniBunniesCollectionNfts
