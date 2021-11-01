import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { DateProgressBar } from "./DateProgressBar"
import { MemberAvatars } from './MemberAvatars'
import { EditableElement } from './EditableElement'
import { removeTaskFromGroup, updateTask } from '../../store/actions/boardActions'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'
import { ClickAwayListener } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import { Draggable } from 'react-beautiful-dnd'
import { LabelMenu } from './LabelMenu'
import { DueDate } from './DueDate'
import { Chat } from './Chat'
import { BsChat } from 'react-icons/bs';
import { ConfirmModal } from './ConfirmModal'
import { AlertModal } from './AlertModal'
import { Avatar } from '@material-ui/core'
import { TaskLastUpdate } from './TaskLastUpdate'



class _TaskPreview extends React.Component {
  state = {
    isOpenDate: false,
    userPrefColor: this.props.userPrefColor,
    isChatShown: false,
    isModalOpen: false,
    alertIsShown: false
  }

  onRemoveTask = (taskId, modalAns) => {
    const { board, group, loggedInUser } = this.props
    if (modalAns === 'confirm') {
      this.setState({ isModalOpen: false })
      this.setState({ alertIsShown: true })
      this.props.removeTaskFromGroup(board, loggedInUser._id, group.id, taskId)
    }
    else {
      this.setState({ isModalOpen: false })
    }
  }

  closeAlert = () => {
    this.setState({ alertIsShown: false })

  }

  onUpdateTask = (newValue, type) => {
    if (!newValue) return
    const { updateTask, board, group, loggedInUser, task } = this.props
    updateTask({ board, groupId: group.id, userId: loggedInUser._id, taskId: task.id, newValue, type })
    if (type === 'dueDate') this.closeDatePicker()
  }

  onUpdateTaskMembers = (memberId, action) => {
    const { updateTask, board, group, loggedInUser, task } = this.props
    const { members } = task
    if (action === 'remove') var newValue = members.filter(id => id !== memberId)
    else {
      newValue = [...members, memberId]
    }
    updateTask({ board, groupId: group.id, userId: loggedInUser._id, taskId: task.id, newValue, type: 'members' })
  }

  closeChatShow = () => {
    this.setState({ isChatShown: false })
  }

  closeDatePicker = () => {
    this.setState({ isOpenDate: false })
  }

  render() {
    const { task, group, board, userPrefColor, users, idx } = this.props
    const { isOpenDate, isChatShown, isModalOpen, alertIsShown } = this.state
    return (
      <Draggable draggableId={task.id} index={idx}>
        {(provided) => (
          <section className="task-box-container flex align-center"
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            {alertIsShown && <AlertModal closeAlert={this.closeAlert} />}
            {isModalOpen && <ConfirmModal onActionToConfirm={this.onRemoveTask} itemId={task.id} />}
            {isChatShown && <Chat task={task}
              users={users}
              closeChat={this.closeChatShow}
              onUpdateTask={this.onUpdateTask}
            />}
            <span className="drag-icon" {...provided.dragHandleProps} ><DragIndicatorIcon /></span>
            <div className="task-box-preview">
              <div style={{ backgroundColor: `${userPrefColor}` }}></div>
              <div
                className="task-title-container">
                <EditableElement
                  title={task.title}
                  onChangeTitle={this.onUpdateTask}
                  type="title"
                />
                <DeleteIcon className="delete-icon" onClick={() => this.setState({ isModalOpen: true })} />
              </div>
              <div className="chat-icon-container flex column align-center">
                {/* <div className="chat-middle-container"> */}
                {task.updates.length > 0 && <span className="chat-msgs-count">{task.updates.length}</span>}
                < BsChat className="chat-icon"
                  onClick={() => this.setState({ isChatShown: true })}
                />
                {/* </div> */}
              </div>
              <div>
                <MemberAvatars
                  onUpdateMembers={this.onUpdateTaskMembers}
                  membersIds={[...task.members]}
                  users={users} />
              </div>
              <LabelMenu
                labels={group.statuses}
                currLabel={task.status}
                type="status"
                onChangeLabel={this.onUpdateTask}
              />
              <ClickAwayListener onClickAway={this.closeDatePicker}>
                <div
                  className="date-picker-container flex justify-center"
                  onClick={() => this.setState({ isOpenDate: true })}>
                  <DateProgressBar
                    startDate={task.dueDate.startDate}
                    endDate={task.dueDate.endDate}
                    createdAt={task.createdAt}
                    groupColor={group.style.color}
                  />
                  {isOpenDate && <DueDate
                    closeDatePicker={this.closeDatePicker}
                    changeDates={this.onUpdateTask}
                    type="dueDate"
                  />}
                </div>
              </ClickAwayListener>
              <LabelMenu
                currLabel={task.priority}
                onChangeLabel={this.onUpdateTask}
                type="priority"
                labels={group.priorities} />
              <div>
                {board.members.length ? <TaskLastUpdate users={users} board={board} task={task} /> : ""}
              </div>
              <div style={{ backgroundColor: `#c4c4c4` }}></div>
            </div>
            {provided.placeholder}
          </section >
        )}
      </Draggable>)
  }
}

function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser,
    users: state.userModule.users
  }
}

const mapDispatchToProps = {
  removeTaskFromGroup,
  updateTask,
}

export const TaskPreview = connect(mapStateToProps, mapDispatchToProps)(_TaskPreview)