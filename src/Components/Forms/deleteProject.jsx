"use client"
import React from 'react'
import ConfirmationModal from '../Confirmation modal/confirmationModal'
import { useRouter } from 'next/router'
import { deleteProjectId } from '@/Utils/project-crud'

function DeleteProject({id}) {
  const router= useRouter()
  const message='¿Esta seguro de borrar el proyecto completo?'
  const onAccept=()=>{
    const resoponse= deleteProjectId(_,id)
  }
  const onCloseReDirect= ()=>{
    router.push('/proyectos');
  }
  const okMessage= 'El proyecto fue Eliminado'
  return (
    <>
    <ConfirmationModal message={message} okMessage={okMessage}onAccept={onAccept}onCloseReDirect={onCloseReDirect}/>
    </>
    
  )
}

export default DeleteProject