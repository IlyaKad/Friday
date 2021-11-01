import React from 'react'
import { connect } from 'react-redux'
import { SideHeader } from '../cmps/SideHeader'
import { BoardPreview } from '../cmps/BoardPreview'
import { SideNav } from '../cmps/SideNav'
import { loadUsers, logout } from '../../store/actions/userActions'
import {
  loadBoard, addBoard,
  removeBoard, loadBoards,
  updateBoardAfterSocket
} from '../../store/actions/boardActions'
import { socketService } from '../../services/socketService'
import { Route } from 'react-router'
import { Chat } from '../cmps/Chat'

class _BoardApp extends React.Component {

  async componentDidMount() {
    const { loggedInUser, boards } = this.props
    const { id } = this.props.match.params
    if (!loggedInUser) {
      this.props.history.push('/')
      return
    }
    await socketService.setup()
    socketService.emit('board room', id)
    socketService.on('update board', this.props.updateBoardAfterSocket)
    if (!boards.length) {
      await this.props.loadBoards(loggedInUser._id) // this is a problem
      // this.onAddBoard('Start here')
    }
    if (id) {
      this.props.loadUsers()
      this.loadBoard()
    }
  }

  componentWillUnmount() {
    socketService.terminate()
    socketService.off('update board', this.props.updateBoardAfterSocket)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      socketService.emit('board room', this.props.match.params.id)
      this.loadBoard(this.props.match.params.id)
    }
  }

  // useEffect(() => {
  //   socketService.emit('board room', this.props.match.params.id)
  //     this.loadBoard(this.props.match.params.id)
  // }, [id])

  onBoardFilter = (filterBy) => {
    this.props.loadBoards(this.props.loggedInUser._id, filterBy)
  }

  loadBoard = () => {
    const { id } = this.props.match.params
    this.props.loadBoard(id)
  }

  onAddBoard = (title) => {
    const { loggedInUser, addBoard } = this.props
    addBoard(title, loggedInUser._id)
  }

  onRemoveBoard = (BoardId) => {
    const { removeBoard, boards } = this.props
    if (boards.length === 1) return
    removeBoard(BoardId)
    // const path = boards?.length ? `/board/${boards[0]._id}` : `/board`
    // this.props.history.push(path)
  }

  render() {
    const { board, boards, loggedInUser, match, logout } = this.props
    if (!board) return <div className="loading"></div>
    return (
      <section className="board-app-container flex">
        <SideHeader user={loggedInUser} logout={logout} />
        {/* <div className="flex app-main-container"> */}
        <SideNav boards={boards}
          boardId={board._id}
          onBoardFilter={this.onBoardFilter}
          onRemoveBoard={this.onRemoveBoard}
          onAddBoard={this.onAddBoard} />
        <BoardPreview />
        {/* </div> */}
      </section>
    )
  }
}

function mapStateToProps(state) {
  return {
    boards: state.boardModule.boards,
    board: state.boardModule.board,
    loggedInUser: state.userModule.loggedInUser
  }
}

const mapDispatchToProps = {
  loadBoard,
  addBoard,
  removeBoard,
  loadBoards,
  loadUsers,
  updateBoardAfterSocket,
  logout
}

export const BoardApp = connect(mapStateToProps, mapDispatchToProps)(_BoardApp)