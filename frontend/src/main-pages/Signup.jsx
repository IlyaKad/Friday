import { connect } from "react-redux"
import { useEffect, useState } from "react"
import { loadUsers, signup } from '../store/actions/userActions'
import { loadBoards } from '../store/actions/boardActions'
import { MainHeader } from "../cmps/MainHeader"
import { Button, TextField } from "@material-ui/core"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'


export const _Signup = (props) => {

  const { loggedInUser, loadUsers, loadBoards, history, location, signup } = props

  const [msg, setMsg] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [fullname, setFullname] = useState('')

  useEffect(() => {
    loadUsers()

    if (loggedInUser) {
      const boards = loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      history.push(path)
    }
  }, [])

  const doSignup = async ev => {
    ev.preventDefault()
    if (!username || !password || !fullname) {
      return this.setState({ msg: 'All inputs are required' })
    }
    signup({ username, password, fullname })
    if (loggedInUser) {
      const boards = loadBoards(loggedInUser._id)
      const path = boards.length ? `/board/${boards[0]._id}` : `/board`
      history.push(path)
    }
    // setUsername('')
    // setFullname('')
    // setPassword('')
  }

  return (
    <section className="home-page">
      <MainHeader pathname={location.pathname} />
      <div className="hero">
        <div className="hero-inner-container flex">
          <form className="login-form flex column align-center" onSubmit={doSignup}>
            <span className="lock-sign-container">
              <LockOutlinedIcon />
            </span>
            <h2>SignUp</h2>
            <TextField
              variant="outlined"  margin="normal" required fullWidth label="User Name" autoComplete="email" 
              type="text" name="username" onChange={ev => setUsername(ev.target.value)} autoFocus
            />
            <TextField
              variant="outlined" margin="normal" required fullWidth label="Full Name" autoComplete="full name" 
              type="text" name="fullname" onChange={ev => setFullname(ev.target.value)} autoFocus
            />
            <TextField
              variant="outlined" margin="normal" required fullWidth type="text" label="Password" name="username" 
              autoComplete="email" type="password" name="password" onChange={ev => setPassword(ev.target.value)} autoFocus
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

const mapStateToProps = state => {
  return {
    // users: state.userModule.users,
    loggedInUser: state.userModule.loggedInUser,
    // isLoading: state.systemModule.isLoading
  }
}
const mapDispatchToProps = {
  // login,
  // logout,
  // removeUser,
  signup,
  loadUsers,
  loadBoards
}

export const Signup = connect(mapStateToProps, mapDispatchToProps)(_Signup)