import React from 'react';
import { Link } from 'react-router-dom'
import { BoardFilter } from './BoardFilter'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import HomeIcon from '@material-ui/icons/Home';
import { Input } from '@material-ui/core';
import { ClickAwayListener } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ViewListIcon from '@material-ui/icons/ViewList';

export class SideNav extends React.Component {

  state = {
    isAddTxt: false,
    boardTitle: '',
    isNavShown: true
  }

  onToggleAddInput = () => {
    this.setState({ isAddTxt: !this.state.isAddTxt })
  }

  addBoard = (ev) => {
    ev.preventDefault()
    const { boardTitle } = this.state
    if (boardTitle) {
      this.props.onAddBoard(boardTitle)
    }
    this.setState({ isAddTxt: !this.state.isAddTxt, boardTitle: '' })
  }

  handleChange = ({ target }) => {
    const { value } = target
    this.setState({ boardTitle: value })
  }

  onToggleBar = () => {
    this.setState({ isNavShown: !this.state.isNavShown })
  }



  render() {
    const { boards, boardId, onRemoveBoard, onBoardFilter } = this.props
    const { isAddTxt, isNavShown } = this.state

    return (
      <nav className={`main-sidenav flex column ${(isNavShown) ? "" : "hide"}`}>
        <div className={`content-container ${isNavShown ? "" : "opacity-hide"}`}>
          <div className="my-workspace flex">
            <div className="flex">M</div>
            <HomeIcon className="home-icon" />
            <h1>My Workspace</h1>
          </div>

          <BoardFilter onBoardFilter={onBoardFilter} />

          {(!isAddTxt) ?
            <div className="add-board-btn flex align-center" onClick={this.addBoard}>
              <AddCircleOutlineIcon style={{ color: '7a7a82' }} />
              <span>Add board</span>
            </div> :
            <form className="add-board-form" style={{ paddingLeft: '9px' }} onSubmit={this.addBoard}>
              <ClickAwayListener onClickAway={this.onToggleAddInput}>
                <Input style={{ fontSize: '12px' }} className="add-board-input" type="text"
                  name="board-title"
                  autoComplete="off"
                  autoFocus={true}
                  required={true}
                  placeholder="New Board title"
                  onChange={this.handleChange} />
              </ClickAwayListener>
            </form>}

          <h1 className="my-boards-title">My boards</h1>
          <ul>
            {boards.map(board =>
              <li className="nav-a" key={board._id}>
                <div className={`board-link-container flex align-center  ${board._id === boardId ? 'active' : ''}`}>
                  <ViewListIcon style={{ color: '#7a7a82' }} />
                  <Link to={`/board/${board._id}`} className="clean-link sidebar-link">{board.title}</Link>
                  {(boards.length !== 1) && < DeleteIcon className="delete-icon" onClick={() => onRemoveBoard(board._id)} />}
                </div>
              </li>)}
          </ul>
        </div>

        <button className="toggle-nav-btn" onClick={this.onToggleBar}>
          {isNavShown && <ArrowBackIosIcon className="toggle-nav-close-icon" />
            || <ArrowForwardIosIcon className="toggle-nav-open-icon" />}
          {/* <SettingsEthernetIcon className="toggle-nav-icon" /> */}
        </button>
      </nav >
    )
  }
}
