const functions = require('firebase-functions')
const GitHub = require('github')

const config = functions.config()

const ORG_ID = 'noobdevth'

async function invite(req, res) {
  try {
    const {username} = req.query
    const token = config.github.token

    if (!username) {
      res.send(JSON.stringify({status: 400, error: 'Username is required.'}))
      return
    }

    if (!token) {
      res.send(JSON.stringify({status: 500, error: 'Token is not set.'}))
      return
    }

    const github = new GitHub({
      host: 'api.github.com',
      protocol: 'https'
    })

    await github.authenticate({
      type: 'token',
      token
    })

    const {data} = await github.orgs.addOrgMembership({
      org: ORG_ID,
      username,
      role: 'member'
    })

    const result = JSON.stringify({
      status: 200,
      url: data.url,
      state: data.state,
      role: data.role,
      user: data.user.id
    })

    res.send(result)
  } catch (err) {
    res.send(JSON.stringify({status: 500, error: err}))
  }
}

exports.invite = functions.https.onRequest(invite)

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send('Hello from Firebase!')
})
