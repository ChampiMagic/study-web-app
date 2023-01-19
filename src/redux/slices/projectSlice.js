// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  totalPages: 0
}

export const projectController = createSlice({
  name: 'projectController',
  initialState,
  reducers: {
    newProjects: (state, action) => {
      state.projects = action.payload.projects
      state.totalPages = action.payload.totalPages
    },
    updateProjects: (state, action) => {
      state.projects = [...action.payload.projects, ...state.projects]
      state.totalPages = action.payload.totalPages ?? state.totalPages
    },
    deleteProjects: (state) => {
      state.projects = []
      state.totalPages = 0
    },
    updateTotalPages: (state, action) => {
      state.totalPages = state.projects.length / (action.payload.limit ?? 8)
    }
  }
})

export const { newProjects, updateProjects, deleteProjects, updateTotalPages } = projectController.actions

export default projectController.reducer
