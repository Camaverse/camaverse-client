const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const port = 3000

const users = {
  guests: [],
  users: []
}

const userLookup = {
  'larry.l.sharpe@gmail.com': {
    username: 'User 1',
    slug: 'user-1'
  }
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World!'))

app.post('/login', (req, res) => {
  const { email } = req.body
  if (userLookup[email]) {
    const _usr = {
      email,
      ...userLookup[email]
    }
    users.users.push(_usr)
    return res.status(200).json(userLookup[email])
  } else {
    return res.status(400).json({ err: 'user not found' })
  }
})
app.post('/logout', (req, res) => {
  const { slug } = req.body
  const lookup = users.users.findIndex(usr => usr.slug === slug)
  if (lookup > -1) {
    users.users.splice(lookup, 1)
    return res.status(200).json({ msg: 'Logout complete.' })
  } else {
    return res.status(400).json({ err: 'user not found' })
  }
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
