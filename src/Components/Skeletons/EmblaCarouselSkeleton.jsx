import React from "react";

function EmblaCarouselSkeleton() {
  return (
    <>
      {/* Carousel Skeleton */}
      <div className="embla bg-gray-100 p-4">
        <div className="embla__viewport overflow-hidden relative">
          <div className="embla__container flex">
            <div className="embla__slide flex-shrink-0 w-80 mr-4 ">
              {/* Skeleton de la imagen */}
              <div className="w-full h-250 bg-gray-300"></div>
            </div>
            <div className="embla__slide flex-shrink-0 w-80 mr-4 ">
              {/* Skeleton de la imagen */}
              <div className="w-full h-250 bg-gray-300"></div>
            </div>
            <div className="embla__slide flex-shrink-0 w-80 mr-4 ">
              {/* Skeleton de la imagen */}
              <div className="w-full h-250 bg-gray-300"></div>
            </div>
          </div>
        </div>
        <div className="embla__controls mt-2 flex justify-between items-center">
          <div className="embla__buttons">
            <button className="embla__button w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              {/* Icono de flecha izquierda del skeleton */}
            </button>
            <button className="embla__button w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full">
              {/* Icono de flecha derecha del skeleton */}
            </button>
          </div>
          <div className="embla__dots">
            <button className="embla__dot bg-gray-300 w-4 h-4 rounded-full mr-1"></button>
            <button className="embla__dot bg-gray-300 w-4 h-4 rounded-full mr-1"></button>
            <button className="embla__dot bg-gray-300 w-4 h-4 rounded-full mr-1"></button>
            {/* Agrega más botones de punto del skeleton según sea necesario */}
          </div>
        </div>
      </div>
      {/* Fin del Carousel Skeleton */}
    </>
  );
}

export default EmblaCarouselSkeleton;
