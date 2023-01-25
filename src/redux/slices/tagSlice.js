// Redux imports
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tags: []
}

export const tagController = createSlice({
  name: 'tagController',
  initialState,
  reducers: {
    newTags: (state, action) => {
      state.tags = action.payload.tags
    },
    addTag: (state, action) => {
      state.tags = [action.payload.tag, ...state.tags]
    },
    updateTag: (state, action) => {
      const updatedTag = action.payload.tag
      state.tags = state.tags.map((tag, i) => {
        if (tag._id === updatedTag._id) tag = updatedTag
        return tag
      })
    },
    deleteAllTags: (state) => {
      state.tags = []
    },
    deleteOneTag: (state, action) => {
      state.tags = state.tags.filter((t) => t._id !== action.payload.tagId)
    }
  }
})

export const { newTags, addTag, updateTag, deleteAllTags, deleteOneTag } = tagController.actions

export default tagController.reducer
