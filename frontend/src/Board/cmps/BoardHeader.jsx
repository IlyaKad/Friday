import React from 'react';
import { userService } from '../../services/userService'
import { TaskFilter } from './TaskFilter'
import { MemberAvatars } from './MemberAvatars'
import Button from '@material-ui/core/Button';
import { EditableElement } from './EditableElement';
import SearchIcon from '@material-ui/icons/Search';
import { Activities } from './Activities';
import { ClickAwayListener } from '@material-ui/core'
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import { FilterModal } from './FilterModal';


export class BoardHeader extends React.Component {

  state = {
    createdBy: '',
    isActivity: false
  }

  componentDidMount() {
    this.createdByTxt()
  }

  createdByTxt = async () => {
    const { board } = this.props
    const createdBy = await userService.getById(board.createdBy)
    this.setState({ createdBy })
  }

  closeActivity = () => {
    this.setState({ isActivity: false })
  }

  onTaskFilter = ({ groupTitle }) => {
    const filteredGroups = this.props.board.groups.filter(group => group.title === groupTitle)
  }

  render() {
    const { board, users, onAddGroup, onChangeBoardTitle, onUpdateBoardMembers } = this.props
    const { isActivity } = this.state
    return (
      <section className="board-header flex column">
        <div className="board-header-top-section flex">
          <div className="board-details flex column">
            <EditableElement
              title={board.title}
              onChangeTitle={onChangeBoardTitle}
            />
            <span className="created-by">Created by: {this.state.createdBy.fullname}</span>
          </div>
          <div className="right-btns-container flex justify-between">
            <MemberAvatars
              onUpdateMembers={onUpdateBoardMembers}
              users={users}
              membersIds={board.members}
            />
            <Button variant="outlined" size="small" onClick={() => this.setState({ isActivity: !isActivity })}
              style={{ marginLeft: "6px" }}  ><TrendingUpIcon />Activities</Button>
            {isActivity && <ClickAwayListener onClickAway={this.closeActivity}>
              <Activities users={users} board={board} closeActivity={this.closeActivity} /></ClickAwayListener>}
          </div>
        </div>
        <div className="board-header-bottom-section flex align-center space-between" >
          <div className="flex align-center">
            <Button className="add-group-btn"
              onClick={onAddGroup}
              variant="contained"
              color="primary" size="small"
            >add group</Button>
          </div>
          <TaskFilter />
          {/* <FilterModal board={board} /> */}
        </div>
      </section>
    )
  }
}


