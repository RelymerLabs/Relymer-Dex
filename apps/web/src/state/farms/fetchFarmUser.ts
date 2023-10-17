import BigNumber from 'bignumber.js'
import { ChainId } from '@pancakeswap/sdk'
import erc20ABI from 'config/abi/erc20.json'
import masterchefABI from 'config/abi/masterchef.json'
import masterchefABIB from 'config/abi/masterchefB.json'
import nonBscVault from 'config/abi/nonBscVault.json'
import multicall, { multicallv2 } from 'utils/multicall'
import { getMasterChefAddress, getNonBscVaultAddress } from 'utils/addressHelpers'
import { SerializedFarmConfig } from 'config/constants/types'
import { verifyBscNetwork } from 'utils/verifyBscNetwork'
import { getCrossFarmingReceiverContract } from 'utils/contractHelpers'
import { farmFetcher } from 'state/farms'

export const fetchFarmUserAllowances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
  proxyAddress?: string,
) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  // const masterChefAddress = isBscNetwork ? getMasterChefAddress(chainId) : getNonBscVaultAddress(chainId)
  // console.log('fa', farmsToFetch)
  const masterChefAddress = getMasterChefAddress(chainId)
  
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = farm.lpAddress
    return { address: lpContractAddress, name: 'allowance', params: [account, /*proxyAddress ||*/ masterChefAddress] }
  })

  const rawLpAllowances = await multicall<BigNumber[]>(erc20ABI, calls, chainId)
  const parsedLpAllowances = rawLpAllowances.map((lpBalance) => {  
    return new BigNumber(lpBalance).toJSON()
  })
  // console.log(parsedLpAllowances)
  return parsedLpAllowances
}

export const fetchFarmUserTokenBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
) => {
  const calls = farmsToFetch.map((farm) => {
    const lpContractAddress = farm.lpAddress
    return {
      address: lpContractAddress,
      name: 'balanceOf',
      params: [account],
    }
  })

  const rawTokenBalances = await multicall(erc20ABI, calls, chainId)
  const parsedTokenBalances = rawTokenBalances.map((tokenBalance) => {
    return new BigNumber(tokenBalance).toJSON()
  })
  // console.log('u', parsedTokenBalances)
  return parsedTokenBalances
}

export const fetchFarmUserStakedBalances = async (
  account: string,
  farmsToFetch: SerializedFarmConfig[],
  chainId: number,
) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  // const masterChefAddress = isBscNetwork ? getMasterChefAddress(chainId) : getNonBscVaultAddress(chainId)
  const masterChefAddress = getMasterChefAddress(chainId)

  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'userInfo',
      params: [farm.vaultPid ?? farm.pid, account],
    }
  })
  
  // console.log('before', isBscNetwork, calls, chainId)
  
  const rawStakedBalances = await multicallv2({
    abi: isBscNetwork ? chainId === 56? masterchefABIB: masterchefABI : nonBscVault,
    calls,
    chainId,
    options: { requireSuccess: false },
  })

  // console.log('after', isBscNetwork)

  const parsedStakedBalances = rawStakedBalances.map((stakedBalance) => {
    return new BigNumber(stakedBalance[0]._hex).toJSON()
  })

  return parsedStakedBalances
}

export const fetchFarmUserEarnings = async (account: string, farmsToFetch: SerializedFarmConfig[], chainId: number) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  const multiCallChainId = chainId //farmFetcher.isTestnet(chainId) ? ChainId.BSC_TESTNET : ChainId.GOERLI
  const userAddress = account;// isBscNetwork ? account : await fetchCProxyAddress(account, multiCallChainId)
  const masterChefAddress = getMasterChefAddress(multiCallChainId)


  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingOscar',
      params: [farm.pid, userAddress],
    }
  })
  
  const rawEarnings = await multicallv2({ abi: masterchefABI, calls, chainId: multiCallChainId })
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })

  // console.log("earning",parsedEarnings)

  return parsedEarnings
}


export const fetchFarmUserWethEarnings = async (account: string, farmsToFetch: SerializedFarmConfig[], chainId: number) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  if(chainId === 56)
    return ["0", "0"]
  const multiCallChainId = chainId //farmFetcher.isTestnet(chainId) ? ChainId.BSC_TESTNET : ChainId.GOERLI
  const userAddress = account;// isBscNetwork ? account : await fetchCProxyAddress(account, multiCallChainId)
  const masterChefAddress = getMasterChefAddress(multiCallChainId)


  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingWETH',
      params: [farm.pid, userAddress],
    }
  })
  
  const rawEarnings = await multicallv2({ abi: masterchefABI, calls, chainId: multiCallChainId })
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })

  // console.log("earning",parsedEarnings)

  return parsedEarnings
}


export const fetchFarmStableEarnings = async (account: string, farmsToFetch: SerializedFarmConfig[], chainId: number) => {
  const isBscNetwork = verifyBscNetwork(chainId)
  if(chainId === 56)
    return ["0", "0"];
  const multiCallChainId = chainId //farmFetcher.isTestnet(chainId) ? ChainId.BSC_TESTNET : ChainId.GOERLI
  const userAddress = account// isBscNetwork ? account : await fetchCProxyAddress(account, multiCallChainId)
  const masterChefAddress = getMasterChefAddress(multiCallChainId)


  const calls = farmsToFetch.map((farm) => {
    return {
      address: masterChefAddress,
      name: 'pendingStableCoin',
      params: [farm.pid, userAddress],
    }
  })
  
  const rawEarnings = await multicallv2({ abi: masterchefABI, calls, chainId: multiCallChainId })
  const parsedEarnings = rawEarnings.map((earnings) => {
    return new BigNumber(earnings).toJSON()
  })

  // console.log("earning",parsedEarnings)

  return parsedEarnings
}

export const fetchCProxyAddress = async (address: string, chainId: number) => {
  try {
    const crossFarmingAddress = getCrossFarmingReceiverContract(null, chainId)
    const cProxyAddress = await crossFarmingAddress.cProxy(address)
    return cProxyAddress.toString()
  } catch (error) {
    console.error('Failed Fetch CProxy Address', error)
    return address
  }
}
