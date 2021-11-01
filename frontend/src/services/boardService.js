import { CssBaseline } from '@material-ui/core';
import { httpService } from './httpService'
// import { storageService } from './asyncStorageService'
import { userService } from './userService';
import { utilService } from './utilService';

export const boardService = {
  query,
  removeBoard,
  getById,
  addBoard,
  addGroupToBoard,
  // addTaskToGroup,
  removeGroupFromBoard,
  removeTaskFromGroup,
  // changeBoardTitle,
  updateTask,
  updateGroup,
  updateBoard,
  updateBoardAfterDrag
}

async function query(filterBy) {
  return httpService.get('board', filterBy)
  // const boards = await storageService.query('board')
  // return boards.filter(board => {
  //   return board.members.includes(userId)
  // })
}

function removeBoard(boardId) {
  return httpService.delete(`board/${boardId}`)
  // return storageService.remove('board', boardId)
}

function getById(boardId) {
  return httpService.get(`board/${boardId}`)
  // return storageService.get('board', boardId)
}

async function addGroupToBoard(board, userId) {
  try {
    // TODo : send task.id to Create activity
    const boardToUpdate = JSON.parse(JSON.stringify(board))
    boardToUpdate.groups.unshift(_addDefaultGroup(userId))
    const activity = _createActivity(userId, `Added a new group to board: ${board.title}. `)
    boardToUpdate.activities = [activity, ...boardToUpdate.activities]
    httpService.put('board', boardToUpdate)
    return boardToUpdate
  } catch (err) {
    throw err
  }
  // return storageService.put('board', boardToUpdate)
}

async function removeGroupFromBoard(board, userId, groupId) {
  try {

    const boardToUpdate = JSON.parse(JSON.stringify(board))
    const idx = boardToUpdate.groups.findIndex(group => group.id === groupId)
    const activity = _createActivity(userId, `Removed the following group: ${boardToUpdate.groups[idx].title}.`)
    boardToUpdate.groups.splice(idx, 1)
    boardToUpdate.activities = [activity, ...boardToUpdate.activities]
    httpService.put('board', boardToUpdate)
    return boardToUpdate
  } catch (err) {
    throw err
  }
  // return storageService.put('board', boardToUpdate)
}

async function removeTaskFromGroup(board, userId, groupId, taskId) {
  try {

    const boardToUpdate = JSON.parse(JSON.stringify(board))
    const groupIdx = boardToUpdate.groups.findIndex(group => group.id === groupId)
    const taskIdx = boardToUpdate.groups[groupIdx].tasks.findIndex(task => task.id === taskId)
    const taskName = boardToUpdate.groups[groupIdx].tasks[taskIdx].title
    const activity = _createActivity(userId, ` removed the Task: ${taskName} 
  from following Group: ${boardToUpdate.groups[groupIdx].title}`)
    boardToUpdate.activities = [activity, ...boardToUpdate.activities]
    boardToUpdate.groups[groupIdx].tasks.splice(taskIdx, 1)
    httpService.put('board', boardToUpdate)
    return boardToUpdate
    // return storageService.put('board', boardToUpdate)
  } catch (err) {
    throw err
  }
}

async function updateTask({ board, groupId, userId, taskId, newValue, type }) {
  try {
    const boardToUpdate = JSON.parse(JSON.stringify(board))
    if (!taskId) { // add new task
      const idx = boardToUpdate.groups.findIndex(group => group.id === groupId)
      boardToUpdate.groups[idx].tasks.push(_addDefaultTask(userId, newValue))
      const activity = _createActivity(userId, `Added a new task: ${newValue}
    to the following Group: ${board.groups[idx].title}`)
      boardToUpdate.activities = [activity, ...boardToUpdate.activities]
    } else { //update task3
      const groups = boardToUpdate.groups.map(group => {
        if (group.id === groupId) {
          const tasks = group.tasks.map(task => {
            if (task.id === taskId) {
              let activity = _createActivityByType(newValue, userId, task, type)
              boardToUpdate.activities = [activity, ...boardToUpdate.activities]
              task[type] = newValue
            }
            return task
          })
          group.tasks = tasks
          return group
        } else return group
      })
      boardToUpdate.groups = groups
    }
    httpService.put('board', boardToUpdate)
    return boardToUpdate
  } catch (err) {
    throw err
  }
}

function _createActivity(userId, taskId, activityTxt) {
  return {
    id: _makeId(),
    txt: activityTxt,
    createdAt: Date.now(),
    byMember: userId,
    taskId
  }
}

function _createActivityByType(newValue, userId, task, type) {
  switch (type) {
    case "dueDate":
      const dateStr = [utilService.formatDate(newValue.startDate), utilService.formatDate(newValue.endDate)]
      return _createActivity(userId, task.id, `Updated the ${type} for task: "${task.title}" from ${dateStr[0]} until ${dateStr[1]}.`)
    case "title":
      return _createActivity(userId, task.id, `Changed ${task.title}'s ${type} to : ${newValue}.`)
    case "members":
      return _createActivity(userId, task.id, `Amended the task members for: "${task.title}" task.`)
    case "updates":
      const chatStr = newValue[0].txt.toString()
      return _createActivity(userId, task.id, `Sent a message: "${chatStr}" in ${task.title}'s chat.`)
    default:
      return _createActivity(userId, task.id, `Changed ${task.title}'s task ${type} to : ${newValue.txt}.`)
  }
}

async function updateBoardAfterDrag(board) {
  try {
    await httpService.put('board', board)
    return board
  } catch (err) {
    throw err
  }
  // return storageService.put('board', board)
}

async function updateGroup({ board, groupId, userId, newValue, type }) {
  try {
    const boardToUpdate = JSON.parse(JSON.stringify(board))
    const groups = board.groups.map(group => {
      if (group.id === groupId) {
        if (type === 'color') {
          group.style[type] = newValue
          const activity = _createActivity(userId, `Changed the color theme for Group:"${group.title}".`)
          boardToUpdate.activities = [activity, ...boardToUpdate.activities]
        }
        else {
          group[type] = newValue
          const activity = _createActivity(userId, `Updated the ${type} of Group :"${group.title}".`)
          boardToUpdate.activities = [activity, ...boardToUpdate.activities]
        }
        return group
      } else return group
    })
    boardToUpdate.groups = groups
    httpService.put('board', boardToUpdate)
    return boardToUpdate
  } catch (err) {
    throw err
  }
}

async function updateBoard({ board, groupId, userId, newValue, type }) {
  try {

    const boardToUpdate = JSON.parse(JSON.stringify(board))
    boardToUpdate[type] = newValue
    let activity = ''
    if (Array.isArray(newValue)) activity = _createActivity(userId, ` amended the board members.`)
    else activity = _createActivity(userId, `Updated the ${type} of ${board.title} to ${newValue}.`)
    boardToUpdate.activities = [activity, ...boardToUpdate.activities]
    httpService.put('board', boardToUpdate)
    return boardToUpdate
    // return storageService.put('board', boardToUpdate)
  } catch (err) {
    throw err
  }
}

async function addBoard(boardTxt, userId) {
  try {
    const board = _addDefaultBoard(boardTxt, userId)
    const activity = _createActivity(userId, `Created a new board named: ${board.title}.`)
    board.activities = [activity, ...board.activities]
    return httpService.post('board', board)

  } catch (err) {
    throw err
  }
  // return storageService.post('board', board)
}

function _addDefaultBoard(boardTxt, userId) {
  return {
    title: boardTxt,
    createdAt: Date.now(),
    createdBy: userId,
    members: [userId],
    "groups": [_addDefaultGroup(userId)],
    activities: []
  }
}

function _addDefaultGroup(userId) {
  return {
    id: _makeId(),
    title: "New Group",
    createdAt: Date.now(),
    createdBy: userId,
    style: {
      color: "#00ca72"
    },
    statuses: [
      {
        id: _makeId(),
        color: "#00c875",
        txt: "Done"
      },
      {
        id: _makeId(),
        color: "#fec06e",
        txt: "Working on it"
      },
      {
        id: _makeId(),
        color: "#e2445c",
        txt: "Stuck"
      }
    ],
    priorities: [
      {
        txt: "Low",
        color: "#00c875",
        id: _makeId()
      },
      {
        txt: "Medium",
        color: "#6b97f1",
        id: _makeId()
      },
      {
        txt: "High",
        color: "#ff7b4e",
        id: _makeId()
      },
      {
        txt: "Urgent",
        color: "#ff265d",
        id: _makeId()
      }
    ],
    tasks: [_addDefaultTask(userId, 'New item')],
  }

}

function _addDefaultTask(userId, newValue) {
  return {
    id: _makeId(),
    title: newValue,
    updates: [],
    members: [],
    status: {
      id: _makeId(),
      color: "#dbdbdbf5",
      txt: "No status yet"
    },
    priority: {
      id: _makeId(),
      color: "#dbdbdbf5",
      txt: "Set Priority"
    },
    updates: [],
    createdAt: Date.now(),
    createdBy: userId,
    dueDate: {
      startDate: "",
      endDate: ""
    }
  }
}


function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}