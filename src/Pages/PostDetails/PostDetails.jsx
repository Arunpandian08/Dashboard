import React, { useCallback, useEffect, useState } from 'react'
import './postDetails.css'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../App'
import axios from 'axios'
import { Flip, toast } from 'react-toastify'
import DashboardLoader from '../../Components/DashboardLoader/DashboardLoader'

const PostDetails = ({ isLoading, setIsLoading }) => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [newBody, setNewBody] = useState('')
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        fetchPost(id)
    }, [id])

    const fetchPost = async (id) => {
        setIsLoading(true)
        try {
            const response = await axios.get(`${BASE_URL}/posts/${id}`)
            setPost(response.data)
            setNewBody(response.data.body)
        } catch (error) {
            console.error('Error fetching post:', error);
        }
        finally {
            setIsLoading(false)
        }
    }


    const handleSave = useCallback(async (e) => {
        e.preventDefault();
        try {
            if (newBody.trim() === '') {
                toast.info('Please Edit to save! or cancel it', {
                    position: "top-center",
                    autoClose: 600,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Flip,
                });
                return
            };
                await axios.put(`${BASE_URL}/posts/${id}`, {
                    ...post,
                body: newBody
            })
            toast.success('Post saved successfully!', {
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
            setIsEditable(false)
        } catch (error) {
            console.error('Error saving post', error);
            toast.error('Error saving post. Please try again.', {
                position: "top-center",
                autoClose: 300,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Flip,
            });;
        }
    }, [id,newBody,post])

    const handleCancel = () => {
        setIsEditable(false)
    }

    return (
        <div className='post-details'>
            {isLoading ? (
                <DashboardLoader />
            ) : (
                <>
                    <h2>{post?.title}</h2>
                    <div className="post-card">
                        {!isEditable ? (
                            <div className='card-body'>
                                <span className='edit-icon' onClick={() => setIsEditable(true)}>
                                    <i className="bi bi-pen"></i>
                                </span>
                                <p className='card-text'>{newBody}</p>
                            </div>
                        ) : (
                            <form className='post-form'>
                                <textarea
                                    className='post-text-area'
                                    rows='5'
                                    cols="30"
                                    value={newBody}
                                    onChange={(e) => setNewBody(e.target.value)}
                                />
                                <div className="buttons">
                                    <button className='cancel-btn' onClick={handleCancel}> Cancel</button>
                                    <button className="bookmarkBtn" onClick={handleSave}>
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