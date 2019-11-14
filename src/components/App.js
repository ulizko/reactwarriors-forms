import React, { Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repeatPassword: ''
    }
  }
  onSubmit = (event) => {
    event.preventDefault()
    console.log(this.state.username)
  }

  onChangeUsername = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  onChangePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }

  onChangeRepeatPassword = (event) => {
    this.setState({
      repeatPassword: event.target.value
    })
  }

  render() {
    const { username, password, repeatPassword } = this.state
    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <div className="form-group">
            <label>Repeat password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter repeat password"
              value={repeatPassword}
              onChange={this.onChangeRepeatPassword}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100" onClick={this.onSubmit}>
            Submit
          </button>
        </form>
      </div>
    );
  }
}
