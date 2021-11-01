import { Component } from 'react'
import logo from '../assets/img/logo.png'
import { NavLink } from 'react-router-dom'
import Button from '@material-ui/core/Button';

export class MainHeader extends Component {

  switchLink = (button) => {
    const { pathname } = this.props
    if (button === 1) {
      if (pathname === '/') return <NavLink className="link-btn" to="/login/">Login</NavLink>
      if (pathname === '/signup/') return <NavLink className="link-btn" to="/login/">Login</NavLink>
      if (pathname === '/login/' || '/login') return <NavLink className="link-btn" to="/signup/">SignUp</NavLink>
    } else if (button === 2) {
      if (pathname === '/') return <NavLink className="link-btn" to="/signup/">SignUp</NavLink>
      if (pathname === '/signup/') return <NavLink className="link-btn" to="/">Home</NavLink>
      if (pathname === '/login/' || '/login') return <NavLink className="link-btn" to="/">Home</NavLink>
    }
  }

  render() {
    return (
      <div className="home-header-container flex space-between align-center">
        <div className="logo-container flex align-center">
          <NavLink to="/">
            <img src={logo} alt="logo" />
          </NavLink>
            <span>Friday</span>
        </div>
        <ul className="clean-list">
          <Button variant="contained" size="small" >
            {this.switchLink(1)}
          </Button>
          <Button variant="contained" size="small" >
            {this.switchLink(2)}
          </Button>
        </ul>
      </div>
    )
  }
}
