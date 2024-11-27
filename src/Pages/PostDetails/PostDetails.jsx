import React, { useCallback, useEffect, useState } from 'react'
import './postDetails.css'
import { useNavigate, useParams } from 'react-router-dom'
import { BASE_URL } from '../../Services/apiServices'
import axios from 'axios'
import { Flip, toast } from 'react-toastify'
import DashboardLoader from '../../Components/DashboardLoader/DashboardLoader'

const PostDetails = ({ isLoading, setIsLoading }) => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [post, setPost] = useState(null)
    const [newBody, setNewBody] = useState('')
    const [isEditable, setIsEditable] = useState(false)

    const TOAST_OPTIONS = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Flip,
    };

    useEffect(() => {
        fetchPost(id)
    }, [id])

    const fetchPost = async (postId) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/posts/${postId}`)
            setPost(response.data)
            setNewBody(response.data.body)
        } catch (error) {
            console.error('Error fetching post:', error);
            toast.error('Failed to fetch post. Please try again.', TOAST_OPTIONS);
        }
        finally {
            setIsLoading(false)
        }
    }

    const handleSave = useCallback(async (e) => {
        e.preventDefault();
        if (newBody.trim() === '') {
            toast.info('Please edit to save or cancel it.', TOAST_OPTIONS);
            return;
        }
        try {
            await axios.put(`${BASE_URL}/posts/${id}`, {
                ...post,
                body: newBody
            })
            toast.success('Post saved successfully!', TOAST_OPTIONS);
            setIsEditable(false)
        } catch (error) {
            console.error('Error saving post:', error);
            toast.error('Error saving post. Please try again.', TOAST_OPTIONS);
        }
    }, [id, newBody, post])

    const handleCancel = () => {
        setIsEditable(false)
    }

    return (
        <div className='post-details'>
            {isLoading ? (
                <DashboardLoader />
            ) : (
                <>
                    <h2 className='animate__animated animate__fadeInUp animate__slow'>{post?.title}</h2>
                    <div className="post-card animate__animated animate__zoomIn animate__slow">
                        {!isEditable ? (
                            <div className='card-body animate__animated animate__fadeIn animate__slow'>
                                <span className='edit-icon' onClick={() => setIsEditable(true)}>
                                    <i className="bi bi-pen"></i>
                                </span>
                                <span className='back-btn' onClick={() => navigate('/')}>
                                    <i className="bi bi-arrow-left"></i>
                                </span>
                                <p className='card-text'>{newBody}</p>
                            </div>
                        ) : (
                            <form className='post-form' onSubmit={handleSave}>
                                <textarea
                                    className='post-text-area animate__animated animate__flipInX animate__slow'
                                    rows='5'
                                    cols="30"
                                    value={newBody}
                                    onChange={(e) => setNewBody(e.target.value)}
                                />
                                <div className="buttons animate__animated animate__fadeIn animate__slow">
                                    <button type="button" className='cancel-btn' onClick={handleCancel}>Cancel</button>
                                    <button type="submit" className="bookmarkBtn">
                                        <span className="IconContainer">
                                            <i className="bi bi-floppy2 icon"></i>
                                        </span>
                                        <p className="button-text">Save</p>
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                </>
            )}

        </div>
    )
}

export default PostDetails