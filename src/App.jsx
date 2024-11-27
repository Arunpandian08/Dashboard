import React, { lazy, Suspense, useEffect, useState } from 'react'
import Loader from './Components/Loader/Loader'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import ConfirmationPopup from './Components/ConfirmationPopup/ConfirmationPopup'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const PostDetails = lazy(() => import('./Pages/PostDetails/PostDetails'))

export const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const App = () => {
  const [userData, setUserData] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [data, setData] = useState({ posts: [], comments: [], todos: [] })
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [postToDelete, setPostToDelete] = useState(null)
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

  const handleDeletePost = (postId) => {
    console.log('Id passed to set post and set popup open')
    setPostToDelete(postId)
    setIsPopupOpen(true)
  }


  const confirmToDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postToDelete}`)
      setData((prevData) => ({
        ...prevData,
        posts: prevData.posts.filter(post => post.id !== postToDelete)
      }))
      toast.success('Post deleted Successfully!', {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
        
      setIsPopupOpen(false)
    } catch (error) {
      toast.error('Failed to delete the post', {
        position: "top-center",
        autoClose: 300,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
        });
    }

  }

  const cancelDelete = () => {
    setIsPopupOpen(false)
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
                isLoading={isLoading}
                handleDeletePost={handleDeletePost}
              />
            }
          />
          <Route path='/post/:id' element={<PostDetails setIsLoading={setIsLoading} isLoading={isLoading} />} />
        </Routes>
      </main>
      <ConfirmationPopup
        isPopupOpen={isPopupOpen}
        confirmToDelete={confirmToDelete}
        cancelDelete={cancelDelete}
      />
      <ToastContainer />
    </Suspense>
  )
}

export default App