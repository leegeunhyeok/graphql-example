/**
 * Resolvers
 */

module.exports = {
  Query: {
    user: (_parent, { id }, context) => {
      return context.prisma.user({ id })
    },
    todoes: (_parent, { id }, context) => {
      return context.prisma.todos({
        where: {
          author: { id }
        }
      })
    }
  },
  Mutation: {
    createUser: (_parent, { data: { username, password, name, email } }, context) => {
      return context.prisma.createUser({
        username,
        password,
        name,
        email
      })
    },
    createTodo: (_parent, { content, authorId }, context) => {
      return context.prisma.createTodo({
        data: {
          content,
          author: {
            connect: {
              id: authorId
            }
          }
        }
      })
    }
  },
  User: {
    tags: ({ id }, _args, context) => {
      return context.prisma.User({ id }).tags()
    },
    todos: ({ id }, _args, context) => {
      return context.prisma.User({ id }).todos()
    },
    notes: ({ id }, _args, context) => {
      return context.prisma.User({ id }).notes()
    }
  },
  Tag: {
    user: ({ id }, _args, context) => {
      return context.prisma.Tag({ id }).user()
    },
    todos: ({ id }, _args, context) => {
      return context.prisma.Tag({ id }).todos()
    }
  },
  Todo: {
    tag: ({ id }, _args, context) => {
      return context.prisma.Todo({ id }).tag()
    },
    author: ({ id }, _args, context) => {
      return context.prisma.Todo({ id }).author()
    }
  },
  Note: {
    author: ({ id }, _args, context) => {
      return context.prisma.Note({ id }).author()
    }
  }
}
