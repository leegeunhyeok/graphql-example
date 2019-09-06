/**
 * Resolvers
 */
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = {
  Query: {
    currentUser: (_parent, _args, { user, prisma }) => {
      if (!user) {
        throw new Error('Not Authenticated')
      }
      return prisma.user({ id: user.id })
    }
  },
  Mutation: {
    register: async (_parent, { username, password }, ctx) => {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = await ctx.prisma.createUser({
        username,
        password: hashedPassword
      })
      return user
    },
    login: async (_parent, { username, password }, ctx) => {
      const user = await ctx.prisma.user({ username })
    
      if (!user) {
        throw new Error('Invalid Login')
      }
    
      const passwordMatch = await bcrypt.compare(password, user.password)
    
      if (!passwordMatch) {
        throw new Error('Invalid Login')
      }
    
      const token = jwt.sign(
        {
          id: user.id,
          username: user.email
        },
        'secret',
        { expiresIn: '1d' }
      )

      return {
        token,
        user
      }
    }
  },
  User: {
    todos: ({ id }, _args, context) => {
      return context.prisma.User({ id }).todos()
    }
  },
  Todo: {
    user: ({ id }, _args, context) => {
      return context.prisma.Todo({ id }).user()
    }
  }
}
