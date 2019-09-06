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

Check `src/schema.graphql`

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
# Regist user
mutation {
  register(username: "user", password: "1234") {
    id,
    username,
    password,
    permission,
    registDate
  }
}

# {
#   "data": {
#     "register": {
#       "id": "5d721fa024aa9a0007abeedb",
#       "username": "user",
#       "password": "$2a$10$oGvFD1I5V/9hkkn4/VWJM.00P/.hBavhui0rTOveWCyaXAo0wnY3q",
#       "permission": "DEFAULT_USER",
#       "registDate": "2019-09-06T08:58:08.100Z"
#     }
#   }
# }



# Login
mutation {
  login(username: "user", password: "1234") {
    token
    user {
      username
    }
  }
}

# {
#   "data": {
#     "login": {
#       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNzIxZmEwMjRhYTlhMDAwN2FiZWVkYiIsImlhdCI6MTU2Nzc2MDQyMCwiZXhwIjoxNTY3ODQ2ODIwfQ.12ckPM9mog2iz6iSQg67Nf4f_d5mxMfQExj8X5sgUQc",
#       "user": {
#         "username": "user"
#       }
#     }
#   }
# }



# Current logined user (Need token!)
# If request without token, you will get "Not Authenticated" error
#
# Include { "Authorization": "Bearer TOKEN" } to HTTP Header
query {
  currentUser {
		username
  }
}

# {
#   "data": {
#     "currentUser": {
#       "username": "user"
#     }
#   }
# }
```

## Full stack develop
- `Vue.js + Apollo` comming soon..

## Information

Writer: [Geunhyeok LEE](https://github.com/leegeunhyeok)
