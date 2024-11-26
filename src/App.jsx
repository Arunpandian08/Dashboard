import React, { lazy, Suspense, useEffect, useState } from 'react'
import Loader from './Components/Loader/Loader'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const PostDetails = lazy(() => import('./Pages/PostDetails/PostDetails'))

export const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const App = () => {
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(1)
  const [data, setData] = useState({ posts: [], comments: [], todos: [] })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    fetchUsersData();
  }, [])

  useEffect(() => {
    if (selectedUser) {
      fetchPostCommentsTodosData(selectedUser.id)
    }
  }, [selectedUser])

  const fetchUsersData = async () => {
    try {
      const userResponse = await axios.get(`${BASE_URL}/users`)
      setUserData(userResponse.data)
      setSelectedUser(userResponse.data[0])
    } catch (error) {
      console.error('Failed to Fetch data!', error);

    }
  }

  const fetchPostCommentsTodosData = async (userId) => {
    setIsLoading(true)
    try {
      const [posts, comments, todos] = await Promise.all([
        axios.get(`${BASE_URL}/posts?userId=${userId}`),
        axios.get(`${BASE_URL}/comments`),
        axios.get(`${BASE_URL}/todos`),
      ])
      setData({
        posts: posts.data,
        comments: comments.data.filter((comment) => posts.data.some((post) => post.id === comment.postId)),
        todos: todos.data
      })
    } catch (error) {
      console.error('Error fetching post,comments,todos data', error);
    }
    finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <Suspense fallback={<Loader />}>
      <header>
        <Navbar selectedUser={selectedUser} />
      </header>
      <main>
        <Routes>
          <Route
            path='/'
            element={
              <Dashboard
                userData={userData}
                setSelectedUser={setSelectedUser}
                data={data}
              />
            }
          />
          <Route path='/post/:id' element={<PostDetails />} />
        </Routes>
      </main>
    </Suspense>
  )
}

export default App