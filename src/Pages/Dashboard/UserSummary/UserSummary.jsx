import React from 'react'
import './userSummary.css'

const UserSummary = ({ data }) => {
    return (
        <div className='user-summary'>
            <div className="row">
                <div className="col">
                    <p>{data.posts.length}</p>
                    <p>Posts</p>
                </div>
                <div className="col">
                    <p>{data.comments.length}</p>
                    <p>Comments</p>
                </div>
                <div className="col">
                    <p>{data.todos.length}</p>
                    <p>Todos</p>
                </div>
            </div>
        </div>
    )
}

export default UserSummary