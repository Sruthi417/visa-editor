/** The icon names a blog's JSON can use. shared/blogIcons.ts maps each one to its icon. */
export type BlogIcon =
  | "rear-camera"
  | "front-camera"
  | "phone"
  | "sharpness"
  | "light"
  | "face"
  | "level"
  | "file"
  | "passport"
  | "lens"
  | "resolution"
  | "flash"
  | "portrait"
  | "beauty"
  | "filters"
  | "grid"
  | "timer"
  | "focus"
  | "ruler"
  | "crop"
  | "guide"
  | "info";

/** A picture under /public. `width` and `height` are the file's own size. */
export type BlogImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** CSS object-position for the crop, such as "center 60%". Defaults to the centre. */
  position?: string;
  /** `contain` shows the whole picture on a tinted panel, for a cut-out PNG. Defaults to `cover`. */
  fit?: "cover" | "contain";
  /** Crops further in, such as 1.12, for a picture with wide empty margins. Defaults to 1. */
  zoom?: number;
};

/** The frame shape a picture is cropped to. `auto` keeps the picture's own shape, uncropped. */
export type BlogAspect = "16/9" | "3/2" | "4/3" | "1/1" | "4/5" | "auto";

// The blocks a section is built from. Each `type` has its own component in Blog/blocks.
// Any text can use **bold** and [label](/path) links; a link starting with http opens in a new tab.

export type ParagraphBlock = { type: "paragraph"; text: string };

/**
 * A smaller heading inside a section (an h3). With an `icon` it opens a new part of the
 * section, such as one factor; with an `id` it can be linked to as /blog/{slug}#{id}.
 */
export type SubheadingBlock = {
  type: "subheading";
  text: string;
  icon?: BlogIcon;
  id?: string;
  /** 4 is a smaller heading inside a part that already has a heading, such as one factor. */
  level?: 3 | 4;
};

/** Two or more pictures side by side, each with a small label on it, such as Rear / Front camera. */
export type CompareBlock = {
  type: "compare";
  items: { label: string; icon?: BlogIcon; image: BlogImage }[];
};

/**
 * A bulleted list. An item can be a plain string, or `{ text, fix }`: a point that names a
 * drawback, with a second paragraph under it showing how to sort it.
 */
export type ListBlock = { type: "list"; items: (string | { text: string; fix?: string })[] };

/** A row of small icon tiles that name the things a paragraph lists. */
export type TilesBlock = { type: "tiles"; items: { icon: BlogIcon; label: string }[] };

/** A table. `tone: "fix"` is a mistake / fix table: the mistakes column gets 44% of the width. */
export type TableBlock = {
  type: "table";
  columns: { label: string; icon?: BlogIcon }[];
  rows: string[][];
  tone?: "plain" | "fix";
};

/** Side-by-side spec cards, one per product. */
export type SpecsBlock = {
  type: "specs";
  items: {
    name: string;
    /** The manufacturer's spec page. */
    url: string;
    rows: { label: string; value: string }[];
  }[];
};

/** Big numbers with a short label under each. */
export type StatsBlock = {
  type: "stats";
  items: { prefix?: string; value: string; label: string }[];
};

/** A picture beside a stack of cards, each with a big value. */
export type DistanceBlock = {
  type: "distance";
  image: BlogImage;
  /**
   * Pictures shown one at a time in place of `image`, with arrows and dots. They replace it
   * only once every one of their files is in /public, so the page never shows a broken picture.
   */
  slides?: { label: string; image: BlogImage }[];
  items: { icon: BlogIcon; label: string; value: string; sub: string; text: string }[];
};

/** A phone-settings style list: a switch for on/off settings, a value chip for the rest. */
export type SettingsBlock = {
  type: "settings";
  rows: {
    icon: BlogIcon;
    label: string;
    state?: "on" | "off";
    value?: string;
    text?: string;
  }[];
};

/** Numbered steps, with an optional picture beside them. */
export type StepsBlock = {
  type: "steps";
  items: string[];
  image?: BlogImage;
  /** Which side the picture sits on, on a wide screen. Defaults to the right. */
  imageSide?: "left" | "right";
  /** The frame shape the picture is cropped to. Defaults to 4/3; `auto` keeps its own shape. */
  aspect?: BlogAspect;
};

/** Things to check, each with an icon and a bold label. An optional wide picture sits above. */
export type ChecklistBlock = {
  type: "checklist";
  items: { icon: BlogIcon; label: string; text: string }[];
  image?: BlogImage;
};

/**
 * A tinted note box. Its opening **bold** phrase is set as a heading line, except when the
 * text starts with **Note:**, which stays inline in a smaller, quieter box.
 */
export type CalloutBlock = { type: "callout"; icon: BlogIcon; text: string };

/** One picture across the column. */
export type FigureBlock = { type: "figure"; image: BlogImage; aspect?: BlogAspect };

/** Some blocks on one side and a picture on the other. They stack on a phone, the blocks first. */
export type SplitBlock = {
  type: "split";
  image: BlogImage;
  aspect?: BlogAspect;
  /** Which side the picture sits on, on a wide screen. Defaults to the right. */
  imageSide?: "left" | "right";
  /** Paragraphs, lists, callouts and other simple blocks. */
  blocks: BlogBlock[];
};

/**
 * Do and don't photos, one card per point: a label, the wrong way with a cross and the right
 * way with a tick. The cards sit in a row on a wide screen and stack on a narrow one.
 */
export type PairsBlock = {
  type: "pairs";
  items: { icon: BlogIcon; label: string; dont: BlogImage; do: BlogImage }[];
};

export type BlogBlock =
  | ParagraphBlock
  | SubheadingBlock
  | ListBlock
  | TilesBlock
  | TableBlock
  | SpecsBlock
  | StatsBlock
  | DistanceBlock
  | SettingsBlock
  | StepsBlock
  | ChecklistBlock
  | CalloutBlock
  | FigureBlock
  | SplitBlock
  | PairsBlock
  | CompareBlock;

/** One h2 section of the article, in order. */
export type BlogSectionData = {
  /** The anchor: /blog/{slug}#{id}. */
  id: string;
  title: string;
  /** The short label in the "On this page" list. */
  nav: string;
  blocks: BlogBlock[];
};

/**
 * One "Related reading" card. `{ "guide": slug }` or `{ "blog": slug }` takes the card from
 * that hub, so it matches the hub exactly. For a page that isn't in a hub yet, the card is
 * written out in full.
 */
export type RelatedCard =
  | { guide: string }
  | { blog: string }
  | { kind: "guide" | "blog"; title: string; href: string; blurb: string; image: BlogImage };

/** One side of the "versus" pair in the hero. */
export type VersusSide = { icon: BlogIcon; label: string; text: string };

/** One card on the /blog hub. The date, reading time and category come from the blog itself. */
export type BlogHubCard = {
  /** Matches a blog's slug, so the card links to /blog/{slug}. */
  slug: string;
  title: string;
  image: BlogImage;
  blurb: string;
};

export type Blog = {
  /** The blog's id in the address: /blog/{slug}. */
  slug: string;
  /** The short last item in the breadcrumb, after "Blog". */
  breadcrumb: string;
  /** The small label on the hub card. */
  category: string;
  seo: { title: string; description: string };
  /** ISO date (YYYY-MM-DD) the facts were checked. */
  checkedOn: string;
  hero: {
    title: string;
    intro: string;
    /**
     * The picture on the left of the hero, with the text left-aligned on the right.
     * A transparent PNG sits straight on the sky. Without one, the hero is centred.
     */
    image?: BlogImage;
    /** Two cards with a "VS" badge between them, for a comparison post. */
    versus?: { left: VersusSide; right: VersusSide; badge: string };
  };
  /** An optional tinted card of short answers at the top of the post. */
  quickAnswer?: { id: string; title: string; points: string[] };
  /** "What this guide covers": each item links to a section with `#id`. */
  covers: { title: string; items: { label: string; href: string }[] };
  sections: BlogSectionData[];
  /** "Related reading": hub-style cards for other guides and blog posts. */
  related: {
    id: string;
    title: string;
    items: RelatedCard[];
  };
  /**
   * The card that sends readers to the photo editor. It sits in the right column on a wide
   * screen; on a narrower one it sits in the post, after the section named in `inlineAfter`.
   */
  editor: {
    chip: string;
    title: string;
    text: string;
    image: BlogImage;
    cta: { label: string; href: string };
    inlineAfter: string;
  };
  check: {
    id: string;
    title: string;
    /** The small label on the picture. */
    chip: string;
    text: string;
    // The picture is shared with the Guide's checker card: see components/checkerPicture.ts.
    cta: { label: string };
  };
  faq: {
    id: string;
    eyebrow: string;
    title: string;
    items: { q: string; a: string }[];
  };
  /** An optional sky banner near the end of the post, with one button. */
  next?: { id: string; title: string; text: string; cta: { label: string } };
  /** An optional numbered list of sources at the end of the post. */
  sources?: {
    id: string;
    title: string;
    items: { publisher: string; label: string; url: string; note?: string }[];
  };
};
