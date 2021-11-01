const initialState = {
  boards: [],
  err: null,
  board: null
}

export function boardReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_BOARDS':
      return { ...state, boards: action.boards }
    case 'SET_CURR_BOARD':
      return { ...state, board: action.board }
    case 'ADD_BOARD':
      return { ...state, boards: [...state.boards, action.savedBoard] }
    case 'UPDATE_BOARD':
      return {
        ...state, board: action.board,
        boards: state.boards.map(board => board._id === action.board._id ? action.board : board)
      }
    case 'REMOVE_BOARD':
      return { ...state, boards: state.boards.filter(board => board._id !== action.boardId) }
    case 'BOARD_ERR':
      return { ...state, err: action.err }
    default:
      return state
  }
}