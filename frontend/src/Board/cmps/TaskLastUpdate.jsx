import React from 'react'
import { Avatar } from '@material-ui/core'
import { utilService } from '../../services/utilService'


export function TaskLastUpdate({ board, task, users }) {

  const lastUpdate = board.activities.find(activity => activity.taskId === task.id)
  if (!lastUpdate) return ''
  const user = users.find(user => user._id === lastUpdate.byMember)
  if (!user) return ''
  const activityTime = utilService.formatDate(lastUpdate.createdAt)

  return (
    <div className="last-update-container flex align-center">
      <span>
        <Avatar className="last-update-avatar"
          alt={user.fullname} src={user.imgUrl} key={user._id} />
      </span>
      <span>{activityTime}</span>
    </div>
  )
}

