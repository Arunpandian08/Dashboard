import React, { useCallback, useEffect, useState } from 'react'
import './postDetails.css'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../App'
import axios from 'axios'

const PostDetails = () => {
    const { id } = useParams()
    const [post, setPost] = useState(null)
    const [newBody, setNewBody] = useState('')
    const [isEditable, setIsEditable] = useState(false)

    useEffect(() => {
        fetchPost(id)
    }, [id])

    const fetchPost = async (id) => {
        try {
            const response = await axios.get(`${BASE_URL}/posts/${id}`)
            setPost(response.data)
            setNewBody(response.data.body)
        } catch (error) {
            console.error('Error fetching post:', error);

        }
    }

    const handleSave = useCallback(async () => {
        try {
            await axios.put(`${BASE_URL}/posts/${id}`, {
                ...post,
                body: newBody
            })
            alert('Post updated successful !')
        } catch (error) {
            console.error('Error saving post', error);

        }
    })
    return (
        <div className='post-details'>
            <h2>{post?.title}</h2>
            <span onClick={() => setIsEditable(true)}><i className="bi bi-pen"></i></span>
            {!isEditable ? (
                <p>{newBody}</p>
            ) : (
                <>
                    <textarea
                        rows='5'
                        cols="30"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                    />
                    <button onClick={handleSave}> Save</button>
                </>
            )}

        </div>
    )
}

export default PostDetails