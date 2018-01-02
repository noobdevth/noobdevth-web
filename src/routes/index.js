import React, {Component} from 'react'
import styled from 'react-emotion'
import {Head} from 'react-static'
import axios from 'axios'

const Backdrop = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  min-height: 100vh;

  background: #efefef;
`

const Container = styled.div`
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
  margin: 0em auto 0em auto;
  font-size: 1.8em;
  font-family: Roboto;
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

const endpoint = 'https://us-central1-noobdevth.cloudfunctions.net/invite'

class Landing extends Component {
  state = {
    username: '',
    result: {}
  }

  set = e => this.setState({username: e.target.value})

  enter = e => e.key === 'Enter' && this.submit()

  submit = () => {
    axios
      .post(endpoint, {username: this.state.username})
      .then(({data}) => this.setState({result: JSON.parse(data)}))
      .catch(res => console.log(res.response.data.error))
  }

  render = () => (
    <Backdrop>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Fira+Mono"
          rel="stylesheet"
        />
      </Head>
      <Container>{JSON.stringify(this.state.result)}</Container>
      <Input
        placeholder="GitHub Username"
        onChange={this.set}
        onKeyPress={this.enter}
        value={this.state.username}
      />
    </Backdrop>
  )
}

export default Landing
