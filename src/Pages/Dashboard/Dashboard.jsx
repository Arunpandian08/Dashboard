import React, { useCallback } from 'react'
import './dashboard.css'
import UserSummary from './UserSummary/UserSummary'
import PostsList from './PostsList/PostsList'
import DashboardLoader from '../../Components/DashboardLoader/DashboardLoader'

const Dashboard = ({ userData, setSelectedUser, data, isLoading }) => {
    
    const handleSelect = useCallback((user) => {
        if (user === setSelectedUser) return;
        setSelectedUser(user)
    }, [setSelectedUser])

    return (
        <div className='dashboard'>
            <div className="users">
                <h2 className="title">USERS</h2>
                <div className="userName">
                    {userData.map((user) => (
                        <p
                            key={user.id}
                            className='name'
                            onClick={() => handleSelect(user)}
                        >
                            {user.name}
                        </p>
                    ))}
                </div>
            </div>
            {isLoading ? (
                <DashboardLoader />
            ) : (
                <>
                    <UserSummary data={data} />
                    <PostsList posts={data.posts} />
                </>
            )}
        </div>
    )
}

export default Dashboard