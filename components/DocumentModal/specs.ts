export type DocumentType = "passport" | "visa";

export type PhotoSpec = {
  /** Photo size in millimetres. */
  widthMm: number;
  heightMm: number;
  /** Shown next to the metric size when the authority quotes inches. */
  imperial?: string;
  /** Minimum resolution for digital submissions. */
  dpi: number;
  background: string;
  /** Swatch for the background, as a CSS colour. */
  backgroundColor: string;
  /** Allowed chin-to-crown height in millimetres, when it is specified. */
  headMm?: [number, number];
  /** Format of the file that is submitted. */
  format: "JPEG";
  /** Allowed file size in kilobytes: [minimum, maximum]. */
  fileKb: [number, number];
};

export type CountrySpecs = {
  code: string;
  country: string;
  passport?: PhotoSpec;
  visa?: PhotoSpec;
  /**
   * The authority only accepts an unaltered photo: cropping is fine, but
   * background removal or any other AI editing is prohibited.
   */
  cropOnly?: boolean;
};

/** A spec before its file limits are added (see FILE_LIMITS). */
type SpecBase = Omit<PhotoSpec, "format" | "fileKb">;

type CountryBase = {
  code: string;
  country: string;
  passport?: SpecBase;
  visa?: SpecBase;
  cropOnly?: boolean;
};

const WHITE = { background: "White", backgroundColor: "#ffffff" };
const LIGHT = { background: "Plain light", backgroundColor: "#f1f1f1" };
const LIGHT_GREY = { background: "Light grey", backgroundColor: "#e4e4e4" };
const GREY_OR_CREAM = {
  background: "Light grey or cream",
  backgroundColor: "#ebe7dc",
};

/** 35 x 45 mm, the ICAO size used by most of the world. */
const ICAO = { widthMm: 35, heightMm: 45, dpi: 300, headMm: [32, 36] as [number, number] };
/** 2 x 2 inch, the US and India size. */
const SQUARE_2IN = {
  widthMm: 51,
  heightMm: 51,
  imperial: "2x2 in",
  dpi: 300,
  headMm: [25, 35] as [number, number],
};

/**
 * Typical photo requirements for passports and visas. Authorities update
 * these, so the interface tells people to confirm against the official
 * source before submitting.
 */
const baseSpecs: CountryBase[] = [
  {
    code: "AU",
    country: "Australia",
    cropOnly: true,
    passport: { ...ICAO, ...LIGHT },
    visa: { ...ICAO, ...LIGHT },
  },
  {
    code: "BR",
    country: "Brazil",
    passport: { widthMm: 50, heightMm: 70, dpi: 300, headMm: [32, 36], ...WHITE },
    visa: { widthMm: 50, heightMm: 70, dpi: 300, headMm: [32, 36], ...WHITE },
  },
  {
    code: "CA",
    country: "Canada",
    cropOnly: true,
    passport: {
      widthMm: 50,
      heightMm: 70,
      dpi: 300,
      headMm: [31, 36],
      background: "Plain white or light",
      backgroundColor: "#f6f6f6",
    },
    visa: {
      ...ICAO,
      background: "Plain white or light",
      backgroundColor: "#f6f6f6",
    },
  },
  {
    code: "CN",
    country: "China",
    passport: { widthMm: 33, heightMm: 48, dpi: 300, headMm: [28, 33], ...WHITE },
    visa: { widthMm: 33, heightMm: 48, dpi: 300, headMm: [28, 33], ...WHITE },
  },
  {
    code: "FR",
    country: "France",
    passport: { ...ICAO, ...LIGHT_GREY },
  },
  {
    code: "DE",
    country: "Germany",
    passport: { ...ICAO, ...LIGHT_GREY },
  },
  {
    code: "IN",
    country: "India",
    passport: { ...SQUARE_2IN, ...WHITE },
    visa: { ...SQUARE_2IN, ...WHITE },
  },
  {
    code: "ID",
    country: "Indonesia",
    passport: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
  },
  {
    code: "IE",
    country: "Ireland",
    passport: { ...ICAO, ...GREY_OR_CREAM },
  },
  {
    code: "IT",
    country: "Italy",
    passport: { ...ICAO, ...LIGHT },
  },
  {
    code: "JP",
    country: "Japan",
    passport: { ...ICAO, ...WHITE },
    visa: { widthMm: 45, heightMm: 45, dpi: 300, ...WHITE },
  },
  {
    code: "MX",
    country: "Mexico",
    passport: { ...ICAO, ...WHITE },
  },
  {
    code: "NL",
    country: "Netherlands",
    passport: { ...ICAO, ...LIGHT_GREY },
  },
  {
    code: "NZ",
    country: "New Zealand",
    cropOnly: true,
    passport: { ...ICAO, ...LIGHT },
    visa: { ...ICAO, ...LIGHT },
  },
  {
    code: "PK",
    country: "Pakistan",
    passport: { ...ICAO, ...WHITE },
  },
  {
    code: "PH",
    country: "Philippines",
    passport: { ...ICAO, ...WHITE },
  },
  {
    code: "RU",
    country: "Russia",
    passport: { ...ICAO, ...LIGHT },
    visa: { ...ICAO, ...LIGHT },
  },
  {
    code: "SA",
    country: "Saudi Arabia",
    passport: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
    visa: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
  },
  {
    code: "SG",
    country: "Singapore",
    passport: { ...ICAO, ...WHITE },
    visa: { ...ICAO, ...WHITE },
  },
  {
    code: "ZA",
    country: "South Africa",
    passport: { ...ICAO, ...WHITE },
  },
  {
    code: "KR",
    country: "South Korea",
    passport: { ...ICAO, ...WHITE },
    visa: { ...ICAO, ...WHITE },
  },
  {
    code: "ES",
    country: "Spain",
    passport: { widthMm: 30, heightMm: 40, dpi: 300, ...WHITE },
  },
  {
    code: "SCH",
    country: "Schengen Area (EU visa)",
    visa: { ...ICAO, ...LIGHT_GREY },
  },
  {
    code: "TR",
    country: "Turkey",
    passport: { widthMm: 50, heightMm: 60, dpi: 300, ...WHITE },
  },
  {
    code: "AE",
    country: "United Arab Emirates",
    passport: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
  },
  {
    code: "GB",
    country: "United Kingdom",
    passport: { ...ICAO, ...GREY_OR_CREAM },
    visa: { ...ICAO, ...GREY_OR_CREAM },
  },
  {
    code: "US",
    country: "United States",
    passport: { ...SQUARE_2IN, ...WHITE },
    visa: { ...SQUARE_2IN, ...WHITE },
  },
  {
    code: "VN",
    country: "Vietnam",
    passport: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
    visa: { widthMm: 40, heightMm: 60, dpi: 300, ...WHITE },
  },
];

/**
 * Accepted file sizes in kilobytes, [minimum, maximum], where a country
 * differs from the default of 50 to 5000. All photos are submitted as JPEG.
 */
const DEFAULT_FILE_KB: [number, number] = [50, 5000];

const FILE_LIMITS: Record<string, Partial<Record<DocumentType, [number, number]>>> = {
  CA: { passport: [200, 5120] },
  CN: { passport: [40, 500], visa: [40, 500] },
  IN: { passport: [20, 100], visa: [10, 300] },
  NZ: { passport: [250, 5120] },
  PK: { passport: [20, 500] },
  SG: { passport: [50, 8000] },
  GB: { passport: [50, 10240] },
  US: { passport: [54, 10240], visa: [50, 240] },
};

function withFile(code: string, type: DocumentType, spec?: SpecBase): PhotoSpec | undefined {
  return spec && {
    ...spec,
    format: "JPEG",
    fileKb: FILE_LIMITS[code]?.[type] ?? DEFAULT_FILE_KB,
  };
}

export const photoSpecs: CountrySpecs[] = baseSpecs.map((entry) => ({
  ...entry,
  passport: withFile(entry.code, "passport", entry.passport),
  visa: withFile(entry.code, "visa", entry.visa),
}));

/** Shown in the Choose view for countries that only accept an unaltered photo. */
export const CROP_ONLY_NOTICE =
  "Background removal and any other AI editing is strictly prohibited for this country. Only cropping is allowed, so take your photo against a plain, light background; a photo with a changed background may be rejected.";

/** Countries that have a spec for this document type. */
export function countriesFor(type: DocumentType): CountrySpecs[] {
  return photoSpecs.filter((entry) => entry[type]);
}

export function sizeLabel(spec: PhotoSpec): string {
  const metric = `${spec.widthMm}x${spec.heightMm} mm`;
  return spec.imperial ? `${spec.imperial} (${metric})` : metric;
}

/** "JPEG, 50–5000 KB" */
export function fileLabel(spec: PhotoSpec): string {
  return `${spec.format}, ${spec.fileKb[0]}–${spec.fileKb[1]} KB`;
}

/** Photo size in pixels at the spec's resolution. */
export function pixelSize(spec: PhotoSpec): { width: number; height: number } {
  const px = (mm: number) => Math.round((mm / 25.4) * spec.dpi);
  return { width: px(spec.widthMm), height: px(spec.heightMm) };
}

export function pixelLabel(spec: PhotoSpec): string {
  const { width, height } = pixelSize(spec);
  return `${width}x${height} px`;
}

/** A length in millimetres, shown in inches when the authority quotes inches. */
export function formatLength(mm: number, spec: PhotoSpec): string {
  if (!spec.imperial) return `${Math.round(mm)} mm`;
  // Round to the nearest 0.05 in, so 51 mm reads as 2 in rather than 2.01 in.
  const inches = Math.round((mm / 25.4) * 20) / 20;
  return `${inches.toFixed(2).replace(/\.?0+$/, "")} in`;
}

/** How much of the photo's height the head (crown to chin) should fill. */
export function headFraction(spec: PhotoSpec): number {
  return spec.headMm
    ? (spec.headMm[0] + spec.headMm[1]) / 2 / spec.heightMm
    : 0.74;
}

/* ---------------------------------------------------------------------------
   Crop preview

   The sample portrait is 3:2. These numbers locate the head in it, as
   fractions of the image height (x as a fraction of the width), so the crop
   can be computed for any photo size.
--------------------------------------------------------------------------- */

export const SAMPLE_PHOTO = {
  src: "/sample-original.jpg",
  aspect: 3 / 2,
  faceCenterX: 0.52,
  headTop: 0.06,
  headBottom: 0.76,
};

export type CropBox = {
  /** All values are percentages of the preview frame. */
  widthPct: number;
  leftPct: number;
  topPct: number;
};

/**
 * Places the sample photo inside a frame of the spec's proportions, with the
 * head sized to the allowed range and centred. The crop is limited to the
 * photo itself, so very small head sizes are shown as large as the picture
 * allows.
 */
export function cropFor(spec: PhotoSpec): CropBox {
  const { aspect, faceCenterX, headTop, headBottom } = SAMPLE_PHOTO;
  const headHeight = headBottom - headTop;

  const targetHead = headFraction(spec);

  // Work in image-height units: the photo is `aspect` wide and 1 tall.
  const frameAspect = spec.widthMm / spec.heightMm;
  const cropH = Math.min(headHeight / targetHead, 1, aspect / frameAspect);
  const cropW = cropH * frameAspect;

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const left = clamp(faceCenterX * aspect - cropW / 2, 0, aspect - cropW);
  // Leave a little more room above the head than below the chin.
  const top = clamp(headTop - (cropH - headHeight) * 0.35, 0, 1 - cropH);

  return {
    widthPct: (aspect / cropW) * 100,
    leftPct: -(left / cropW) * 100,
    topPct: -(top / cropH) * 100,
  };
}
