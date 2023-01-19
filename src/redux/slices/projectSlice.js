// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  totalPages: 0
}

export const userController = createSlice({
  name: 'userController',
  initialState,
  reducers: {
    updateProjects: (state, payload) => {
      state.projects = [payload.projects] // Chequear
      state.totalPages = payload.totalPages // Preguntar
    },
    deleteProjects: (state) => {
      state.projects = []
      state.totalPages = 0
    }
  }
})

export const { updateProjects, deleteProjects } = userController.actions

export default userController.reducer
