/* eslint-disable no-undef */

// Redux imports
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

// Hooks imports
import useIsEmpty from '../../utils/hooks/useIsEmpty.js'

const PrivateAuthRoute = () => {
  // We obtain the user object by hooks
  const user = useSelector((state) => state.userController.user)

  // We obtain the actual jwt of the user
  const token = localStorage.getItem('token')

  // If user is authenticate we let him continue
  if (!useIsEmpty(user) && token) {
    return <Outlet />
  }

  // If not, we rediret to the Auth Page
  return <Navigate to='/' />
}

export default PrivateAuthRoute
