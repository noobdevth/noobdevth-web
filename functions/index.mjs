const functions = require('firebase-functions')
const GitHub = require('github')

const config = functions.config()
const ORG_ID = 'noobdevth'

const err = error => ({error})

async function invite(req, res) {
  try {
    const {username} = req.body
    const token = config.github.token

    res.header('Content-Type', 'application/json')
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type')

    if (req.method === 'OPTIONS') {
      return res.status(204).send('')
    }

    if (req.method !== 'POST') {
      return res.status(405).send(err('Only the POST method is allowed.'))
    }

    if (!username) {
      return res.status(405).send(err('Username is Required.'))
    }

    if (!token) {
      return res.status(500).send(err('Token is not available.'))
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

    res.status(200).send({
      state: data.state,
      id: data.user.id,
      avatar: data.user.avatar_url
    })
  } catch (error) {
    res.status(500).send(err(error))
  }
}

exports.invite = functions.https.onRequest(invite)
