// import Axios from 'axios'
import { httpService } from './httpService'
import { storageService } from './asyncStorageService'

export const taskService = {
    remove,
}

function remove(taskId) {
    // return httpService.delete(`task/${taskId}`)
    return storageService.delete('task', taskId)
}







