import React from 'react'
import Link from "next/link";

function SecondaryButton(props) {
  return (
    <Link href={props.href} passHref legacyBehavior >
    <button
      class={`bg-transparent outline outline-2 outline-custom-green cursor-pointer shadow-buttonShadow px-2 text-xl text-custom-green rounded-2xl w-fit relative after:content-['»'] after:absolute after:opacity-0 after:right-2 hover:after:transition-all duration-700 hover:after:opacity-100 hover:after:right-4 hover:pr-8 hover:text-white hover:bg-custom-green ${props.style}`}
    >
      {props.text}
    </button>
  </Link>
  )
}

export default SecondaryButton