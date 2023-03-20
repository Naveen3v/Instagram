import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {show: false, username: '', password: '', errorMsg: ''}

  submitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  submitFailure = errorMsg => {
    this.setState({errorMsg, show: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitFailure(data.error_msg)
    }
  }

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    const {show, errorMsg} = this.state
    return (
      <div className="loginCont">
        <img
          src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679155601/Login_Main_wva7h6.png"
          alt="website logo"
          className="loginImg"
        />
        <form className="formCont" onSubmit={this.submitForm}>
          <img
            src="https://res.cloudinary.com/dsqq0xr88/image/upload/v1679155631/Login_uq3dxx.png"
            alt="website login"
            className="formImg"
          />
          <h1 className="formHeading">Insta Share</h1>
          <label className="formLabel" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="inputEle"
            placeholder="Enter Username"
            onChange={this.changeUsername}
          />
          <label className="formLabel" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="inputEle"
            placeholder="Enter Password"
            onChange={this.changePassword}
          />
          {show && <p className="errorPara">*{errorMsg}</p>}
          <button type="submit" className="formBtn">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default Login
