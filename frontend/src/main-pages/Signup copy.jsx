import { Component } from 'react'
import { connect } from 'react-redux'
import { MainHeader } from '../cmps/MainHeader'
import { loadUsers, removeUser, login, logout, signup } from '../store/actions/userActions'
import { loadBoards } from '../store/actions/boardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

// TODO : clean the code from  non-related pieces

class _Signup extends Component {
  state = {
    msg: '',
    signupCred: {
      username: '',
      password: '',
      fullname: ''
    }
  }

  componentDidMount() {
    const { loggedInUser, loadUsers, loadBoards } = this.props
    loadUsers()
    if (loggedInUser) {
      const boards = loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      this.props.history.push(path)
    }
    else return
  }

  signupHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      signupCred: {
        ...prevState.signupCred,
        [name]: value
      }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    const userCreds = { username, password }
    try {
      this.props.login(userCreds)
      this.setState({ loginCred: { username: '', password: '' } })
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
  }

  doSignup = async ev => {
    ev.preventDefault()
    const { loggedInUser, loadUsers, loadBoards } = this.props
    const { username, password, fullname } = this.state.signupCred
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    const signupCreds = { username, password, fullname }
    this.props.signup(signupCreds)
    
    if (loggedInUser) {
      const boards = this.props.loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      this.props.history.push(path)
    }
    this.setState({ signupCred: { username: '', password: '', fullname: '' } })
  }

  removeUser = userId => {
    this.props.removeUser(userId)
  }

  render() {
    const { loggedInUser, location } = this.props

    return (
      <section className="home-page">
        <MainHeader pathname={location.pathname} />
        <div className="hero">
          <div className="hero-inner-container flex">
            <form className="login-form flex column align-center" onSubmit={this.doSignup}>
              <span className="lock-sign-container">
                <LockOutlinedIcon />
              </span>
              <h2>SignUp</h2>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="User Name"
                autoComplete="email"
                type="text"
                name="username"
                // value={this.state.loginCred.username}
                onChange={this.signupHandleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Full Name"
                autoComplete="full name"
                type="text"
                name="fullname"
                // value={this.state.loginCred.username}
                onChange={this.signupHandleChange}
                autoFocus
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                type="text"
                label="Password"
                name="username"
                autoComplete="email"
                type="password"
                name="password"
                // value={this.state.loginCred.password}
                onChange={this.signupHandleChange}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#d85597", color: "white" }}>
                Sign Up
             </Button>
            </form>
          </div>
        </div>
      </section>
    )

  }
}

const mapStateToProps = state => {
  return {
    users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  login,
  logout,
  signup,
  removeUser,
  loadUsers,
  loadBoards
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)