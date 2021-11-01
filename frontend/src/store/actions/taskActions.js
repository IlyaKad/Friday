import { taskService } from '../../services/taskService.js'

export function loadTasks(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const tasks = await taskService.query(filterBy)
            dispatch({ type: 'SET_TASKS', tasks })
        } catch (err) {
            console.log('task.action: err in loadtasks():', err);
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function loadTask(board, groupId, taskId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const task = await taskService.getById(taskId)
            dispatch({ type: 'LOAD_TASK', task })
        } catch (err) {
            console.log('task.action: err in loadTask():', err);
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function saveTask(task) {
    return async dispatch => {
        try {
            const savedTask = await taskService.save(task)
            dispatch({ type: 'ADD_TASK', savedTask })
        } catch (err) {
            console.log('task.action: err in saveTask():', err);
        }

    }
}

export function removeTask(taskId) {
    return async dispatch => {
        try {
            await taskService.remove(taskId)
            dispatch({ type: 'REMOVE_TASK', taskId })
        } catch (err) {
            console.log('task.action: err in removeTask():', err);
        }
    }
}
