import type { CSSProperties } from "react";

import "./HeroVisual.scss";

type Box = { left: number; top: number; width: number; height: number };
type Photo = Box & { src: string; alt: string };
type Arrow = { left: number; top: number };

const box = ({ left, top, width, height }: Box): CSSProperties => ({
  left: `${left}%`,
  top: `${top}%`,
  width: `${width}%`,
  height: `${height}%`,
});

const unsplash = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const tiles: Box[] = [
  { left: 12, top: 11, width: 13.5, height: 18.5 },
  { left: 43, top: 6.5, width: 13.8, height: 19 },
  { left: 75, top: 11, width: 13.5, height: 18.5 },

  { left: 3.3, top: 32, width: 15.8, height: 22 },
  { left: 41, top: 32.5, width: 18, height: 27.5 },
  { left: 81.5, top: 32, width: 15.8, height: 22 },

  { left: 9, top: 59, width: 12.7, height: 19 },
  { left: 78.5, top: 59, width: 13.5, height: 19 },

  { left: 14, top: 82, width: 15.5, height: 18.5 },
  { left: 70, top: 82, width: 15.5, height: 18.5 },
  { left: 34, top: 91, width: 14.5, height: 16 },
  { left: 51, top: 91, width: 14.5, height: 16 },
];

const photos: Photo[] = [
  {
    left: 27,
    top: 8,
    width: 15.7,
    height: 22.5,
    src: unsplash("photo-1534528741775-53994a69daeb", 300),
    alt: "Original portrait",
  },
  {
    left: 57.5,
    top: 7,
    width: 16.5,
    height: 23,
    src: unsplash("photo-1512316609839-ce289d3eba0a", 300),
    alt: "Passport-ready portrait",
  },
  {
    left: 21.2,
    top: 35,
    width: 18.2,
    height: 25.5,
    src: unsplash("photo-1500648767791-00dcc994a43e", 350),
    alt: "Original portrait of a man",
  },
  {
    left: 60.7,
    top: 34.5,
    width: 18.7,
    height: 25.5,
    src: unsplash("photo-1506794778202-cad84cf45f1d", 350),
    alt: "Passport-ready portrait of a man",
  },
  {
    left: 24.8,
    top: 64.5,
    width: 17,
    height: 24,
    src: unsplash("photo-1519689680058-324335c77eba", 300),
    alt: "Original baby portrait",
  },
  {
    left: 58.2,
    top: 64.5,
    width: 17,
    height: 24,
    src: unsplash("photo-1492725764893-90b379c2b6e7", 300),
    alt: "Passport-ready baby portrait",
  },
];

const arrows: Arrow[] = [
  { left: 43.5, top: 17.5 },
  { left: 41.5, top: 46.5 },
  { left: 43, top: 76.5 },
];

export default function HeroVisual() {
  return (
    <div className="hero-visual">
      {tiles.map((tile, i) => (
        <div key={`tile-${i}`} className="hero-visual__tile" style={box(tile)} />
      ))}

      {photos.map((photo) => (
        <div key={photo.src} className="hero-visual__photo" style={box(photo)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photo.src} alt={photo.alt} loading="lazy" />
        </div>
      ))}

      {arrows.map((arrow, i) => (
        <div
          key={`arrow-${i}`}
          className="hero-visual__arrow"
          style={{ left: `${arrow.left}%`, top: `${arrow.top}%` }}
          aria-hidden="true"
        >
          <span className="hero-visual__dash" />
          <span className="hero-visual__dash" />
          <span className="hero-visual__dash" />
          <span className="hero-visual__dash" />
          <i className="hero-visual__arrowhead" />
        </div>
      ))}
    </div>
  );
}
