import { useRouter } from 'next/router'
import PageLoader from 'components/Loader/PageLoader'
import RoshiniCollectibles from './RoshiniCollectibles'

const RoshiniCollectiblesPageRouter = () => {
  const router = useRouter()

  if (router.isFallback) {
    return <PageLoader />
  }

  return <RoshiniCollectibles />
}

export default RoshiniCollectiblesPageRouter
