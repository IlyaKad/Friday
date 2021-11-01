import { connect } from 'react-redux'
import { Component } from 'react'
import { removeGroupFromBoard, addTaskToGroup, updateGroup, updateTask } from '../../store/actions/boardActions'
import { TaskPreview } from './TaskPreview'
import { EditableElement } from './EditableElement'
import { GroupDropDownActions } from './GroupDropDownActions'
import { ClickAwayListener } from '@material-ui/core'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import { ProgressBar } from './ProgressBar'

class _GroupPreview extends Component {

  state = {
    taskTitle: '',
  }

  componentDidMount() {
  }

  onAddTask = (ev, newValue, type) => {
    ev.preventDefault()
    if (!newValue) return
    const { updateTask, board, group, addTaskToGroup, loggedInUser, taskId } = this.props
    updateTask({ board, groupId: group.id, userId: loggedInUser._id, taskId, newValue, type })
    this.setState({ taskTitle: '' })
  }

  onUpdateGroup = (newValue, type) => {
    if (!newValue) return
    const { updateGroup, board, group, loggedInUser } = this.props
    updateGroup({ board, groupId: group.id, userId: loggedInUser._id, newValue, type })
  }

  onRemoveGroup = (groupId) => {
    const { board } = this.props
    const loggedInUserId = this.props.loggedInUser._id
    this.props.removeGroupFromBoard(board, loggedInUserId, groupId)
  }

  handleChange = ({ target }) => {
    const { value } = target
    this.setState({ taskTitle: value })
  }

  sortedTasksColors = (colorType) => {
    const { group } = this.props
    const tasksColors = group.tasks.map(task => task[colorType].color)
    const colors = tasksColors.sort()
    return colors
  }

  render() {
    const { group, board, idx, users } = this.props
    const { taskTitle, isActionsModal } = this.state
    const statusColors = this.sortedTasksColors('status')
    const priorityColors = this.sortedTasksColors('priority')
    return (
      <Draggable draggableId={group.id} index={idx} isCombineEnabled>
        {(provided) => (
          <section className="group-box-preview"
            {...provided.draggableProps}
            ref={provided.innerRef}>
            <div className="group-headers flex">
              <GroupDropDownActions provided={provided} group={group}
                onRemoveGroup={this.onRemoveGroup} onChangeColor={this.onUpdateGroup} />
              <div className="group-header flex align-center" >
                <h4 style={{ color: `${group.style.color}` }} className="group-title">
                  <EditableElement
                    onChangeTitle={this.onUpdateGroup}
                    title={group.title}
                    color={group.style.color}
                    type="title" />
                </h4>
                <span></span>
                <h4>Members</h4>
                <h4>Status</h4>
                <h4>Date Range</h4>
                <h4>Priority</h4>
                <h4>Last Update</h4>
              </div>
            </div>
            <Droppable droppableId={group.id} isCombineEnabled type="task">
              {(provided) => (
                <div className="group-tasks flex column group-droppable-container"
                  {...provided.dragHandleProps}
                  {...provided.draggableProps}
                  ref={provided.innerRef}>
                  {group.tasks.map((task, index) =>
                    <TaskPreview task={task}
                      board={board}
                      group={group}
                      key={task.id}
                      users={users}
                      idx={index}
                      userPrefColor={group.style.color}
                    />
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="group-bottom-section-input">
              <div style={{ backgroundColor: `${group.style.color}66` }}></div>
              <ClickAwayListener onClickAway={(ev) => this.onAddTask(ev, taskTitle, 'title')}>
                <form onSubmit={(ev) => this.onAddTask(ev, taskTitle, 'title')}>
                  <input type="text" placeholder="+ Add" value={taskTitle} onChange={this.handleChange} />
                </form>
              </ClickAwayListener>
              <div style={{ backgroundColor: '#c4c4c4' }}></div>
            </div>
            <div className="progress-bar-section" >
              <div className="progress-bar-status flex ">
                {statusColors.map((color, idx) =>
                  <ProgressBar key={idx} bgColor={color} length={statusColors.length} />
                )}
              </div>
              <div className="progress-bar-priority flex ">
                {priorityColors.map((color, idx) =>
                  <ProgressBar key={idx} bgColor={color} length={priorityColors.length} />
                )}
              </div>
            </div>
          </section >
        )
        }
      </Draggable>
    )
  }
}


function mapStateToProps(state) {
  return {
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  removeGroupFromBoard,
  // addTaskToGroup,
  updateGroup,
  updateTask
}

export const GroupPreview = connect(mapStateToProps, mapDispatchToProps)(_GroupPreview)