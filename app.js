const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./src/prisma/generated/prisma-client')
const { init } = require('./src/express')
const resolvers = require('./src/resolver')

const config = require('config')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions :{
    requireResolversForResolveType: false
  },
  context: {
    prisma
  }
})

// Express init
init(server.express)

const port = config.get('port')
server.start({
  port,
  endpoint: '/graphql',
  playground: '/playground',
}, () => console.log(`Server is running on http://localhost:${port}`))
