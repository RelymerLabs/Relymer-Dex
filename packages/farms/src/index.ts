import { formatEther } from '@ethersproject/units'
import { MultiCallV2 } from '@pancakeswap/multicall'
import { ChainId } from '@pancakeswap/sdk'
import { masterChefAddresses } from './const'
import { farmV2FetchFarms, FetchFarmsParams, fetchMasterChefV2Data } from './fetchFarms'
import { BigNumber, FixedNumber } from '@ethersproject/bignumber'

const supportedChainId = [ChainId.BSC_TESTNET, ChainId.GOERLI, ChainId.BSC]
export const bCakeSupportedChainId = [ChainId.BSC_TESTNET, ChainId.GOERLI]

export function createFarmFetcher(multicallv2: MultiCallV2) {
  const fetchFarms = async (
    params: {
      isTestnet: boolean
    } & Pick<FetchFarmsParams, 'chainId' | 'farms'>,
  ) => {
    const { isTestnet, farms, chainId } = params
    const masterChefAddress = masterChefAddresses[chainId]
    // console.log('hiiii')
    const { poolLength, oscarTotalAllocPoint, WETHTotalAllocPoint, oscarPerSec } = await fetchMasterChefV2Data({
      isTestnet,
      multicallv2,
      masterChefAddress,
    })

    // console.log('ll', poolLength, oscarTotalAllocPoint, WETHTotalAllocPoint, oscarPerSec, isTestnet, masterChefAddress, chainId)


    const oscarPerSec1 = formatEther(oscarPerSec)
    // console.log('ll4', poolLength, oscarTotalAllocPoint, WETHTotalAllocPoint, oscarPerSec, isTestnet, masterChefAddress, chainId)

    const farmsWithPrice = await farmV2FetchFarms({
      multicallv2,
      masterChefAddress,
      isTestnet,
      chainId,
      farms: farms.filter((f) => !f.pid || poolLength.gt(f.pid)),
      oscarTotalAllocPoint,
      WETHTotalAllocPoint,
    })

    // console.log('ll', poolLength, oscarTotalAllocPoint, WETHTotalAllocPoint, oscarPerSec)

    // console.log('me gere')
    return {
      farmsWithPrice,
      poolLength: poolLength.toNumber(),
      oscarPerSec: +oscarPerSec1,
    }
  }
  return {
    fetchFarms,
    isChainSupported: (chainId: number) => supportedChainId.includes(chainId),
    supportedChainId,
    isTestnet: (chainId: number) => ![ChainId.BSC, ChainId.ETHEREUM].includes(chainId),
  }
}

export * from './apr'
export * from './farmsPriceHelpers'
export * from './types'
