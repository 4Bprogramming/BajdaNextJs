import React, { useState } from "react";
import { DotButton, useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  usePrevNextButtons
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const [enlargedImageSrc, setEnlargedImageSrc] = useState("");
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  function handleEnlargeImage(url) {
    setEnlargedImageSrc(url);
  }

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((slide, index) => (
            <div className="embla__slide" key={index}>
              {window.innerWidth >= 1024 ? (
                <Image
                  src={slide.url}
                  alt={`Imagen de la casa ${index}`}
                  layout="fill"
                  className="embla__slide__img"
                  onClick={() => handleEnlargeImage(slide.url)}
                  sizes=""
                />
              ) : (
                <Image
                  src={slide.url}
                  alt={`Imagen de la casa ${index}`}
                  layout="fill"
                  className="embla__slide__img"
                  sizes=""
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={"embla__dot".concat(
                index === selectedIndex ? " embla__dot--selected" : ""
              )}
            />
          ))}
        </div>
      </div>

      {/* Enlarged Image */}
      {enlargedImageSrc && <div className="overlay"></div>}
      <div
        id="enlargedImageContainer"
        className={enlargedImageSrc ? "show" : ""}
        onClick={() => setEnlargedImageSrc("")}
      >
        {enlargedImageSrc && (
          <Image src={enlargedImageSrc} alt="Imagen agrandada" fill  />
        )}
      </div>
    </section>
  );
};

export default EmblaCarousel;
