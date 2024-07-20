"use client";
import React, { useState } from 'react'
function OnlyConfirmationModal({ message, onClose, onCloseReDirect }) {
    const [showModal, setShowModal] = useState(true)
    
    const handleAccept =  () => {
      if (onCloseReDirect) {
        onCloseReDirect()
    }
      if(onClose)onClose();
      
      setShowModal(!showModal)
           
    };
  
  
  
    return (
        <>
        {
            showModal&&
        
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <p className="mb-4">{message}</p>
                <button
                  className="bg-custom-green text-white px-4 py-2 rounded hover:bg-white hover:text-custom-green hover:outline"
                  onClick={handleAccept}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        }
        
      </>
  )
}
export default OnlyConfirmationModal
