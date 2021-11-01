// import Axios from 'axios'
import { httpService } from './httpService'
import { storageService } from './asyncStorageService'

export const groupService = {
    remove,
    getById,
}

function remove(groupId) {
    return httpService.delete(`group/${groupId}`)
    // return storageService.delete('group', groupId)
}

function getById(groupId) {
    return httpService.get(`group/${groupId}`)
    // return storageService.get('group', groupId)
}


