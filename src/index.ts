import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { BlocksAPI } from './sources/blocks'
import { BlocksQuery } from './queries/blocks'
import { logger } from './helpers/logs'

const resolvers = {
  Query: {
    ...BlocksQuery,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
  dataSources: () => {
    return {
      blocksAPI: new BlocksAPI(),
    }
  },
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}\n`)
})
