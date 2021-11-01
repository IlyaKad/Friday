import { createStore, applyMiddleware, compose, combineReducers } from 'redux'

import thunk from 'redux-thunk'
import { systemReducer } from './reducers/systemReducer.js'
import { boardReducer } from './reducers/boardReducer.js'
import { userReducer } from './reducers/userReducer.js'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const rootReducer = combineReducers({
    systemModule: systemReducer,
    userModule: userReducer,
    boardModule: boardReducer,
})

export const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)
