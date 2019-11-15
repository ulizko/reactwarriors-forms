import React, { Component } from 'react';
import countries from '../data/countries'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      repeatPassword: '',
      country: 1,
      gender: 'male',
      agree: true,
      avatar: '',
      errors: {}
    }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const errors = {}

    if ( this.state.username.length < 5 ) {
      errors.username = 'Must be 5 characters or more'
    }

    if ( this.state.password.length < 3 ) {
      errors.password = 'Must be 3 characters or more'
    }

    if ( this.state.repeatPassword !== this.state.password ) {
      errors.repeatPassword = 'Must be equal to password'
    }

    this.setState({ errors })

    if ( !Object.keys(errors).length > 0 ) {
      console.log(this.state)
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onChangeAgree = (event) => {
    this.setState({
      [event.target.name]: event.target.checked
    })
  }

  onChangeAvatar = (event) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      this.setState({
        avatar: e.target.result
      })
    }
    reader.readAsDataURL(event.target.files[0])
  }

  getOptionsItems = items => {
    return items.map(item => (
      <option key={item.id} value={item.id}>{item.name}</option>
    ))
  }

  render() {
    const { username, password, repeatPassword, country, gender, agree, errors } = this.state

    return (
      <div className="form-container card">
        <form className="form card-body">
          <div className="form-group">
            <label htmlFor='username'>Username</label>
            <input
              type="text"
              className="form-control"
              name='username'
              id='username'
              placeholder="Enter username"
              value={username}
              onChange={this.handleChange}
            />
            { errors.username &&
            <div className="invalid-feedback">
              { errors.username }
            </div> }

          </div>
          <div className="form-group">
            <label htmlFor='password'>Password</label>
            <input
              type="password"
              name='password'
              id='password'
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={this.handleChange}
            />
            { errors.password &&
            <div className="invalid-feedback">
              { errors.password }
            </div> }
          </div>
          <div className="form-group">
            <label htmlFor='repeatPassword'>Repeat password</label>
            <input
              type="password"
              name='repeatPassword'
              id='repeatPassword'
              className="form-control"
              placeholder="Enter repeat password"
              value={repeatPassword}
              onChange={this.handleChange}
            />
            { errors.repeatPassword &&
            <div className="invalid-feedback">
              { errors.repeatPassword }
            </div> }
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <select
              className="form-control"
              name="country"
              id="country"
              value={country}
              onChange={this.handleChange}
            >
              { this.getOptionsItems(countries) }
            </select>
          </div>
          <fieldset className='form-group'>
            <div>Gender</div>
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                id="male"
                className="form-check-input"
                value='male'
                checked={gender === 'male' }
                onChange={this.handleChange}
              />
              <label htmlFor="male" className='form-check-label'>
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="gender"
                id="female"
                className="form-check-input"
                value='female'
                checked={gender === 'female' }
                onChange={this.handleChange}
              />
              <label htmlFor="female" className='form-check-label'>
                Female
              </label>
            </div>
          </fieldset>
          <div className="form-group">
            <label htmlFor="avatar">Avatar</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="form-control-file"
              onChange={this.onChangeAvatar}
            />
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              id="agree"
              name='agree'
              value={agree}
              checked={agree}
              onChange={this.onChangeAgree}
            />
            <label className="form-check-label" htmlFor="agree">
              Agree
            </label>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            onClick={this.onSubmit}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}
