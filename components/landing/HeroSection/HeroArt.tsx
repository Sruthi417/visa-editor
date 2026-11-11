"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type Variants,
} from "motion/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";

const BEFORE_SRC = "/images/hero-section/girl-before.webp";
const AFTER_SRC = "/images/hero-section/girl-after.webp";

/**
 * Everything is placed on a 640 × 620 stage that scales as one piece, so the
 * numbers below are stage units, not pixels.
 */
type Spot = { x: number; y: number; w?: number; h?: number; r?: number; z?: number };

function spot({ x, y, w, h, r = 0, z = 1 }: Spot) {
  return {
    "--x": x,
    "--y": y,
    ...(w === undefined ? {} : { "--w": w }),
    ...(h === undefined ? {} : { "--h": h }),
    "--r": `${r}deg`,
    "--z": z,
  } as React.CSSProperties;
}

const rise = (delay: number): Variants => ({
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  },
});

const fadeIn = (delay: number): Variants => ({
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut", delay } },
});

const clamp = (value: number) => Math.min(100, Math.max(0, value));

// How long the divider stays where it was left before gliding back to the middle.
const RETURN_AFTER_MS = 5000;

/**
 * The photo as taken on the left of the divider and as FlyFrame returns it on
 * the right. Drag anywhere on the photo, or use the arrow keys on the handle.
 * Once `ready` (the blind is up) it sweeps once to show it can be dragged;
 * after a drag it returns to the middle by itself.
 */
function Compare({ ready }: { ready: boolean }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const position = useMotionValue(50);
  const clip = useTransform(position, (value) => `inset(0 0 0 ${value}%)`);
  const left = useTransform(position, (value) => `${value}%`);
  const reduceMotion = useReducedMotion();
  const hint = useRef<ReturnType<typeof animate> | null>(null);
  const glide = useRef<ReturnType<typeof animate> | null>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touched = useRef(false);

  useMotionValueEvent(position, "change", (value) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(value)));
  });

  useEffect(() => {
    if (!ready || reduceMotion || touched.current) return;
    hint.current = animate(position, [50, 26, 74, 50], {
      duration: 3,
      delay: 0.35,
      ease: "easeInOut",
      times: [0, 0.3, 0.75, 1],
    });
    return () => hint.current?.stop();
  }, [ready, reduceMotion, position]);

  useEffect(
    () => () => {
      if (settle.current) clearTimeout(settle.current);
      glide.current?.stop();
    },
    [],
  );

  const takeOver = () => {
    touched.current = true;
    hint.current?.stop();
    glide.current?.stop();
    if (settle.current) clearTimeout(settle.current);
  };

  // Left somewhere off the middle, the divider glides back after a quiet spell.
  const settleLater = () => {
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      glide.current = animate(
        position,
        50,
        reduceMotion ? { duration: 0 } : { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
      );
    }, RETURN_AFTER_MS);
  };

  const moveTo = (clientX: number) => {
    const box = areaRef.current?.getBoundingClientRect();
    if (!box || box.width === 0) return;
    position.set(clamp(((clientX - box.left) / box.width) * 100));
  };

  return (
    <div
      ref={areaRef}
      className="hero-art__compare"
      onPointerDown={(event) => {
        takeOver();
        event.currentTarget.setPointerCapture(event.pointerId);
        // A touch may turn into a page scroll, so only a mouse jumps on press.
        if (event.pointerType === "mouse") moveTo(event.clientX);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) moveTo(event.clientX);
      }}
      onPointerUp={settleLater}
      onPointerCancel={settleLater}
    >
      <div className="hero-art__pane">
        <Image
          className="hero-art__shot"
          src={BEFORE_SRC}
          alt="The original photo, taken at home in front of a beige wall"
          fill
          sizes="(max-width: 899px) 70vw, 400px"
          loading="eager"
          draggable={false}
        />
        <motion.div className="hero-art__after" style={{ clipPath: clip }}>
          <Image
            className="hero-art__shot"
            src={AFTER_SRC}
            alt="The same photo as a passport photo on a plain white background"
            fill
            sizes="(max-width: 899px) 70vw, 400px"
            loading="eager"
            fetchPriority="high"
            draggable={false}
          />
        </motion.div>
        <motion.span className="hero-art__divider" style={{ left }} aria-hidden="true" />

        {/* The window blind: down when the page opens, then slides up into the frame. */}
        <span className="hero-art__shutter" aria-hidden="true">
          <svg className="hero-art__shutter-mark" viewBox="-24 -24 48 48">
            <g transform="rotate(-90)">
              <Plane />
            </g>
          </svg>
        </span>
      </div>

      {/* Outside the rounded glass, so the knob is never clipped at the corners. */}
      <motion.div className="hero-art__knob" style={{ left }}>
        <div
          ref={handleRef}
          className="hero-art__handle"
          role="slider"
          tabIndex={0}
          aria-label="Compare the original and the passport photo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={50}
          onKeyDown={(event) => {
            const step = event.shiftKey ? 10 : 4;
            let next = position.get();
            if (event.key === "ArrowLeft" || event.key === "ArrowDown") next -= step;
            else if (event.key === "ArrowRight" || event.key === "ArrowUp") next += step;
            else if (event.key === "Home") next = 0;
            else if (event.key === "End") next = 100;
            else return;
            event.preventDefault();
            takeOver();
            position.set(clamp(next));
            settleLater();
          }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={18} strokeWidth={2.4} color="currentColor" />
          <HugeiconsIcon icon={ArrowRight01Icon} size={18} strokeWidth={2.4} color="currentColor" />
        </div>
      </motion.div>
    </div>
  );
}

/** A top-down airliner pointing along +x, centred on the origin. */
function Plane() {
  return (
    <>
      <path
        d="M-12.5 -2.4 L-18.5 -9.5 L-21 -9.5 L-17.6 -2.2 Z M-12.5 2.4 L-18.5 9.5 L-21 9.5 L-17.6 2.2 Z"
        fill="#2b7de9"
      />
      <path d="M7 -3 L-5 -19 L-9.5 -19 L-3.5 -3 Z M7 3 L-5 19 L-9.5 19 L-3.5 3 Z" fill="#2b7de9" />
      <rect x="-1" y="-11.6" width="7" height="3.2" rx="1.6" fill="#d6e6fb" />
      <rect x="-1" y="8.4" width="7" height="3.2" rx="1.6" fill="#d6e6fb" />
      <path
        d="M22 0 C22 -2.4 19.4 -3.8 15.5 -3.8 L-15 -3.1 C-18.6 -3.1 -20.5 -1.7 -20.5 0 C-20.5 1.7 -18.6 3.1 -15 3.1 L15.5 3.8 C19.4 3.8 22 2.4 22 0 Z"
        fill="#ffffff"
      />
      <path d="M16.2 -2.4 C18.6 -2.1 20 -1.1 20 0 C20 1.1 18.6 2.1 16.2 2.4 Z" fill="#1d4f9a" />
      <path d="M-11 0 L-19.5 0" stroke="#2b7de9" strokeWidth="1.6" strokeLinecap="round" />
    </>
  );
}

/**
 * The hero's picture: the before / after photo seen through an airplane
 * window. The blind starts down, slides up, and then the photo shows it can be
 * dragged.
 */
export default function HeroArt() {
  const windowRef = useRef<HTMLDivElement>(null);
  const open = useMotionValue(0); // 0: blind down, 1: blind up
  const reduceMotion = useReducedMotion();
  const inView = useInView(windowRef, { once: true, amount: 0.4 });
  const [raised, setRaised] = useState(false);
  // The photo may show it can be dragged once the blind is up (or never came down).
  const ready = raised || reduceMotion === true;

  useMotionValueEvent(open, "change", (value) => {
    windowRef.current?.style.setProperty("--open", String(value));
  });

  useEffect(() => {
    if (reduceMotion) {
      open.jump(1);
      windowRef.current?.style.setProperty("--open", "1");
      return;
    }
    if (!inView) return;
    // Wait for the window to arrive, then raise the blind.
    const raise = animate(open, 1, {
      delay: 1,
      duration: 1.4,
      ease: [0.65, 0, 0.25, 1],
      onComplete: () => setRaised(true),
    });
    return () => raise.stop();
  }, [inView, reduceMotion, open]);

  return (
    <div className="hero-art">
      <motion.div className="hero-art__stage" initial="hidden" animate="visible">
        <motion.span className="hero-art__halo" variants={fadeIn(0.1)} aria-hidden="true" />

        {/* Moulded surround, a recessed step, then the glass; the blind's lip rides on top. */}
        <motion.div
          ref={windowRef}
          className="hero-art__item hero-art__window"
          style={spot({ x: 88, y: 22, w: 464, h: 577, z: 2 })}
          variants={rise(0.25)}
        >
          <div className="hero-art__recess">
            <Compare ready={ready} />
          </div>
          <span className="hero-art__lip" aria-hidden="true" />
        </motion.div>
      </motion.div>
    </div>
  );
}
