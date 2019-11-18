import React, { Component } from 'react';
import countries from '../data/countries'
import Field from './Field'

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
      age: 16,
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

    if ( this.state.age <= 18 ) {
      errors.age = 'Must be great than 18'
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

  decrementAge = () => {
    this.setState((prevState) => {
      return { age: prevState.age - 1 }
    }, this.validateAge)
  }

  incrementAge = () => {
    this.setState((prevState) => {
      return { age: prevState.age + 1 }
    }, this.validateAge)
  }

  validateAge = () => {
    if ( this.state.age <= 18 ) {
      this.setState({ errors: { ...this.state.errors, age: 'Must be great than 18' } })
    } else {
      this.setState({ errors: { ...this.state.errors, age: false } })
    }
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
    const {
      username,
      password,
      repeatPassword,
      country, gender,
      agree,
      errors,
      age
    } = this.state

    return (
      <div className="form-container card">
        <form className="form card-body">
          <Field
            id='username'
            labelText='Username'
            type='text'
            name='username'
            placeholder='Enter username'
            value={username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Field
            id='password'
            labelText='Password'
            type='password'
            name='password'
            placeholder='Enter password'
            value={password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <Field
            id='repeatPassword'
            labelText='Repeat password'
            type='password'
            name='repeatPassword'
            placeholder='Enter repeat password'
            value={repeatPassword}
            onChange={this.handleChange}
            error={errors.repeatPassword}
          />

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
            <div>
              <label htmlFor="">Age</label>
            </div>
            <div className="btn-group">
              <button
                className='btn btn-secondary'
                type='button'
                onClick={this.decrementAge}
              >
                -
              </button>

              <input
                type="number"
                name="age"
                className='fom-control'
                placeholder='Enter age'
                value={age}
                onChange={this.onChange}
              />

              <button
                className='btn btn-secondary'
                type='button'
                onClick={this.incrementAge}
              >
                +
              </button>
            </div>
            { errors.age &&
              <div className="invalid-feedback">
                { errors.age }
              </div>
            }

          </div>
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
