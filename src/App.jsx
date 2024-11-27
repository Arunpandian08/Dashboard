import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { BASE_URL, fetchPostCommentsTodosDataFromAPI, fetchUsers } from './Services/apiServices';
import ConfirmationPopup from './Components/ConfirmationPopup/ConfirmationPopup'
import Loader from './Components/Loader/Loader'
import { Flip, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const Navbar = lazy(() => import('./Components/Navbar/Navbar'))
const Dashboard = lazy(() => import('./Pages/Dashboard/Dashboard'))
const PostDetails = lazy(() => import('./Pages/PostDetails/PostDetails'))

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
      const userResponse = await fetchUsers();
      setUserData(userResponse);
      setSelectedUser(userResponse[0]);
    } catch (error) {
      toast.error('Failed to fetch users data', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
      console.error('Failed to Fetch data!', error);
    }
  }

  const fetchPostCommentsTodosData = async (userId) => {
    setIsLoading(true);
    try {
      const { posts, comments, todos } = await fetchPostCommentsTodosDataFromAPI(userId);
      setData({
        posts,
        comments: comments.filter((comment) => posts.some((post) => post.id === comment.postId)),
        todos
      });
    } catch (error) {
      toast.error('Error fetching posts, comments, todos data', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
      });
      console.error('Error fetching post,comments,todos data', error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleDeletePost = (postId) => {
    setPostToDelete(postId)
    setIsPopupOpen(true)
  }

  const TOAST_OPTION = {
    position: "top-center",
    autoClose: 300,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    transition: Flip,
  }
  
  const confirmToDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${postToDelete}`)
      setData((prevData) => ({
        ...prevData,
        posts: prevData.posts.filter(post => post.id !== postToDelete)
      }))
      toast.success('Post deleted Successfully!', TOAST_OPTION);

      setIsPopupOpen(false)
    } catch (error) {
      console.error('Error deleting post:', error.response ? error.response.data : error);
      toast.error('Failed to delete the post', TOAST_OPTION);
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