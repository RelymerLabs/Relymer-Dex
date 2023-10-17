import Ajv from 'ajv'
import schema from '../schema/roshiniswap.json'

export const tokenListValidator = new Ajv({ allErrors: true }).compile(schema)
