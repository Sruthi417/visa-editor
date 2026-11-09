/** The picture on the photo checker card, in the Guide and the Blog. */
const PICTURE = {
  src: "/images/guide/photo-checker.webp",
  width: 396,
  height: 396,
};

/** The checker card's picture. Both cards read it from here, so it changes in one place. */
export function checkerPicture() {
  return PICTURE;
}
