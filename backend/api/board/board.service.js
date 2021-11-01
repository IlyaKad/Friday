
const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  remove,
  saveBoard,
  updateBoard
  // getByBoardname,
}

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)
  try {
    const collection = await dbService.getCollection('board')
    const boards = await collection.find(criteria).toArray()
    return boards
  } catch (err) {
    logger.error('cannot find boards', err)
    throw err
  }
}

// re-check this part: might need it as is for board chat (chat per user)
async function getById(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    const board = await collection.findOne({ '_id': ObjectId(boardId) })
    // delete user.password

    // user.givenReviews = await reviewService.query({ byUserId: ObjectId(user._id) })
    // user.givenReviews = user.givenReviews.map(review => {
    //     delete review.byUser
    //     return review
    // })

    return board
  } catch (err) {
    logger.error(`while finding board ${boardId}`, err)
    throw err
  }
}

async function remove(boardId) {
  try {
    const collection = await dbService.getCollection('board')
    await collection.deleteOne({ '_id': ObjectId(boardId) })
  } catch (err) {
    logger.error(`cannot remove board ${boardId}`, err)
    throw err
  }
}

async function saveBoard(board) {
  try {
    const collection = await dbService.getCollection('board');
    await collection.insertOne(board);
    return board;
  } catch (err) {
    console.log('cannot insert board', err);
    throw err;
  }
}

async function updateBoard(board) {
  try {
    const boardToUpdate = { ...board, _id: ObjectId(board._id) }
    const collection = await dbService.getCollection('board');
    await collection.updateOne({ _id: ObjectId(boardToUpdate._id) }, { $set: boardToUpdate });
    return boardToUpdate;
  } catch (err) {
    console.log('cannot update board', err);
    throw err;
  }
}

function _buildCriteria(filterBy) {
  const { name, type, sortBy } = filterBy
  const criteria = {}
  if (name) criteria.title = { $regex: name, $options: 'i' }
  return criteria
}
