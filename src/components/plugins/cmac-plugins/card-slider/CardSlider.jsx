import React, { useRef, useState, useEffect } from "react";
import "../styles/cmac.plugins.styles.alpha.dragon.scss";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const CardSlider = ({ dragStatus, cardGap, style, children }) => {
  const carouselRef = useRef(null);
  const [hasVerticalOverflow, setHasVerticalOverflow] = useState(false);
  const [cardWidth, setCardWidth] = useState(0);
  let isDragging = false,
    startX,
    startScrollLeft;

  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
      carouselRef.current.scrollLeft += scrollAmount;
    }
  };

  const dragStart = (e) => {
    // if (dragStatus) {
    //   dragStatus(true);
    // }
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
      dragStatus && dragStatus(false);
      return;
    } // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
    // dragStatus && dragStatus(true);
  };

  const dragStop = () => {
    const carousel = carouselRef.current;
    isDragging = false;
    carousel.classList.remove("dragging");
    dragStatus && dragStatus(false);
  };

  useEffect(() => {
    const element = carouselRef.current;
    if (element) {
      const hasVerticalOverflowCheck =
        element.scrollWidth > element.clientWidth;
      setHasVerticalOverflow(hasVerticalOverflowCheck);
    }
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      const firstCard = carousel.querySelector(".card");
      if (firstCard) {
        setCardWidth(firstCard.offsetWidth);
      }
    }
  }, []);

  return (
    <div className="wrapper" style={{ ...style }}>
      {hasVerticalOverflow !== false && (
        <span id="left" className="i" onClick={() => scrollCarousel("left")}>
          <IoIosArrowBack />
        </span>
      )}
      <div
        ref={carouselRef}
        onMouseDown={dragStart}
        onMouseMove={dragging}
        onMouseUp={dragStop}
        className="carousel"
        style={{ gap: cardGap ? cardGap : "16px" }}
      >
        {children}
      </div>
      {hasVerticalOverflow !== false && (
        <span id="right" className="i" onClick={() => scrollCarousel("right")}>
          <IoIosArrowForward />
        </span>
      )}
    </div>
  );
};

export default CardSlider;
