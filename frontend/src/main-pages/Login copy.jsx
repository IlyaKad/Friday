import { Component } from 'react'
import { connect } from 'react-redux'
import { MainHeader } from '../cmps/MainHeader'
import { loadUsers, removeUser, login, logout, signup } from '../store/actions/userActions'
import { loadBoards } from '../store/actions/boardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


class _Login extends Component {
  state = {
    msg: '',
    loginCred: {
      username: '',
      password: ''
    }
  }

  componentDidMount() {
    const { loggedInUser, loadUsers } = this.props
    loadUsers()
    if (loggedInUser) {
      const boards = this.props.loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      this.props.history.push(path)
    }
  }

  loaduserBoards = async ev => {
    const { loggedInUser } = this.props
    if (loggedInUser) {
      const boards = this.props.loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      this.props.history.push(path)
    }
  }

  loginHandleChange = ev => {
    const { name, value } = ev.target
    this.setState(prevState => ({
      loginCred: { ...prevState.loginCred, [name]: value }
    }))
  }

  doLogin = async ev => {
    ev.preventDefault()
    const { username, password } = this.state.loginCred
    if (!username || !password) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    try {
      const user = await this.props.login({ username, password })
      if (user) {
        const boards = await this.props.loadBoards(user._id)
        const path = boards.length ? `/board/${boards[0]._id}` : `/board`
        this.props.history.push(path)
      }
    } catch (err) {
      this.setState({ msg: 'Login failed, try again.' })
    }
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
            <form className="login-form flex column align-center" onSubmit={this.doLogin}>
              <span className="lock-sign-container">
                <LockOutlinedIcon />
              </span>
              <h2>Login</h2>
              <TextField variant="outlined" margin="normal" required fullWidth label="User Name" autoComplete="email" type="text" 
              name="username" value={this.state.loginCred.username} onChange={this.loginHandleChange} autoFocus
              />
              <TextField variant="outlined" margin="normal" required fullWidth type="text" label="Password" name="username" autoComplete="email" 
              type="password" name="password" value={this.state.loginCred.password} onChange={this.loginHandleChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{ backgroundColor: "#d85597", color: "white" }}>
                Log in
              </Button>
              {/* <button>Login</button> */}
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
    isLoading: state.systemModule.isLoading,
    boards: state.boardModule.boards
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

export const Login = connect(mapStateToProps, mapDispatchToProps)(_Login)
