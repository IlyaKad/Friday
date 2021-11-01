import { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { MainHeader } from '../cmps/MainHeader'
import { loadUsers, removeUser, login, logout, signup } from '../store/actions/userActions'
import { loadBoards } from '../store/actions/boardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';


export const _Login = (props) => {

  const { loggedInUser, location, loadUsers, loadBoards, login, history } = props

  const [msg, setMsg] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    loadUsers()

    if (loggedInUser) {
      const boards = loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      history.push(path)
    }
  }, [])

  const loaduserBoards = async () => {
    if (loggedInUser) {
      const boards = loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      history.push(path)
    }
  }

  const userNameHandleChange = ev => {
    const { value } = ev.target
    setUsername(value)
  }

  const doLogin = async ev => {
    ev.preventDefault()
    if (!username || !password) {
      return this.setState({ msg: 'Please enter user/password' })
    }
    try {
      const user = await login({ username, password })
      if (user) {
        const boards = await loadBoards(user._id)
        const path = boards.length ? `/board/${boards[0]._id}` : `/board`
        history.push(path)
      }
    } catch (err) {
      setMsg('Login failed, try again.')
    }
  }

  const removeUser = userId => {
    this.props.removeUser(userId)
  }

  return (
    <section className="home-page">
      <MainHeader pathname={location.pathname} />
      <div className="hero">
        <div className="hero-inner-container flex">
          <form className="login-form flex column align-center" onSubmit={doLogin}>
            <span className="lock-sign-container">
              <LockOutlinedIcon />
            </span>
            <h2>Login</h2>
            <TextField variant="outlined" margin="normal" required fullWidth label="User Name" autoComplete="email" type="text"
              name="username" value={username} onChange={userNameHandleChange} autoFocus
            />
            <TextField variant="outlined" margin="normal" required fullWidth type="text" label="Password" name="username" autoComplete="email"
              type="password" name="password" value={password} onChange={ev => setPassword(ev.target.value)}
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
