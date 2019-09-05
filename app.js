const config = require('config')
const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./src/prisma/generated/prisma-client')

const resolvers = {
  Query: {
    user: (_parent, { id }, context) => {
      return context.prisma.user({ id })
    },
    userTodo: (_parent, { id }, context) => {
      return context.prisma.todos({
        author: { id }
      })
    }
  },
  Mutation: {
    signupUser: (_parent, { username, password, name, email }, context) => {
      return context.prisma.createuser({
        username,
        password,
        name,
        email
      })
    },
    addTodo: (_parent, { content, authorId }, context) => {
      return context.prisma.createtodo({
        content,
        author: {
          connect: {
            id: authorId
          }
        }
      })
    }
  },
  todo: {
    author: ({ id }, _args, context) => {
      return context.prisma.todo({ id }).author()
    }
  },
  user: {
    todos: ({ id }, _args, context) => {
      return context.prisma.user({ id }).todos()
    }
  }
}

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: {
    prisma
  }
})

// Express route
server.express.get('/', (_req, res) => {
  res.send('<h1>Hello!</h1>')
})

const port = config.get('port')
server.start({
  port,
  endpoint: '/graphql',
  playground: '/playground'
}, () => console.log(`Server is running on http://localhost:${port}`))
