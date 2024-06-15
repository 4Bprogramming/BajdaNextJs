import React from 'react'

function EditSkeleton() {
  return (
<form className="w-full flex flex-col justify-around m-auto border-4 h-fit p-2 border-grey sm:w-3/4 lg:w-1/2 lg:mb-6">
      <label className="block text-xl font-medium text-gray-600 mb-2">Título</label>
      <input
        type="text"
        name="title"
        className="w-full border-gray-300 border rounded focus:outline-none py-2 px-4 mb-4"
      />

      <label className="block text-xl font-medium text-gray-600 mb-2">Ubicación</label>
      <input
        type="text"
        name="place"
        className="w-full border-gray-300 border rounded focus:outline-none py-2 px-4 mb-4"
      />

      <label className="block text-xl font-medium text-gray-600 mb-2">Cant. mts<sup>2</sup></label>
      <input
        type="number"
        name="area"
        className="w-full border-gray-300 border rounded focus:outline-none py-2 px-4 mb-4"
      />

    
      
      <textarea
        name="description"
        className="mt-2 p-2 w-full border-gray-300 border rounded-md min-h-[150px] resize-none focus:outline-none mb-4"
      />

      <button
        type="submit"
        className="bg-gray-800 text-white px-4 py-2 rounded w-full outline-none hover:bg-gray-700 transition-colors duration-300"
      >
        Editar Proyecto
      </button>
    </form>
  )
}

export default EditSkeleton