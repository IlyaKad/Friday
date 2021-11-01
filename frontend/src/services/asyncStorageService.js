
export const storageService = {
  query,
  get,
  post,
  put,
  remove
}


function query(entityType) {
  var entities = JSON.parse(localStorage.getItem(entityType)) || [_loadData(entityType)]
  return Promise.resolve(entities)
}

async function get(entityType, entityId) {
  try {
    const entities = await query(entityType)
    return entities.find(entity => entity._id === entityId)
  } catch (error) {
    console.log('ERROR - Async storage service get(): ', error)
  }
}

async function post(entityType, newEntity) {
  try {
    newEntity._id = _makeId()
    const entities = await query(entityType)
    entities.push(newEntity)
    _saveToLocalStorage(entityType, entities)
    return newEntity
  } catch (error) {
    console.log("ERROR - Async storage service post(): ", error);
  }
}

async function put(entityType, updatedEntity) {
  try {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
    entities.splice(idx, 1, updatedEntity)
    _saveToLocalStorage(entityType, entities)
    return updatedEntity
  } catch (error) {
    console.log("ERROR - Async storage service put(): ", error);
  }
}

async function remove(entityType, entityId) {
  try {
    const entities = await query(entityType)
    const idx = entities.findIndex(entity => entity._id === entityId)
    entities.splice(idx, 1)
    _saveToLocalStorage(entityType, entities)
  } catch (error) {
    console.log("ERROR - Async storage service remove(): ", error);
  }
}

function _saveToLocalStorage(entityType, entities) {
  localStorage.setItem(entityType, JSON.stringify(entities))
}

function _makeId(length = 5) {
  var text = ''
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}

function _loadData(entityType) {
  // const entities = require(`../../data/${entityType}.json`)
  // _saveToLocalStorage(entityType, entities)
  // return entities
}