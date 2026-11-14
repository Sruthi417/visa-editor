"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";

import "./CustomScroll.scss";

/** The thumb never gets shorter than this, however long the content. */
const MIN_THUMB = 32;

type Props = {
  children: ReactNode;
  /** On the outer element: use it to place the scroller in its layout. */
  className?: string;
  /** Names the scrollable region for screen readers when it can be scrolled. */
  label?: string;
};

/**
 * A scroll area with its own scrollbar, drawn the same in every browser. The native
 * bar is hidden; wheel, touch and keyboard scrolling still work as normal, and the
 * drawn thumb follows along. It can be dragged, and a click on the track jumps there.
 * The bar only shows when the content is taller than the area.
 */
export default function CustomScroll({ children, className, label }: Props) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);
  const [dragging, setDragging] = useState(false);

  // Sizes and moves the thumb straight on the element, so scrolling never re-renders.
  const update = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!viewport || !track || !thumb) return;

    const { scrollHeight, clientHeight, scrollTop } = viewport;
    const hasOverflow = scrollHeight > clientHeight + 1;
    setOverflow(hasOverflow);
    if (!hasOverflow) return;

    const trackHeight = track.clientHeight;
    const thumbHeight = Math.max(MIN_THUMB, (clientHeight / scrollHeight) * trackHeight);
    const maxScroll = scrollHeight - clientHeight;
    const offset = maxScroll > 0 ? (scrollTop / maxScroll) * (trackHeight - thumbHeight) : 0;

    thumb.style.height = `${thumbHeight}px`;
    thumb.style.transform = `translateY(${offset}px)`;
  }, []);

  // The track is only laid out once there is overflow, so measure again then.
  useLayoutEffect(() => {
    update();
  }, [overflow, update]);

  // Follow size changes of the area and of what is inside it.
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    for (const child of Array.from(viewport.children)) observer.observe(child);
    return () => observer.disconnect();
  }, [update]);

  const onThumbPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!viewport || !track || !thumb || event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();

    const startY = event.clientY;
    const startScroll = viewport.scrollTop;
    // How far the content moves for each pixel the thumb moves.
    const ratio =
      (viewport.scrollHeight - viewport.clientHeight) /
      Math.max(1, track.clientHeight - thumb.offsetHeight);

    thumb.setPointerCapture(event.pointerId);
    setDragging(true);

    const move = (moveEvent: PointerEvent) => {
      viewport.scrollTop = startScroll + (moveEvent.clientY - startY) * ratio;
    };
    const end = () => {
      thumb.removeEventListener("pointermove", move);
      thumb.removeEventListener("pointerup", end);
      thumb.removeEventListener("pointercancel", end);
      setDragging(false);
    };
    thumb.addEventListener("pointermove", move);
    thumb.addEventListener("pointerup", end);
    thumb.addEventListener("pointercancel", end);
  };

  // A click on the bare track brings the thumb's middle to that point.
  const onTrackPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const thumb = thumbRef.current;
    if (!viewport || !track || !thumb || event.target !== track || event.button !== 0) return;

    const rect = track.getBoundingClientRect();
    const room = rect.height - thumb.offsetHeight;
    if (room <= 0) return;
    const position = Math.min(Math.max(event.clientY - rect.top - thumb.offsetHeight / 2, 0), room);
    viewport.scrollTo({
      top: (position / room) * (viewport.scrollHeight - viewport.clientHeight),
      behavior: "smooth",
    });
  };

  return (
    <div
      className={[
        "cscroll",
        overflow && "cscroll--overflow",
        dragging && "cscroll--dragging",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        ref={viewportRef}
        className="cscroll__viewport"
        onScroll={update}
        // Reachable by keyboard (arrow keys scroll it) only when there is something to scroll.
        {...(overflow && label
          ? { tabIndex: 0, role: "region", "aria-label": label }
          : {})}
      >
        {children}
      </div>

      <div
        ref={trackRef}
        className="cscroll__track"
        aria-hidden="true"
        onPointerDown={onTrackPointerDown}
      >
        <div ref={thumbRef} className="cscroll__thumb" onPointerDown={onThumbPointerDown} />
      </div>
    </div>
  );
}
