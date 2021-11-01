const express = require('express')
const { requireAuth, requireAdmin } = require('../../middlewares/requireAuth.middleware')
const setupAsyncLocalStorage = require('../../middlewares/setupAls.middleware')
const { getBoard, getBoards, deleteBoard, saveBoard, updateBoard } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.post('/', saveBoard)
router.put('/',setupAsyncLocalStorage, updateBoard)
router.get('/:id', getBoard)
router.delete('/:id', deleteBoard) // for now, later on add auth of loged user && admin

// router.delete('/:id', requireAuth, requireAdmin, deleteBoard)

module.exports = router