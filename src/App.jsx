// React imports
import React from 'react'

// Components imports
import AuthPage from './pages/authPage.jsx'
import HomePage from './pages/homePage.jsx'
import NotFoundPage from './pages/notFoundPage.jsx'
import PrivateAuthRoute from './components/privateRoutes/privateAuthRoute.jsx'
import ProjectPage from './pages/projectPage.jsx'

// Css imports
import './index.css'

// React-router imports
import { Route, Routes } from 'react-router-dom'
import ProfilePage from './pages/profilePage.jsx'

export default function App () {
  return (
    <>
      <Routes>

        {/* Auth Page as the first page */}
        <Route path='/' element={<AuthPage />} />

        {/* Only authenticated users can access */}
        <Route element={<PrivateAuthRoute />}>
          <Route path='/home' element={<HomePage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/project/:projectId' element={<ProjectPage />} />
        </Route>
        {/* If not page found, we redirect to the 404 page */}
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}
