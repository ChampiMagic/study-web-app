/* eslint-disable no-undef */

// redux imports
import { deleteUser } from '../../redux/slices/userSlice'

// Log Out logic

function useLogOut (dispatch) {
  localStorage.removeItem('token')

  dispatch(deleteUser())
}

export default useLogOut
