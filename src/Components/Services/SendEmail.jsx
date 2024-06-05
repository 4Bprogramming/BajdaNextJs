import React from 'react'
// import {ContactForm,ContactMedia} from '../ContactForm';
import ContactForm from '../Contact/ContactForm'
import ContactMedia from '../Contact/ContactMedia'


function SendEmail() {
  return (
    <div className={" bg-custom-contact md:grid md:grid-cols-12 px-6 lg:gap-y-32 pb-4  "}>
       <ContactForm/>
       <ContactMedia/>
    </div>
  )
}

export default SendEmail