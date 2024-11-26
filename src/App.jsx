import React, { lazy, Suspense } from 'react'
import Loader from './Components/Loader/Loader'
import { Routes, Route } from 'react-router-dom'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const PostDetails = lazy(() => import('./Pages/PostDetails/PostDetails'))

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <header>
        <Navbar />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/post/:id' element={<PostDetails />} />
        </Routes>
      </main>
    </Suspense>
  )
}

export default App