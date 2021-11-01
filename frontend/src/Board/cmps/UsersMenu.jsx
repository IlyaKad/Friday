import { Component } from 'react'
import { UserPreview } from "./UserPreview"
import RemoveIcon from '@material-ui/icons/Remove'
import AddIcon from '@material-ui/icons/Add'

export function UsersMenu({ membersIds, users, members, onUpdateMembers, isShown }) {

  const usersToShow = users.filter(user => membersIds.indexOf(user._id) === -1)
  return (
    <section  >
      {isShown && <div className="users-menu-container">
        <span>Add</span>
        <div className="member-list-box">
          {members.map((member, idx) =>
            <UserPreview
              key={member._id + idx}
              person={member}
              icon={<RemoveIcon />}
              action={'remove'}
              onUpdateMembers={onUpdateMembers}
            />
          )}
        </div>
        <div className="user-list-box">
          <span>Remove</span>
          {usersToShow && usersToShow.map(user =>
            <UserPreview
              key={user._id}
              person={user}
              icon={<AddIcon />}
              action={'add'}
              onUpdateMembers={onUpdateMembers}
            />
          )}
        </div>
      </div>}
    </section >
  )

}
