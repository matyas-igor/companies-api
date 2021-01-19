import 'apollo-cache-control'
import { paginate } from '../helpers/utils'

export const BlocksQuery = {
  blocks: async (_source, { date, offset, limit }, { dataSources }, info) => {
    info.cacheControl.setCacheHint({ maxAge: 300 })
    const blocks = await dataSources.blocksAPI.getBlocks(date)
    return {
      total: blocks.length,
      blocks: paginate(blocks, offset, limit),
    }
  },

  block: async (_source, { hash }, { dataSources }, info) => {
    info.cacheControl.setCacheHint({ maxAge: 300 })
    return await dataSources.blocksAPI.getBlockByHash(hash)
  },

  transactions: async (_source, { hash, offset, limit }, { dataSources }, info) => {
    info.cacheControl.setCacheHint({ maxAge: 300 })
    const block = await dataSources.blocksAPI.getBlockByHash(hash)
    return {
      total: block.tx.length,
      transactions: paginate(block.tx, offset, limit),
    }
  },
}
