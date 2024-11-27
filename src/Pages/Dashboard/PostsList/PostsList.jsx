import React, { useCallback, useState } from 'react'
import './postsList.css'
import { useNavigate } from 'react-router-dom'

const PostsList = ({ posts, handleDeletePost }) => {
    const navigate = useNavigate()
    const [currentPage, setCurrentPage] = useState(1)
    const postsPerPage = 8;

    let lastIndexOfThePost = currentPage * postsPerPage;
    let firstIndexOfThePost = lastIndexOfThePost - postsPerPage

    let currentPosts = posts.slice(firstIndexOfThePost, lastIndexOfThePost)

    const handlePrev = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    const handleNext = () => {
        if (currentPage < Math.ceil(posts.length / postsPerPage)) {
            setCurrentPage(currentPage + 1)
        }
    }

    const handleNavigate = useCallback((id) => {
        navigate(`/post/${id}`)
    })

    return (
        <div className='post-list'>
            <div className="post-nav animate__animated animate__flipInX animate_slow">
                <h4>Posts</h4>
                <div className="navigator-icons">
                    <button className='prev' onClick={handlePrev} disabled={currentPage === 1}>
                        <i className="bi bi-caret-left-fill"></i>
                    </button>
                    <button className='next' onClick={handleNext} disabled={currentPage === Math.ceil(posts.length / postsPerPage)}>
                        <i className="bi bi-caret-right-fill"></i>
                    </button>
                </div>
            </div>
            <div className='grid-container'>
                {currentPosts.map((post) => {
                    return (
                        <div className='card animate__animated animate__fadeInUp animate_slower' key={post.id}>
                            <div className="icon">
                                <i className="bi bi-camera-fill"></i>
                            </div>
                            <div className="post-name">
                                <p
                                    className='card-title'
                                    onClick={() => handleNavigate(post.id)}
                                >
                                    <strong>Title: </strong>{post.title}
                                </p>
                                <div className="Buttons">
                                    <button className="Btn" onClick={() => handleDeletePost(post.id)}>
                                        <i className="bi bi-trash3-fill"></i>
                                        <span className="tooltip">Delete post</span>
                                    </button>
                                </div>
                            </div>
                            <span className='notifier1'></span>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default PostsList