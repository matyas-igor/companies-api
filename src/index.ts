import { ApolloServer } from 'apollo-server'
import { typeDefs } from './schema'
import { CompaniesQuery } from './queries/companies'
import { InfoQuery } from './queries/info'
import { logger } from './helpers/logs'

const resolvers = {
  Query: {
    ...InfoQuery,
    ...CompaniesQuery,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
})

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  logger.info(`🚀  Server ready at ${url}\n`)
})
