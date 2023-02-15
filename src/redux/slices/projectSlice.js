// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  projects: [],
  currentProjects: [],
  totalPages: 0,
  filter: 'all'
}

export const projectController = createSlice({
  name: 'projectController',
  initialState,
  reducers: {
    newProjects: (state, action) => {
      state.projects = action.payload.projects
      state.currentProjects = action.payload.projects
      state.totalPages = Math.ceil((state.currentProjects.length) / 8)
    },
    addProject: (state, action) => {
      state.projects = [action.payload.project, ...state.projects]

      if (state.filter === 'all' || action.payload.project.tag === state.filter) {
        state.currentProjects = [action.payload.project, ...state.currentProjects]
      }

      state.totalPages = Math.ceil(state.currentProjects.length / 8)
    },
    updateProject: (state, action) => {
      state.projects = state.projects.map((p) => {
        if (p._id === action.payload.project._id) {
          p = action.payload.project
        }
        return p
      })

      state.currentProjects = state.currentProjects.map((p) => {
        if (p._id === action.payload.project._id) {
          p = action.payload.project
        }
        return p
      })
    },
    updateCurrentProjects: (state, action) => {
      const newProjects = action.payload.projects

      if (state.filter === 'all') state.currentProjects = newProjects
      else state.currentProjects = newProjects.filter((p) => p.tag.name === state.filter)

      state.totalPages = Math.ceil(state.currentProjects.length / 8)
    },
    updateProjectsTags: (state, action) => {
      const newProjects = action.payload.projects
      state.projects = newProjects

      if (state.filter === 'all') state.currentProjects = newProjects
      else state.currentProjects = newProjects.filter((p) => p.tag.name === state.filter)

      state.totalPages = Math.ceil(state.currentProjects.length / 8)
    },
    deleteProjects: (state) => {
      state.projects = []
      state.currentProjects = []
      state.totalPages = 0
    },
    filterProjects: (state, action) => {
      state.filter = action.payload.tag

      if (state.filter === 'all') state.currentProjects = state.projects
      else state.currentProjects = state.projects.filter((p) => p.tag.name === action.payload.tag)

      state.totalPages = Math.ceil(state.currentProjects.length / 8)
    }
  }
})

export const { newProjects, addProject, deleteProjects, updateCurrentProjects, filterProjects, updateProjectsTags, updateProject } = projectController.actions

export default projectController.reducer
