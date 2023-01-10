// Redux imports
import { createSlice } from '@reduxjs/toolkit'

// Initial value for the User global state
const initialState = {
  user: {}
}

export const userController = createSlice({
  name: 'userController',
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.user = action.payload
    },
    deleteUser: (state) => {
      state.user = {}
    },
    updateUser: (state, action) => {
      state.user = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { saveUser, deleteUser, updateUser } = userController.actions

export default userController.reducer
