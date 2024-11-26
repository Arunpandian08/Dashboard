import React, { useCallback } from 'react'
import './dashboard.css'
import UserSummary from './UserSummary/UserSummary'
import PostsList from './PostsList/PostsList'

const Dashboard = ({ userData, setSelectedUser, data }) => {
    const handleSelect = useCallback((userId) => {
        setSelectedUser(userId)
    })
    return (
        <div className='dashboard'>
            <div className="users">
                <h2 className="title">USERS</h2>
                <div className="userName">
                    {userData.map((user) => (
                        <p
                            key={user.id}
                            className='name'
                            onClick={() => handleSelect(user.id)}
                        >
                            {user.name}
                        </p>
                    ))}
                </div>
            </div>
            <UserSummary data={data} />
            <PostsList posts={data.posts} />
        </div>
    )
}

export default Dashboard