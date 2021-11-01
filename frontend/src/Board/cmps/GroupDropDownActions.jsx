import React, { Component } from 'react'
import DeleteIcon from '@material-ui/icons/Delete'
import { ColorPalette } from './ColorPalette'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import { ClickAwayListener, Divider } from '@material-ui/core'
import DragIndicatorIcon from '@material-ui/icons/DragIndicator'


export class GroupDropDownActions extends Component {

  state = {
    isActionsModal: false,
    isMouseOver: false,
    isPalette: false
  }

  toggleGroupActions = () => {
    this.setState({ isActionsModal: !this.state.isActionsModal })
  }

  closeGroupActions = () => {
    this.setState({ isActionsModal: false })
    this.setState({ isPalette: false })
  }

  openPalette = () => {
    this.setState({ isPalette: !this.state.isPalette })
  }

  render() {
    const { group, onRemoveGroup, onChangeColor, provided } = this.props
    const { isMouseOver, isActionsModal, isPalette } = this.state
    return (
      <ClickAwayListener onClickAway={this.closeGroupActions}>
        <div className="group-actions-container flex align-center">

          <ArrowDropDownIcon className="drop-down-icon"
            onMouseEnter={() => this.setState({ isMouseOver: true })}
            onMouseLeave={() => this.setState({ isMouseOver: false })}
            style={{
              backgroundColor: isMouseOver ? '#ffffff' : group.style.color,
              border: !isMouseOver ? '#ffffff' : `1px solid ${group.style.color}`,
              color: isMouseOver ? group.style.color : '#ffffff'
            }}
            onClick={this.toggleGroupActions} />
          <span className="drag-icon" {...provided.dragHandleProps} ><DragIndicatorIcon /></span>
          {isActionsModal &&
            <div className="group-actions">
              <div className="delete-action" onClick={() => { onRemoveGroup(group.id) }}>
                <DeleteIcon className="delete-icon" />
                <span>Delete group</span>
              </div>
              <div className="color-action" onClick={this.openPalette}>
                <div className="curr-color" style={{ backgroundColor: group.style.color }} ></div>
                <span>Change group color</span>
              </div>
              {isPalette && <ColorPalette onChangeColor={onChangeColor} />}
            </div>}
        </div>
      </ClickAwayListener>
    )
  }
}
