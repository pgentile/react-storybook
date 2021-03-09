import { ElementType, ReactElement, ReactNode } from "react";

import "./Carousel.scss";

export default function Carousel({
  as: Element = "div",
  className = "",
  items = [],
  selectedIndex = 0,
}: CarouselProps): ReactElement {
  const renderedItems = items.map((item, index) => {
    return (
      <div key={index} className="carousel__item">
        {item}
      </div>
    );
  });

  const currentIndex = Math.max(0, Math.min(selectedIndex, items.length - 1));
  const contentStyle = {
    width: `${items.length * 100}%`,
    left: `${currentIndex * -100}%`,
  };

  return (
    <Element className={`carousel ${className}`}>
      <div className="carousel__items-container" style={contentStyle}>
        {renderedItems}
      </div>
    </Element>
  );
}

export type CarouselProps = {
  as?: ElementType;
  className?: string;
  items?: ReactNode[];
  selectedIndex?: number;
};
