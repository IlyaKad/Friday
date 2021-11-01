import { Component } from 'react'
import { Avatar } from '@material-ui/core'

export class UserPreview extends Component {


  render() {
    const { person, icon, onUpdateMembers, action } = this.props
    if (!person) return <div className="loading"></div>
    return (
      <div className="person-preview flex align-center">
        <Avatar className="avatar-container"
    
          alt={person.fullname} src={person.imgUrl} key={person._id} />
        <span className="avatar-user">
          {person.fullname}
        </span>
        { icon && <span className="user-menu-btn" onClick={() => onUpdateMembers(person._id, action)}>
          {icon}
        </span>}
      </div>
    )
  }
}
