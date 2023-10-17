import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useProfileContract } from 'hooks/useContract'
import { useProfile } from 'state/profile/hooks'
import multicall from '../../utils/multicall'
import profileABI from '../../config/abi/roshiniProfile.json'
import { useNftsForAddress } from '../Nft/market/hooks/useNftsForAddress'


const ProfilePicture: React.FC = () => {
  const { address: account } = useAccount()
  const [isProfileNftsLoading, setIsProfileNftsLoading] = useState(true)
  const [userProfileCreationNfts, setUserProfileCreationNfts] = useState(null)
  const profileContract = useProfileContract(false)
  const { isLoading: isProfileLoading, profile } = useProfile()
  const { nfts, isLoading: isUserNftLoading } = useNftsForAddress(account, profile, isProfileLoading)

  useEffect(() => {
    const fetchUserRoshiniCollectibles = async () => {
      try {
        const nftsByCollection = Array.from(
          nfts.reduce((acc, value) => {
            acc.add(value.collectionAddress)
            return acc
          }, new Set<string>()),
        )

        if (nftsByCollection.length > 0) {
          const nftRole = await profileContract.NFT_ROLE()
          const collectionsNftRoleCalls = nftsByCollection.map((collectionAddress) => {
            return {
              address: profileContract.address,
              name: 'hasRole',
              params: [nftRole, collectionAddress],
            }
          })
          const collectionRolesRaw = await multicall(profileABI, collectionsNftRoleCalls)
          const collectionRoles = collectionRolesRaw.flat()
          setUserProfileCreationNfts(
            nfts.filter((nft) => collectionRoles[nftsByCollection.indexOf(nft.collectionAddress)]),
          )
        } else {
          setUserProfileCreationNfts(null)
        }
      } catch (e) {
        console.error(e)
        setUserProfileCreationNfts(null)
      } finally {
        setIsProfileNftsLoading(false)
      }
    }
    if (!isUserNftLoading) {
      setIsProfileNftsLoading(true)
      fetchUserRoshiniCollectibles()
    }
  }, [nfts, profileContract, isUserNftLoading])

  if (!userProfileCreationNfts?.length && !isProfileNftsLoading) {
    return (
      <>
      </>
    )
  }

  return (
    <>
    </>
  )
}

export default ProfilePicture
