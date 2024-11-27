import React, { useCallback } from 'react'
import './dashboard.css'
import UserSummary from './UserSummary/UserSummary'
import PostsList from './PostsList/PostsList'
import DashboardLoader from '../../Components/DashboardLoader/DashboardLoader'

const Dashboard = ({ userData, setSelectedUser, data, isLoading, handleDeletePost }) => {
    
    const handleSelect = useCallback((user) => {
        if (user !== setSelectedUser) {
            setSelectedUser(user)
        }
    }, [setSelectedUser])

    return (
        <div className='dashboard'>
            <div className="users">
                <h2 className="title animate__animated animate__fadeInUp animate__slow">USERS</h2>
                <div className="userName">
                    {userData.map((user) => (
                        <p
                            key={user.id}
                            className='name animate__animated animate__backInRight animate__slow'
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
                    <PostsList posts={data.posts} handleDeletePost={handleDeletePost} />
                </>
            )}
        </div>
    )
}

export default Dashboard