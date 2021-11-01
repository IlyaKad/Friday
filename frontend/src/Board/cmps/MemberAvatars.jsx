import { Component } from 'react'
import { Avatar } from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { UsersMenu } from './UsersMenu'
import { ClickAwayListener } from '@material-ui/core';

export class MemberAvatars extends Component {

  state = {
    isShown: false,
  }

  toggleUsersMenu = () => {
    this.setState({ isShown: !this.state.isShown })
  }

  render() {
    const { isShown } = this.state
    const { users, onUpdateMembers, membersIds } = this.props
    const membersInfoArr = membersIds.map(memberId => users.find(user => user._id === memberId))
    return (
      <ClickAwayListener onClickAway={() => { if (isShown) return this.setState({ isShown: false }) }}>
        <div className="member-avatars-main flex justify-center">
          <UsersMenu
            users={users}
            members={membersInfoArr}
            membersIds={membersIds}
            isShown={isShown}
            onUpdateMembers={onUpdateMembers}
          />
          {(membersInfoArr.length) ?
            <AvatarGroup className="avatar-group" onClick={this.toggleUsersMenu} max={3}>
              {membersInfoArr.map((member, idx) =>
                <Avatar className="avatar-container"
                  alt={member?.fullname} src={member?.imgUrl} key={member?._id + idx} />
              )}
            </AvatarGroup> :
            <Avatar className="empty-avatar-container" 
              alt='' src='' onClick={this.toggleUsersMenu} />}
        </div>
      </ClickAwayListener>
    )
  }
}