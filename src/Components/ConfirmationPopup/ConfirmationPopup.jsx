import React from 'react'
import './confirmationPopup.css'

const ConfirmationPopup = ({ isPopupOpen, confirmToDelete, cancelDelete }) => {
  if (!isPopupOpen) return null;

  return (
    <div className="confirmation-popup-overlay">
      <div className="confirmation-popup">
        <p>Are you sure you want to delete this post?</p>
        <div className="buttons">
        <button onClick={confirmToDelete}>Yes</button>
        <button onClick={cancelDelete}>No</button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationPopup