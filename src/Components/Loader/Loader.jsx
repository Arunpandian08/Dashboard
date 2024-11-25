import React from 'react'
import './loader.css'

const Loader = () => {
    return (
        <div className='loader-container'>
            <div className="loader">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
                <div className="circle circle-4"></div>
            </div>
        </div>
    )
}

export default Loader