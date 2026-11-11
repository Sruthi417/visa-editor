"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
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

// The handwriting for the "Before" and "After" labels.
const hand = Caveat({ subsets: ["latin"], weight: "700", display: "swap" });

/**
 * Everything is placed on a 640 × 620 stage that scales as one piece, so the
 * numbers below are stage units, not pixels. A spot's x / y is its top-left
 * corner; it tilts round its centre.
 */
type Spot = { x: number; y: number; w?: number; h?: number; r?: number; z?: number; delay?: number };

function spot({ x, y, w, h, r = 0, z = 1, delay = 0 }: Spot) {
  return {
    "--x": x,
    "--y": y,
    ...(w === undefined ? {} : { "--w": w }),
    ...(h === undefined ? {} : { "--h": h }),
    "--r": `${r}deg`,
    "--z": z,
    "--delay": `${delay}s`,
  } as React.CSSProperties;
}

type PhotoWindow = {
  name: string;
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  at: Spot & { r: number };
  /** When its one-time "you can drag this" sweep starts, in seconds. */
  hint: number;
};

// One window on top, two below leaning out, like three photos dropped on a table.
const WINDOWS: PhotoWindow[] = [
  {
    name: "baby",
    before: "/images/hero-section/window-baby-before.webp",
    after: "/images/hero-section/window-baby-after.webp",
    beforeAlt: "A baby photographed at home in front of a shelf and a window",
    afterAlt: "The same baby as a passport photo on a plain white background",
    at: { x: 205, y: 20, w: 230, h: 300, r: -2, z: 3 },
    hint: 1.4,
  },
  {
    name: "girl",
    before: "/images/hero-section/window-girl-before.webp",
    after: "/images/hero-section/window-girl-after.webp",
    beforeAlt: "A young woman photographed outdoors with a lake behind her",
    afterAlt: "The same young woman as a passport photo on a plain white background",
    at: { x: 70, y: 282, w: 230, h: 300, r: -16, z: 2 },
    hint: 2.2,
  },
  {
    name: "grandfather",
    before: "/images/hero-section/window-grandfather-before.webp",
    after: "/images/hero-section/window-grandfather-after.webp",
    beforeAlt: "A grandfather photographed in a garden",
    afterAlt: "The same grandfather as a passport photo on a plain white background",
    at: { x: 342, y: 278, w: 230, h: 300, r: 13, z: 2 },
    hint: 3,
  },
];

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

/**
 * The photo as uploaded on the left of the divider and as FlyFrame returns it
 * on the right. Drag anywhere on the photo, or use the arrow keys on the handle.
 */
function Compare({ photo: w }: { photo: PhotoWindow }) {
  const areaRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const position = useMotionValue(50);
  const clip = useTransform(position, (value) => `inset(0 0 0 ${value}%)`);
  const left = useTransform(position, (value) => `${value}%`);
  const reduceMotion = useReducedMotion();
  const inView = useInView(areaRef, { once: true, amount: 0.5 });
  const hint = useRef<ReturnType<typeof animate> | null>(null);
  const touched = useRef(false);

  useMotionValueEvent(position, "change", (value) => {
    handleRef.current?.setAttribute("aria-valuenow", String(Math.round(value)));
  });

  // One slow sweep when it first shows, so it's clear the photo can be dragged.
  useEffect(() => {
    if (!inView || reduceMotion || touched.current) return;
    hint.current = animate(position, [50, 26, 74, 50], {
      duration: 3,
      delay: w.hint,
      ease: "easeInOut",
      times: [0, 0.3, 0.75, 1],
    });
    return () => hint.current?.stop();
  }, [inView, reduceMotion, position, w.hint]);

  const takeOver = () => {
    touched.current = true;
    hint.current?.stop();
  };

  // The window is tilted, so turn the pointer back into the photo's own frame.
  const moveTo = (clientX: number, clientY: number) => {
    const area = areaRef.current;
    if (!area || area.offsetWidth === 0) return;
    const box = area.getBoundingClientRect();
    const dx = clientX - (box.left + box.width / 2);
    const dy = clientY - (box.top + box.height / 2);
    const tilt = (w.at.r * Math.PI) / 180;
    const along = dx * Math.cos(tilt) + dy * Math.sin(tilt);
    position.set(clamp(50 + (along / area.offsetWidth) * 100));
  };

  return (
    <div
      ref={areaRef}
      className="hero-art__compare"
      onPointerDown={(event) => {
        takeOver();
        event.currentTarget.setPointerCapture(event.pointerId);
        // A touch may turn into a page scroll, so only a mouse jumps on press.
        if (event.pointerType === "mouse") moveTo(event.clientX, event.clientY);
      }}
      onPointerMove={(event) => {
        if (event.currentTarget.hasPointerCapture(event.pointerId)) moveTo(event.clientX, event.clientY);
      }}
    >
      <div className="hero-art__pane">
        <Image
          className="hero-art__shot"
          src={w.before}
          alt={w.beforeAlt}
          fill
          sizes="(max-width: 899px) 40vw, 220px"
          loading="eager"
          draggable={false}
        />
        <motion.div className="hero-art__after" style={{ clipPath: clip }}>
          <Image
            className="hero-art__shot"
            src={w.after}
            alt={w.afterAlt}
            fill
            sizes="(max-width: 899px) 40vw, 220px"
            loading="eager"
            draggable={false}
          />
        </motion.div>
        <motion.span className="hero-art__divider" style={{ left }} aria-hidden="true" />
        <span className="hero-art__shade" aria-hidden="true" />
      </div>

      {/* Outside the rounded glass, so the knob is never clipped at the corners. */}
      <motion.div className="hero-art__knob" style={{ left }}>
        <div
          ref={handleRef}
          className="hero-art__handle"
          role="slider"
          tabIndex={0}
          aria-label={`Compare the ${w.name}'s original photo and passport photo`}
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
          }}
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={16} strokeWidth={2.4} color="currentColor" />
          <HugeiconsIcon icon={ArrowRight01Icon} size={16} strokeWidth={2.4} color="currentColor" />
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

// The plane's orbit round the windows: a tilted ellipse whose top half runs
// behind them and whose bottom half runs in front, below the faces.
const ORBIT = { cx: 320, cy: 478, rx: 330, ry: 96, tilt: -8 };
const PLANE_SCALE = 1.3;
const LAP_SECONDS = 12;
// Where the plane rests when motion is reduced: in front, to the right.
const RESTING_ANGLE = Math.PI * 0.3;

function OrbitLayer({
  side,
  planeRef,
  headingRef,
}: {
  side: "back" | "front";
  planeRef: React.RefObject<SVGGElement | null>;
  headingRef: React.RefObject<SVGGElement | null>;
}) {
  const { cx, cy, rx, ry, tilt } = ORBIT;
  // Clockwise from the left end over the top (back), or from the right end under the bottom (front).
  const arc =
    side === "back" ? `M ${-rx} 0 A ${rx} ${ry} 0 0 1 ${rx} 0` : `M ${rx} 0 A ${rx} ${ry} 0 0 1 ${-rx} 0`;

  return (
    <motion.svg
      className={`hero-art__orbit hero-art__orbit--${side}`}
      viewBox="0 0 640 620"
      variants={fadeIn(side === "back" ? 0.7 : 0.8)}
      aria-hidden="true"
    >
      {side === "front" && (
        <defs>
          <filter id="hero-art-plane-shadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="7" stdDeviation="3.5" floodColor="#0b3a75" floodOpacity="0.3" />
          </filter>
        </defs>
      )}
      <g transform={`translate(${cx} ${cy}) rotate(${tilt})`}>
        <path className="hero-art__orbit-line" d={arc} />
        <g ref={planeRef} opacity="0" filter="url(#hero-art-plane-shadow)">
          <g ref={headingRef}>
            <Plane />
          </g>
        </g>
      </g>
    </motion.svg>
  );
}

/** The two orbit layers and the plane that laps round the windows. */
function Orbit() {
  const watchRef = useRef<HTMLSpanElement>(null);
  const backPlane = useRef<SVGGElement>(null);
  const backHeading = useRef<SVGGElement>(null);
  const frontPlane = useRef<SVGGElement>(null);
  const frontHeading = useRef<SVGGElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(watchRef, { amount: 0.1 });
  const angle = useRef(Math.PI * 0.75);

  useEffect(() => {
    const planes = [
      { plane: backPlane.current, heading: backHeading.current, front: false },
      { plane: frontPlane.current, heading: frontHeading.current, front: true },
    ];
    const { rx, ry } = ORBIT;

    const place = (theta: number) => {
      // The angle runs backwards, so the plane crosses the front left to right.
      const x = rx * Math.cos(theta);
      const y = ry * Math.sin(theta);
      const heading = (Math.atan2(-ry * Math.cos(theta), rx * Math.sin(theta)) * 180) / Math.PI;
      const depth = Math.sin(theta); // -1 behind the windows, 1 in front of them
      const scale = PLANE_SCALE * (0.72 + 0.22 * (depth + 1));
      for (const { plane, heading: turn, front } of planes) {
        if (!plane || !turn) continue;
        plane.setAttribute("transform", `translate(${x} ${y})`);
        turn.setAttribute("transform", `rotate(${heading}) scale(${scale})`);
        const onThisSide = front === (depth > 0);
        plane.style.opacity = onThisSide ? (front ? "1" : "0.85") : "0";
      }
    };

    if (reduceMotion) {
      place(RESTING_ANGLE);
      return;
    }

    place(angle.current);
    if (!inView) return;

    const start = angle.current;
    const lap = animate(0, 1, {
      duration: LAP_SECONDS,
      ease: "linear",
      repeat: Infinity,
      onUpdate: (progress) => {
        angle.current = start - progress * Math.PI * 2;
        place(angle.current);
      },
    });
    return () => lap.stop();
  }, [reduceMotion, inView]);

  return (
    <>
      <span ref={watchRef} className="hero-art__watch" aria-hidden="true" />
      <OrbitLayer side="back" planeRef={backPlane} headingRef={backHeading} />
      <OrbitLayer side="front" planeRef={frontPlane} headingRef={frontHeading} />
    </>
  );
}

/** Three short strokes, like a sketched "pop" beside a label. */
function Burst({ at }: { at: Spot }) {
  return (
    <span className="hero-art__item hero-art__burst hero-art__float" style={spot(at)} aria-hidden="true">
      <svg viewBox="0 0 40 40">
        <path d="M22 4 L20 14 M34 10 L27 17 M38 26 L28 25" />
      </svg>
    </span>
  );
}

/**
 * The hero's picture: three before / after photos framed as airplane windows,
 * with a plane lapping round them.
 */
export default function HeroArt() {
  return (
    <div className="hero-art">
      <motion.div className="hero-art__stage" initial="hidden" animate="visible">
        <motion.span className="hero-art__halo" variants={fadeIn(0.1)} aria-hidden="true" />

        <Orbit />

        {WINDOWS.map((w, index) => (
          <motion.div
            key={w.name}
            className="hero-art__item hero-art__window"
            style={spot(w.at)}
            variants={rise(0.2 + index * 0.15)}
          >
            <Compare photo={w} />
          </motion.div>
        ))}

        <motion.div className="hero-art__group" variants={rise(0.7)} aria-hidden="true">
          <span
            className={`hero-art__item hero-art__tag hero-art__tag--before hero-art__float ${hand.className}`}
            style={spot({ x: 44, y: 118, r: -9, z: 5, delay: 0.4 })}
          >
            Before
          </span>
          <Burst at={{ x: 14, y: 96, w: 34, r: -90, z: 5, delay: 0.4 }} />

          <span
            className={`hero-art__item hero-art__tag hero-art__tag--after hero-art__float ${hand.className}`}
            style={spot({ x: 470, y: 100, r: 7, z: 5, delay: 1.1 })}
          >
            After
          </span>
          <Burst at={{ x: 578, y: 76, w: 34, r: 0, z: 5, delay: 1.1 }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
