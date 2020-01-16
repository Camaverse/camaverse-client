const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000
const redis = require('redis')
const client = redis.createClient()

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
const Schema = mongoose.Schema

const userSchema = new Schema({
  email: String,
  slug: String,
  username: String,
  sessions: [
    { start: Number, end: Number, endedBy: String }
  ]
}, { timestamps: true })
const User = mongoose.model('User', userSchema)

/*
const lar = { email: 'larry.l.sharpe@gmail.com', username: 'larry', slug: 'larry' }
const usr = new User(lar)
usr.save().then(() => console.log('saved'))
*/

const users = {
  guests: [],
  users: []
}

client.on('connect', function() {
  console.log('Redis client connected')
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/login/:token')

app.post('/login', (req, res) => {
  const { email } = req.body
  if (!email) {
    return res.status(400).json({ err: 'Email is required.' })
  }
  User.findOne({ email }, 'email username slug sessions', (err, usr) => {
    if (err) {
      return res.status(400).json(err)
    }
    users.users.push(usr)
    usr.sessions.push({ start: Date.now() })
    usr.save().then(usr => {
      const { username, slug } = usr
      return res.status(200).json({ username, slug })
    })
  })
})
app.post('/logout', (req, res) => {
  const { slug } = req.body

  if (!slug) {
    return res.status(400).json({ err: 'Slug is required.' })
  }
  User.findOne({ slug }, 'email username slug sessions', (err, usr) => {
    if (err) {
      return res.status(400).json(err)
    }

    const lastSessionIndex = usr.sessions.length - 1
    const lastSession = usr.sessions[lastSessionIndex]
    lastSession.end = Date.now()
    lastSession.endedBy = 'logout'

    usr.save().then(usr => {
      const lookup = users.users.findIndex(usr1 => usr1.slug === slug)
      if (lookup > -1) {
        users.users.splice(lookup, 1)
        return res.status(200).json({ msg: 'Logout complete.' })
      } else {
        return res.status(400).json({ err: 'user not found' })
      }
    })
  })
})

app.post('/users/guest', (req, res) => {
  const guestNumber = users.guests.length + 1
  const _usr = {
    slug: 'Guest-' + guestNumber,
    username: 'Guest ' + guestNumber
  }
  users.guests.push(_usr)
  return res.status(200).json(_usr)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
