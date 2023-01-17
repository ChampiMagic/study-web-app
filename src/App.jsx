// React imports
import React from 'react'

// Components imports
import AuthPage from './pages/authPage.jsx'
import HomePage from './pages/homePage.jsx'
import NotFoundPage from './pages/notFoundPage.jsx'
import PrivateAuthRoute from './components/privateRoutes/privateAuthRoute.jsx'

// Css imports
import './index.css'

// React-router imports
import { Route, Routes } from 'react-router-dom'

export default function App () {
  return (
    <>
      <Routes>

        {/* Auth Page as the first page */}
        <Route path='/' element={<AuthPage />} />

        {/* Only authenticated users can access */}
        {/* <Route element={<PrivateAuthRoute />}> SACAR ESTO A LA HORA DE HACER COMMIT */}
        <Route path='/home' element={<HomePage />} />
        {/* </Route> */}

        {/* If not page found, we redirect to the 404 page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
