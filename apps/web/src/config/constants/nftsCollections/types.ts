import { Address } from '../types'

export enum RoshiniCollectionKey {
  ROSHINI = 'Roshini',
  SQUAD = 'roshiniSquad',
}

export type RoshiniCollection = {
  name: string
  description?: string
  slug: string
  address: Address
}

export type RoshiniCollections = {
  [key in RoshiniCollectionKey]: RoshiniCollection
}
