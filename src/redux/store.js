
import { configureStore } from '@reduxjs/toolkit'
// This line imports the "configureStore" function from the "@reduxjs/toolkit" library.
// This function is used to configure and create a new Redux store.

import { combineReducers } from 'redux'
// This line imports the "combineReducers" function from the "redux" library.
// This function is used to combine multiple individual reducers into a single reducer
// that can handle multiple actions.

import thunk from 'redux-thunk'
// This line imports the "thunk" middleware from the "redux-thunk" library.
// Thunk middleware allows you to write action creators that return a function instead of an action.
// This allows for asynchronous logic and other non-plain object actions.

import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// This line import the persistReducer, and the storage from 'redux-persist' library.
// Persist Reducer is used to save the state of the redux store to the local storage.
// The storage import is the default storage engine, that by default use the web localStorage.

// Reducer imports
import projectReducer from './slices/projectSlice'
import userReducer from './slices/userSlice'
import tagReducer from './slices/tagSlice'
import cardReducer from './slices/cardSlice'

const reducers = combineReducers({
  userController: userReducer,
  projectController: projectReducer,
  tagController: tagReducer,
  cardController: cardReducer
})

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userController', 'tagController']
}

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
})

export default store
