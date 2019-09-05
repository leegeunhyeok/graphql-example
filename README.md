# graphql-example
☝️ GraphQL + Prisma + MongoDB Example!

## Getting started

### Requirement

- Docker (with docker-compose)
- Node.js

### Config

```bash
# Install Node.js dependencies
npm i

# Create prisma server & MongoDB 
cd src/prisma && docker-compose up -d
```

### Schema

```graphql
# src/schema.graphql

type Query {
  user(id: ID!): user,
  userTodo(id: ID!): [todo!]!
}

type Mutation {
  signupUser(username: String!, password: String!, name: String!, email: String!): user!
  addTodo(content: String!, authorId: ID!): todo!
}

type todo {
  id: ID!
  content: String!
  author: user!
}

type user {
  id: ID!
  username: String!
  password: String!
  name: String
  email: String!
  todos: [todo!]!
}
```

## Run

```bash
node app.js
```

- Prisma
  - Playground - [localhost:4466](localhost:4466)
  - Admin - [localhost:4466/_admin](localhost:4466/_admin)
- Node.js
  - GraphQL Endpoint - `localhost{CONFIG.PORT}/graphql`
  - Playground - `localhost:{CONFIG.PORT}/playground`

```graphql
# Add user
mutation {
  signupUser(
    username: "test00"
    password: "1234"
    name: "user"
    email: "test@test.com"
  ) {
    id # USER_OBJECT_ID
    username
    name
    email
  }
}

# Add TODO Items
mutation {
  addTodo(
    content: "First TODO!"
    authorId: "USER_OBJECT_ID"
  ) {
    author {
      username
      email
    }
    content
  }
}

mutation {
  addTodo(
    content: "Second TODO!"
    authorId: "USER_OBJECT_ID"
  ) {
    author {
      username
      email
    }
    content
  }
}

# Query
query {
  user(id: USER_OBJECT_ID) {
    username
    email
    todos {
      id
      content
    }
  }
}
```

Result

```json
// User registered
{
  "data": {
    "signupUser": {
      "id": "5d71115e24aa9a0007abeed2",
      "username": "test00",
      "name": "user",
      "email": "test@test.com"
    }
  }
}

// TODO Item Added
{
  "data": {
    "addTodo": {
      "author": {
        "username": "test00",
        "email": "test@test.com"
      },
      "content": "First TODO!"
    }
  }
}
// Same as First TODO result..

// Query
{
  "data": {
    "user": {
      "username": "test00",
      "email": "test@test.com",
      "todos": [
        {
          "id": "5d7111b024aa9a0007abeed4",
          "content": "First TODO!"
        },
        {
          "id": "5d71122324aa9a0007abeed5",
          "content": "Second TODO!"
        }
      ]
    }
  }
}
```

## Full stack develop
- `Vue.js + Apollo` comming soon..

## Information

Writer: [Geunhyeok LEE](https://github.com/leegeunhyeok)
