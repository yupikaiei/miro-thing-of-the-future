require('dotenv-safe').config()

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mustacheExpress = require('mustache-express')

const app = express()
const port = process.env.PORT

app.engine('html', mustacheExpress())
app.use(cors())
app.use('/public', express.static('static'))
app.set('view engine', 'html')
app.set('views', __dirname + '/../static')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('main', { CLIENT_ID: process.env.CLIENT_ID })
})

app.get('/builder', (req, res) => {
  res.render('builder', { CLIENT_ID: process.env.CLIENT_ID })
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
