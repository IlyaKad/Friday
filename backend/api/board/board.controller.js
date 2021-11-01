const boardService = require('./board.service')
const socketService = require('../../services/socket.service')
const logger = require('../../services/logger.service')

async function getBoards(req, res) {
    const { name, sortBy, type } = req.query
    try {
        const filterBy = {
            name: name || '',
            sortBy: sortBy || '',
            type: type || ''
        }
        const boards = await boardService.query(filterBy)
        res.send(boards)
    } catch (err) {
        logger.error('Failed to get boards(controller)', err)
        res.status(500).send({ err: 'Failed to get boards(controller)' })
    }
}

async function getBoard(req, res) {
    try {
        const board = await boardService.getById(req.params.id)
        res.send(board)
    } catch (err) {
        logger.error('Failed to get board', err)
        res.status(500).send({ err: 'Failed to get board' })
    }
}

async function deleteBoard(req, res) {
    try {
        await boardService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete board', err)
        res.status(500).send({ err: 'Failed to delete board' })
    }
}

async function updateBoard(req, res) {
    try {
        const board = req.body;
        const updatedBoard = await boardService.updateBoard(board)
        // socketService.onUpdateBoard('update board',updatedBoard)
        socketService.broadcast({ type: 'update board', data: updatedBoard, room: updatedBoard._id })
        res.send(updatedBoard)
    } catch (err) {
        console.log('Cannot save board', err)
        res.status(500).send({ err: 'Failed to update board (controller)' })
    }
}

async function saveBoard(req, res) {
    try {
        const boardInfo = req.body;
        const board = await boardService.saveBoard(boardInfo)
        res.send(board)
    } catch (err) {
        console.log('Cannot save board', err)
        res.status(500).send({ err: 'Failed to save board (controller)' })
    }
}


module.exports = {
    getBoard,
    getBoards,
    deleteBoard,
    saveBoard,
    updateBoard
}