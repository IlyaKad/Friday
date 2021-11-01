import { boardService } from '../../services/boardService.js'


export function loadBoards(userId, filterBy) {
  return async dispatch => {
    try {
      const boards = await boardService.query(filterBy)
      dispatch({ type: 'SET_BOARDS', boards })
      return boards
    } catch (err) {
      console.log('board.action: err in loadboards():', err);
    }
  }
}

export function loadBoard(boardId) {
  // if(filterBy){

  //   dispatch({ type: 'SET_CURR_BOARD', board })
  // } 
  return async dispatch => {
    try {
      const board = await boardService.getById(boardId)
      dispatch({ type: 'SET_CURR_BOARD', board })
    } catch (err) {
      console.log('board.action: err in loadBoard():', err);
    }

  }
}

// export function onUpdateBoardAfterDrag(board) {
//   return async dispatch => {
//     try {
//       dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
//       const updatedBoard = await boardService.updateBoardAfterDrag(board)
//     } catch (err) {
//       console.log(err);
//     }
//   }
// }

export function onUpdateBoardAfterDrag(board) {
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_BOARD', board })
      const updatedBoard = await boardService.updateBoardAfterDrag(board)
    } catch (err) {
      console.log('board.action: err in onUpdateBoardAfterDrag():', err);
      dispatch({ type: 'UPDATE_BOARD', board })
    }
  }
}

export function updateBoardAfterSocket(board) {
  return async dispatch => {
    try {
      dispatch({ type: 'UPDATE_BOARD', board })
    } catch (err) {
      console.log(err);
    }
  }
}

export function saveBoard(board, userId) {
  return async dispatch => {
    try {
      const savedBoard = await boardService.save(board, userId)
      dispatch({ type: 'ADD_BOARD', savedBoard })
    } catch (err) {
      console.log('board.action: err in saveBoard():', err);
    }
  }
}


export function addGroupToBoard(board, userId) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.addGroupToBoard(board, userId)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      console.log('board.action: err in addGroupToBoard():', err);
      dispatch({ type: 'UPDATE_BOARD', board })
    }
  }
}

// export function addTaskToGroup(board, userId, groupId) {
//   return async dispatch => {
//     try {
//       const updatedBoard = await boardService.addTaskToGroup(board, userId, groupId)
//       dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
//     } catch (err) {
//       console.log('board.action: err in saveBoard():', err);
//     }
//   }
// }

export function removeGroupFromBoard(board, userId, groupId) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.removeGroupFromBoard(board, userId, groupId)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      console.log('board.action: err in saveBoard():', err);
    }
  }
}


export function updateTask(detailsForUpdateTask) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateTask(detailsForUpdateTask)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      dispatch({ type: 'UPDATE_BOARD', board: detailsForUpdateTask.board })
    }
  }
}

export function updateGroup(detailsForUpdateGroup) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateGroup(detailsForUpdateGroup)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      dispatch({ type: 'UPDATE_BOARD', board: detailsForUpdateGroup.board })
    }
  }
}


export function updateBoard(detailsForUpdateBoard) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.updateBoard(detailsForUpdateBoard)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      console.log(err);
      dispatch({ type: 'UPDATE_BOARD', board: detailsForUpdateBoard.board })
    }
  }
}

export function removeTaskFromGroup(board, userId, groupId, taskId) {
  return async dispatch => {
    try {
      const updatedBoard = await boardService.removeTaskFromGroup(board, userId, groupId, taskId)
      dispatch({ type: 'UPDATE_BOARD', board: updatedBoard })
    } catch (err) {
      console.log('board.action: err in saveBoard():', err);
      dispatch({ type: 'UPDATE_BOARD', board })
    }
  }
}

export function addBoard(boardTxt, userId) {
  return async dispatch => {
    try {
      const savedBoard = await boardService.addBoard(boardTxt, userId)
      dispatch({ type: 'ADD_BOARD', savedBoard })
    } catch (err) {
      console.log('board.action: err in addBoard():', err);
    }
  }
}
// export function addBoard(boardTxt, userId) {
//   return async dispatch => {
//     try {
//       const savedBoard = await boardService.addBoard(boardTxt, userId)
//       dispatch({ type: 'ADD_BOARD', savedBoard })
//     } catch (err) {
//       console.log('board.action: err in addBoard():', err);
//     }
//   }
// }

export function removeBoard(boardId) {
  return async dispatch => {
    try {
      await boardService.removeBoard(boardId)
      dispatch({ type: 'REMOVE_BOARD', boardId })
    } catch (err) {
      console.log('board.action: err in removeBoard():', err);
    }
  }
}
