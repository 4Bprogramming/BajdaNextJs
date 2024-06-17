import React from 'react'


function DeleteButton(props) {
  
  return (
   
    <button
      class={`bg-transparent outline outline-2 outline-red-600 cursor-pointer shadow-buttonShadow px-2 text-xl text-red-600 rounded-2xl w-fit relative after:content-['»'] after:absolute after:opacity-0 after:right-2 hover:after:transition-all duration-700 hover:after:opacity-100 hover:after:right-4 hover:pr-8 hover:text-white hover:bg-red-600 ${props.style}`}
      onClick={props.onClick}    
    >
      {props.text}
    </button> 
  
  )
}

export default DeleteButton