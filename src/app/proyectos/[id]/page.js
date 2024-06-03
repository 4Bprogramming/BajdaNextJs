'use client'
import Project from '@/Components/ProjectComponent/Project'
import React, {Suspense } from "react";


function page() {
 

  return (
    <Suspense fallback={<p>Esperando al PROSHHECTO</p>}>
      <Project/>
    </Suspense>
  )
}

export default page