import { Component } from 'react'
import { UserPreview } from './UserPreview'
import CloseIcon from '@material-ui/icons/Close';
import { Button } from '@material-ui/core';
import { utilService } from '../../services/utilService'
import { BiTime } from 'react-icons/bi';
import { Chat } from './Chat';


export class Activities extends Component {

  state = {
    isChatShown: false
  }

  getUser = (activity) => {
    return this.props.users.find(user => user._id === activity.byMember)
  }

  showActivityTime = (createdAt) => {
    if (createdAt) {
      const timeSinceActivity = utilService.formatDate(createdAt)
      return timeSinceActivity
    }
  }

  closeChatShow = () => {
    this.setState({ isChatShown: false })
  }

  render() {
    const { board, closeActivity } = this.props
    return (
      <div className="board-log-container">
        <div className="log-header" >
          <CloseIcon className="close-log-btn" style={{
            fontSize: '20px',
            fontWeight: '400'
          }} onClick={closeActivity} />
          <h2 className="activity-title">{`${board.title}`}'s Activity Log:</h2>
        </div>
        <div className="activities-container">
          <ul >
            {board.activities.map(activity =>
              <li key={activity.id} className="flex column">
                <span className="activity-creator" >
                  <UserPreview person={this.getUser(activity)} />
                </span>
                <div className="activity-details flex column">
                  <span>{`${activity.txt}`} </span>
                  <span className="activity-date flex align-center  ">
                    <BiTime className="time-icon" />
                    {this.showActivityTime(activity.createdAt)}
                  </span>
                </div>
                <div className="activity-footer" >
                  <Button
                    className="log-btn"
                    variant="contained" color="primary"
                    onClick={() => this.setState({ isChatShown: true })}
                  >Chat about it
                    </Button>
                  {this.state.isChatShown && <Chat activity={activity} task={activity}
                    activities={board.activities}
                    users={board.members}
                    closeChat={this.closeChatShow}
                  />}
                </div>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  }
}
