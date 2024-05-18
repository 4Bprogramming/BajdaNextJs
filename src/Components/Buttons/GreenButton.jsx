import React from "react";

function greenButton(props) {
    return (
        <button
            class={`bg-custom-green cursor-pointer shadow-buttonShadow text-xl text-white p-3 rounded-2xl w-[150px] relative after:content-['»'] after:absolute after:opacity-0 after:right-8 hover:after:transition-all duration-700 hover:after:opacity-100 hover:after:right-4 hover:pr-6 ${props.style}`} 
        >
            {props.text}
        </button>
    );
}

export default greenButton;
