import React from 'react';
import { Link } from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import NotificationsIcon from '@material-ui/icons/Notifications';
import logo from '../../assets/img/logo.png'

export class SideHeader extends React.Component {
 

  render() {
    const { user, logout } = this.props
    return (
      <header className="sideheader-container flex column">
        <Link className="logo-link" to="/"><img src={logo} alt="logo" /></Link>
        <span><NotificationsIcon /></span>
        <div className="user-name"><h1>Hello {(user.fullname).split(' ')[0]}</h1></div>
        <div className="side-header-bottom">
          <Avatar
            style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#292f4c',
              border: 'solid 2px',
              fontWeight: '500'
            }}
            alt='' src="/static/images/avatar/1.jpg" />
          <div className="back-link">
            <Link onClick={logout} to="/"><ExitToAppIcon /></Link>
          </div>
        </div>
      </header>
    )
  }
}


