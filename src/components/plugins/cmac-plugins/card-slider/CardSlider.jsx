import React, { useRef, useState, useEffect } from "react";
import "./cmac.styles.alpha.card_slider.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CardSlider = ({ children }) => {
  const carouselRef = useRef(null);
  const [cardWidth, setCardWidth] = useState(0);
  let isDragging = false,
    startX,
    startScrollLeft;
  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const firstCard = carousel.querySelector(".card");
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth);
      }
    }
  }, []);

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const dragStart = (e) => {
    const carousel = carouselRef.current;
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
  };

  const dragging = (e) => {
    const carousel = carouselRef.current;
    if (!isDragging) {
      return;
    } // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
  };

  const dragStop = () => {
    const carousel = carouselRef.current;
    isDragging = false;
    carousel.classList.remove("dragging");
  };

  return (
    <div className="wrapper">
      {/* <i
        id="left"
        className="fa-solid fa-angle-left"
        onClick={() => scrollCarousel("left")}
      ></i> */}
      <span id="left" className="i" onClick={() => scrollCarousel("left")}>
        <IoIosArrowBack />
      </span>
      <ul
        ref={carouselRef}
        onMouseDown={dragStart}
        onMouseMove={dragging}
        onMouseUp={dragStop}
        className="carousel"
      >
        {children}
      </ul>
      <span id="right" className="i" onClick={() => scrollCarousel("right")}>
        <IoIosArrowForward />
      </span>
      {/* <i
        id="right"
        className="fa-solid fa-angle-right"
        onClick={() => scrollCarousel("right")}
      ></i> */}
    </div>
  );
};

export default CardSlider;
