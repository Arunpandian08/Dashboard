import React, { lazy, Suspense } from 'react'
import Loader from './Components/Loader/Loader'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))

const App = () => {
  return (
    <Suspense fallback={<Loader />}>
      <header>
        <Navbar />
      </header>
      <main>
        Dashboard
      </main>
    </Suspense>
  )
}

export default App