import React, {Component} from 'react'
import styled from 'react-emotion'
import {Head} from 'react-static'
import axios from 'axios'

import bgImage from '../assets/bg.jpg'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  background: #efefef;
  background-image: url(${bgImage});
  background-size: cover;
  background-position: center;
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  height: 100%;

  margin: 2em;
  padding: 2em;
  background: white;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
`

const Title = styled.h2`
  margin: 0;
  font-size: 1.8em;
  font-weight: 300;

  color: #333;
`

const Input = styled.input`
  text-align: center;
  background: #ffffff;
  border: none;
  border-bottom: 2px solid #555;
  padding: 0.3em 1em;
  font-size: 1.8em;
  font-family: Fira Mono, monospace;
  font-weight: 300;
  outline: none;
  color: #333;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
  transition: 1s cubic-bezier(0.22, 0.61, 0.36, 1) all;
`

const Paragraph = styled.p`
  margin: 0;
  margin-top: 1em;
  font-size: 1.15em;
  color: #555;
`

const Anchor = styled.a`
  color: teal;
  text-decoration: none;
  font-size: 1.18m;
`

const Success = ({result: {state, avatar}}) => {
  if (state === 'active') {
    return <Card>You are already a member.</Card>
  } else if (state === 'pending') {
    return (
      <Card>
        <Title>You are Invited!</Title>
        <Paragraph>
          Please visit{' '}
          <Anchor
            href="https://github.com/noobdevth"
            target="_blank"
            rel="noopener noreferrer">
            https://github.com/noobdevth
          </Anchor>{' '}
          to Accept the Invitation.
        </Paragraph>
      </Card>
    )
  }

  return 'Indeterminate State'
}

const endpoint = 'https://us-central1-noobdevth.cloudfunctions.net/invite'

class Landing extends Component {
  state = {
    username: '',
    result: null,
    error: null
  }

  set = e => this.setState({username: e.target.value})

  enter = e => e.key === 'Enter' && this.submit()

  submit = () => {
    axios
      .post(endpoint, {username: this.state.username})
      .then(({data}) => {
        this.setState({result: JSON.parse(data), error: null})
      })
      .catch(({response}) => {
        const error = response.data.error
        this.setState({error: error.message || error, result: null})
      })
  }

  render() {
    const {username, result, error} = this.state

    return (
      <Backdrop>
        <Head>
          <link
            href="https://fonts.googleapis.com/css?family=Fira+Mono"
            rel="stylesheet"
          />
        </Head>
        <Input
          placeholder="Your GitHub Username"
          onChange={this.set}
          onKeyPress={this.enter}
          value={username}
        />
        {result && <Success result={result} />}
        {error && <Card>{JSON.stringify(error, null, 2)}</Card>}
      </Backdrop>
    )
  }
}

export default Landing
