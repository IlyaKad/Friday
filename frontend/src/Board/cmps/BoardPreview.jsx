import { Component } from 'react'
import { connect } from 'react-redux'
import { BoardHeader } from './BoardHeader'
import { GroupPreview } from './GroupPreview'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { loadBoard, addGroupToBoard, onUpdateBoardAfterDrag, updateBoard } from '../../store/actions/boardActions'

class _BoardPreview extends Component {

  componentDidMount() {
  }

  onAddGroup = () => {
    const { board, loggedInUser, addGroupToBoard } = this.props
    addGroupToBoard(board, loggedInUser._id)
  }

  onChangeBoardTitle = (title) => {
    const { board, loggedInUser, updateBoard } = this.props
    updateBoard({ board, userId: loggedInUser._id, newValue: title, type: 'title' })
  }

  onUpdateBoardMembers = (memberId, action) => {
    const { board, loggedInUser, updateBoard } = this.props
    const { members } = board
    let newValue
    if (action === 'remove') {
      newValue = members.filter(id => id !== memberId)
    }
    else {
      members.push(memberId)
      newValue = members
    }
    updateBoard({ board, userId: loggedInUser._id, newValue, type: 'members' })
  }

  onDragEnd = (result) => {
    const { destination, source, droppableId, type, draggableId } = result
    const { board } = this.props
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    const boardToUpdate = JSON.parse(JSON.stringify(board))
    if (type === 'group') {
      const [draggbleGroup] = boardToUpdate.groups.splice(source.index, 1)
      boardToUpdate.groups.splice(destination.index, 0, draggbleGroup)
    }
    else {
      if (source.droppableId === destination.droppableId) {
        const droppableGroupIdx = boardToUpdate.groups.findIndex(group => group.id === destination.droppableId)
        const droppableGroup = boardToUpdate.groups[droppableGroupIdx]
        // const draggbleTask = droppableGroup.tasks.find(task => task.id === draggableId)
        const [draggbleTask] = droppableGroup.tasks.splice(source.index, 1)
        droppableGroup.tasks.splice(destination.index, 0, draggbleTask)
        boardToUpdate.groups.splice(droppableGroupIdx, 1, droppableGroup)
      } else {
        const sourceGroupIdx = boardToUpdate.groups.findIndex(group => group.id === source.droppableId)
        const destinationGroupIdx = boardToUpdate.groups.findIndex(group => group.id === destination.droppableId)
        const sourceGroup = boardToUpdate.groups[sourceGroupIdx]
        const destinationGroup = boardToUpdate.groups[destinationGroupIdx]
        const [draggbleTask] = sourceGroup.tasks.splice(source.index, 1)
        destinationGroup.tasks.splice(destination.index, 0, draggbleTask)
        boardToUpdate.groups.splice(sourceGroupIdx, 1, sourceGroup)
        boardToUpdate.groups.splice(destinationGroupIdx, 1, destinationGroup)
      }
    }
    this.props.onUpdateBoardAfterDrag(boardToUpdate)
  }

  render() {
    const { board, users } = this.props
    if (!board) return <div>Loading...</div>
    return (
      <div className="board-preview flex column">
        <BoardHeader
          board={board}
          users={users}
          onAddGroup={this.onAddGroup}
          onChangeBoardTitle={this.onChangeBoardTitle}
          onUpdateBoardMembers={this.onUpdateBoardMembers}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <Droppable droppableId={board._id} isCombineEnabled type="group">
            {(provided) => (
              <div className="groups-container flex column"
                {...provided.droppableProps}
                ref={provided.innerRef}>
                {board.groups.map((group, idx) =>
                  <GroupPreview
                    group={group}
                    board={board}
                    key={group.id}
                    idx={idx}
                    users={users} />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    board: state.boardModule.board,
    loggedInUser: state.userModule.loggedInUser,
    users: state.userModule.users
  }
}

const mapDispatchToProps = {
  addGroupToBoard,
  loadBoard,
  updateBoard,
  onUpdateBoardAfterDrag,
}

export const BoardPreview = connect(mapStateToProps, mapDispatchToProps)(_BoardPreview)