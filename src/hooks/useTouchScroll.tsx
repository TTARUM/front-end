import React, { useState } from 'react';

type TouchScrollHandlers = [
  (e: React.MouseEvent<HTMLDivElement>) => void,
  (e: React.MouseEvent<HTMLDivElement>) => void,
  () => void,
  () => void,
];

export default function useTouchScroll(
  ref: React.RefObject<HTMLDivElement>,
): TouchScrollHandlers {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setStartX(e.pageX - ref.current.offsetLeft);
    setScrollLeft(ref.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const x = e.pageX - ref.current.offsetLeft;
    const walk = (x - startX) * 2;
    ref.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return [handleMouseDown, handleMouseMove, handleMouseUp, handleMouseLeave];
}
