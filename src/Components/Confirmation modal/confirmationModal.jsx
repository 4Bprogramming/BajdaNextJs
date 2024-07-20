"use client";
import React, { useState } from 'react'

function ConfirmationModal({ message, onAccept, onClose, onCloseReDirect, okMessage}) {
    const [showModal, setShowModal] = useState(true)
    const [showOkModal, setShowOkModal] = useState(false);
  
    const handleClose = () => {
 
      setShowModal(!showModal)
      if (onClose) onClose();
    };
  
    const handleAccept = async () => {
      await onAccept();
      setShowModal(!showModal)
      setShowOkModal(!showOkModal)        
    };
  
    const handleOkClose = () => {
        setShowOkModal(!showOkModal)
        if (onCloseReDirect) {
            onCloseReDirect()
        }
        if(onClose)onClose();
       
    };
  
    return (
        <>
        {
            showModal&&
        
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg relative">
              <button
                className="absolute -top-[10px] right-2 text-[2rem] text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                ×
              </button>
              <div className="text-center">
                <p className="mb-4">{message}</p>
                <div className="flex justify-around">
                  <button
                    className="bg-custom-green text-white px-4 py-2 rounded hover:bg-white hover:text-custom-green hover:outline hover:outline-offset-1 hover:outline-custom-green"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-white text-custom-green outline px-4 py-2 transition-all duration-500 rounded hover:text-white hover:bg-red-500 hover:outline-offset-1 hover:outline-red-500"
                    onClick={handleAccept}
                  >
                    Aceptar
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
        {showOkModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <p className="mb-4">{okMessage}</p>
                <button
                  className="bg-custom-green text-white px-4 py-2 rounded hover:bg-white hover:text-custom-green hover:outline"
                  onClick={handleOkClose}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        )}
      </>
  )
}

export default ConfirmationModal