/**
 * Express config
 */
const cors = require('cors')

exports.init = app => {
  // Middleware
  app.use(cors())

  // Route
  app.get('/', (_req, res) => {
    res.send('<h1>Hello!</h1>')
  })
}
