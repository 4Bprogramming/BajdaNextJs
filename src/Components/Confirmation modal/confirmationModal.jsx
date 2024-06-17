"use client";
import React, { useState } from 'react'

function ConfirmationModal({ message, onAccept, onClose, onCloseReDirect, okMessage, modal }) {
    const [showModal, setShowModal] = useState(true)
    const [showOkModal, setShowOkModal] = useState(false);
  
    const handleClose = () => {
      modal();
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
        modal()
    };
  
    return (
        <>
        {
            showModal&&
        
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-lg relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleClose}
              >
                ×
              </button>
              <div className="text-center">
                <p className="mb-4">{message}</p>
                <div className="flex justify-around">
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    onClick={handleClose}
                  >
                    Cancelar
                  </button>
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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