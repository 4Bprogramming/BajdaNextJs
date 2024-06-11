import React from 'react'

function ProyectosSkeleton() {
  return (
    <section className="mb-3">
    <div className="my-3 ml-1 lg:ml-60">
      <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
    </div>
    <article className="my-4 ml-1 max-w-4xl m-auto border-l-[3px] border-custom-green px-3 py-4 sm:ml-5 lg:m-auto lg:max-w-5xl lg:my-2">
      <div className="h-10 bg-gray-200 rounded animate-pulse mb-4"></div>
      <div className="space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
      <div className="space-y-3 mt-4">
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-4/6"></div>
      </div>
    </article>
  </section>
  )
}

export default ProyectosSkeleton