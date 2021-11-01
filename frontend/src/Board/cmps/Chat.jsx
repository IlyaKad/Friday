import { Component } from 'react'
import { connect } from 'react-redux'
import { socketService } from '../../services/socketService'
import CloseIcon from '@material-ui/icons/Close'
import { UserPreview } from "./UserPreview"
import { utilService } from '../../services/utilService'
import { TextEditor } from './TextEditor'
import { ClickAwayListener } from '@material-ui/core'



class _Chat extends Component {
  state = {
    update: {
      txt: '',
      src: ''
    },

  }

  componentDidMount() {
    // socketService.on('chat addMsg', this.addMsg)
  }

  sendMsg = ev => {
    ev.preventDefault()
    const { update } = this.state
    const { task, loggedInUser, onUpdateTask } = this.props
    update.createdAt = Date.now()
    update.byUser = loggedInUser
    update.id = utilService.makeId()
    if (!task.updates) return
    const updates = [update, ...task.updates]
    onUpdateTask(updates, 'updates')
    socketService.emit('chat newMsg', update)
    this.setState({ update: { from: 'Me', txt: '' } })
  }

  msgHandleChange = ev => {
    const { blocks, entityMap } = ev
    if (Object.values(entityMap).length) {
      const { 0: { data: { src } } } = ev.entityMap
      this.setState(prevState => {
        return { update: { ...prevState.update, src } }
      })
    }
    const txt = blocks.map(block => block.text + '\n')
    this.setState(prevState => {
      return {
        update: { ...prevState.update, txt }
      }
    })
  }

  render() {
    const { closeChat, task, users, activity, activities } = this.props
    return (
      <ClickAwayListener onClickAway={closeChat}>
        <div className="chat-container flex column">
          <div className="chat-header-container" >
            <button onClick={closeChat}>
              <CloseIcon style={{
                fontSize: '20px',
                fontWeight: '400'
              }} />
            </button>
            {task.title ? <h2> {task.title}</h2> : <h2>{activity.txt}</h2>}
          </div>
          <div className="chat-form-container flex column" >
            <TextEditor
              sendMsg={this.sendMsg}
              msgHandleChange={this.msgHandleChange}
              users={users}
            />
          </div>
          {task.updates && <div className="chat-msgs-container">
            <ul>
              {task.updates.map((update, idx) => (
                <li key={update.id}>
                  <span ><UserPreview person={update.byUser} /></span>
                  <span className="msg-txt-container" ><pre>{update.txt}</pre></span>
                  {update.src && <span className="chat-img-container">
                    <img src={update.src} alt="" /></span>}
                </li>
              ))}
            </ul>
          </div>}
          {activities && <div className="chat-msgs-container">
            <ul>
              {activities.map((activity, idx) => (
                <li key={activity.id}>
                  <span ><UserPreview person={activity.byMember} /></span>
                  <span className="msg-txt-container" ><pre>{activity.txt}</pre></span>
                </li>
              ))}
            </ul>
          </div>}
        </div>
      </ClickAwayListener>
    )
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}
const mapDispatchToProps = {
}

export const Chat = connect(mapStateToProps, mapDispatchToProps)(_Chat)
