// react imports
import React, { useState } from 'react'

// MUI imports
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// Redux imports
import { useDispatch, useSelector } from 'react-redux'
import { filterProjects } from '../../redux/slices/projectSlice.js'

export default function ProjectFilter () {
  const [seletedTags, setSelectedTag] = useState('all')

  const dispatch = useDispatch()

  const tags = useSelector(state => state.tagController.tags)

  const handleChange = (tag) => {
    setSelectedTag(tag)

    dispatch(filterProjects({ tag }))
  }

  return (

    <Box sx={{ minWidth: 120, marginRight: '1em' }}>
      <FormControl fullWidth>
        <InputLabel id='simple-select-label'>Filter</InputLabel>
        <Select
          labelId='simple-select-label'
          id='simple-select'
          value={seletedTags}
          label='Filter'
          onChange={(e) => handleChange(e.target.value)}
        >
          <MenuItem key='all' value='all'>
            All
          </MenuItem>
          {tags.map((tag) => (
            <MenuItem key={tag._id} value={tag.name}>
              {tag.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>

  )
}
