import { useRouter } from 'next/router'
import PageLoader from 'components/Loader/PageLoader'
import { isAddress } from 'utils'
import { RoshiniBunniesAddress } from '../../constants'
import IndividualRoshiniBunnyPage from './RoshiniBunnyPage'
import IndividualNFTPage from './OneOfAKindNftPage'

const IndividualNFTPageRouter = () => {
  const router = useRouter()
  // For RoshiniBunnies tokenId in url is really bunnyId
  const { collectionAddress, tokenId } = router.query

  if (router.isFallback) {
    return <PageLoader />
  }

  const isPBCollection = isAddress(String(collectionAddress)) === RoshiniBunniesAddress
  if (isPBCollection) {
    return <IndividualRoshiniBunnyPage bunnyId={String(tokenId)} />
  }

  return <IndividualNFTPage collectionAddress={String(collectionAddress)} tokenId={String(tokenId)} />
}

export default IndividualNFTPageRouter
