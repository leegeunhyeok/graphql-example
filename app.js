const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./src/prisma/generated/prisma-client')
const { init } = require('./src/express')
const resolvers = require('./src/resolver')

const config = require('config')
const jwt = require('jsonwebtoken')

const getUser = token => {
  try {
    if (token) {
      return jwt.verify(token, 'secret')
    }
    return null
  } catch (err) {
    return null
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  resolverValidationOptions :{
    requireResolversForResolveType: false
  },
  context: ({ request }) => {
    const tokenWithBearer = request.headers.authorization || ''
    const token = tokenWithBearer.split(' ')[1]
    const user = getUser(token)

    return {
      user,
      prisma,
    }
  }
})



// Express init
init(server.express)

const port = config.get('port')
server.start({
  port,
  endpoint: '/graphql',
  playground: '/playground',
}, () => console.log(`Server is running on ${port} port`))
