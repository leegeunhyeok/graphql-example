/**
 * Express config
 */
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

exports.init = app => {
  // Middleware
  app.use(cors())
  app.use(cookieParser())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  // Route
  app.get('/', (_req, res) => {
    res.send('<h1>Hello!</h1>')
  })
}
