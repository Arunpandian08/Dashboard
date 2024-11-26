import React, { useCallback } from 'react'
import './postsList.css'
import { useNavigate } from 'react-router-dom'

const PostsList = ({ posts }) => {
    const navigate = useNavigate()
    const handleNavigate=useCallback((id)=>{
        navigate(`/post/${id}`)
    })

    return (
        <div style={{ display: 'flex' }}>{
            posts.map((post) => (
                <h1
                    key={post.id}
                    onClick={() => handleNavigate(post.id)}
                >
                    {post.title}
                </h1>
            ))
        }</div>
    )
}

export default PostsList