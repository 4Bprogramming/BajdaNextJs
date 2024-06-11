import React from 'react'

function CardSkeleton() {
const placeholderArray = new Array(3).fill(0);
return (
    <div className="grid grid-cols-1 m-auto max-w-5xl gap-1 justify-items-center sm:grid-cols-2 md:grid-cols-3">
      {placeholderArray.map((_, index) => (
        <article
          key={index}
          className="flex flex-col w-[98%] justify-evenly border-4 items-center mx-1 max-w-[350px] animate-pulse"
        >
          <header className="block relative w-full h-64 bg-gray-200"></header>
          <main className="w-full p-4 space-y-2">
            <div className="h-6 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </main>
          <footer className="flex place-content-evenly w-full">
            <div className="w-full bg-gray-200 h-16 flex flex-col justify-center items-center">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div className="w-full bg-gray-200 h-16 flex flex-col justify-center items-center">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
            <div className="w-full bg-gray-200 h-16 flex flex-col justify-center items-center">
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
}

export default CardSkeleton