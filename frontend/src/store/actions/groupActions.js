import { groupService } from '../../services/groupService.js'

export function loadGroups(filterBy) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const groups = await groupService.query(filterBy)
            dispatch({ type: 'SET_GROUPS', groups })
        } catch (err) {
            console.log('group.action: err in loadgroups():', err);
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function loadGroup(groupId) {
    return async dispatch => {
        try {
            dispatch({ type: 'LOADING_START' })
            const group = await groupService.getById(groupId)
            dispatch({ type: 'LOAD_GROUP', group })
        } catch (err) {
            console.log('group.action: err in loadGroup():', err);
        } finally {
            dispatch({ type: 'LOADING_DONE' })
        }
    }
}

export function saveGroup(group) {
    return async dispatch => {
        try {
            const savedGroup = await groupService.save(group)
            dispatch({ type: 'ADD_GROUP', savedGroup })
        } catch (err) {
            console.log('group.action: err in saveGroup():', err);
        }

    }
}

export function removeGroup(groupId) {
    return async dispatch => {
        try {
            await groupService.remove(groupId)
            dispatch({ type: 'REMOVE_GROUP', groupId })
        } catch (err) {
            console.log('group.action: err in removeGroup():', err);
        }
    }
}
