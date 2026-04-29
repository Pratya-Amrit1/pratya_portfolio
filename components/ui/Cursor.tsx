'use client';

import { useEffect, useRef, useCallback } from "react";

export const Cursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const dotPosition = useRef({ x: 0, y: 0 });
  const borderDotPosition = useRef({ x: 0, y: 0 });
  const animationId = useRef<number>(0);
  const mountedRef = useRef(false);

  const DOT_SMOOTHNESS = 0.2;
  const BORDER_DOT_SMOOTHNESS = 0.1;

  const animate = useCallback(() => {
    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor;

    dotPosition.current.x = lerp(dotPosition.current.x, mousePosition.current.x, DOT_SMOOTHNESS);
    dotPosition.current.y = lerp(dotPosition.current.y, mousePosition.current.y, DOT_SMOOTHNESS);

    borderDotPosition.current.x = lerp(borderDotPosition.current.x, mousePosition.current.x, BORDER_DOT_SMOOTHNESS);
    borderDotPosition.current.y = lerp(borderDotPosition.current.y, mousePosition.current.y, BORDER_DOT_SMOOTHNESS);

    // Direct DOM manipulation — no React re-renders
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${dotPosition.current.x - 4}px, ${dotPosition.current.y - 4}px)`;
    }
    if (borderRef.current) {
      const size = borderRef.current.dataset.hovering === 'true' ? 44 : 28;
      const offset = size / 2;
      borderRef.current.style.transform = `translate(${borderDotPosition.current.x - offset}px, ${borderDotPosition.current.y - offset}px)`;
      borderRef.current.style.width = `${size}px`;
      borderRef.current.style.height = `${size}px`;
    }

    animationId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    mountedRef.current = true;

    // Check if device likely has a mouse (not touch-only)
    const hasCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (hasCoarsePointer && !hasFinePointer) {
      // Touch-only device, don't show custom cursor
      if (dotRef.current) dotRef.current.style.display = 'none';
      if (borderRef.current) borderRef.current.style.display = 'none';
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => {
      if (borderRef.current) borderRef.current.dataset.hovering = 'true';
    };
    const handleMouseLeave = () => {
      if (borderRef.current) borderRef.current.dataset.hovering = 'false';
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const interactiveElements = document.querySelectorAll("a, button, img, input, textarea, select");
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);
    });

    animationId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      });
      cancelAnimationFrame(animationId.current);
    };
  }, [animate]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100000] sm:block hidden">
      <div
        ref={dotRef}
        className="absolute top-0 left-0 rounded-full dark:bg-white bg-black will-change-transform"
        style={{
          width: "8px",
          height: "8px",
        }}
      />
      <div
        ref={borderRef}
        data-hovering="false"
        className="absolute top-0 left-0 rounded-full border dark:border-white border-black will-change-transform"
        style={{
          width: "28px",
          height: "28px",
          transition: "width 0.3s, height 0.3s",
        }}
      />
    </div>
  );
};