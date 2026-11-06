export type StepGroup = {
  /** A small heading above the points, such as "Head position". */
  label?: string;
  points?: string[];
  /** A short paragraph, for a step that is prose rather than a list. */
  text?: string;
};

export type Step = {
  id: string;
  number: string;
  title: string;
  /** Image path under /public. Steps without one are laid out as text only. */
  image?: string;
  alt?: string;
  /** `square` crops a tall photo that has empty space above and below the people. */
  frame?: "portrait" | "square";
  groups: StepGroup[];
};

export type NeedIcon = "phone" | "wall" | "light" | "helper";

/** One card on the /guide hub. Each guide has its own title, image and blurb. */
export type HubCard = {
  /** Matches a guide's slug, so the card links to /guide/{slug}. */
  slug: string;
  title: string;
  /** Image path under /public. */
  image: string;
  /** CSS object-position for the 16:9 card crop, such as "center 40%". Defaults to the centre. */
  imagePosition?: string;
  blurb: string;
};

export type Guide = {
  /** The guide's id in the address: /guide/{slug}. */
  slug: string;
  /** The short last item in the breadcrumb, after "Photo guide". */
  breadcrumb: string;
  seo: { title: string; description: string };
  /** ISO date (YYYY-MM-DD) the facts were checked. */
  checkedOn: string;
  hero: {
    title: string;
    intro: string;
    /** The picture under the intro: a transparent PNG in /public. */
    image: { src: string; alt: string };
  };
  quickAnswer: { id: string; title: string; points: string[] };
  needs: {
    id: string;
    title: string;
    /** Each item is one small card: an icon and short label on top, the text over the picture. */
    items: { icon: NeedIcon; label: string; text: string }[];
  };
  steps: { id: string; title: string; items: Step[] };
  mistakes: {
    id: string;
    title: string;
    mistakeLabel: string;
    fixLabel: string;
    rows: { mistake: string; fix: string }[];
  };
  note: { id: string; title: string; text: string };
  check: { id: string; title: string; badge: string; text: string; cta: { label: string } };
  faq: {
    id: string;
    eyebrow: string;
    title: string;
    sub: string;
    items: { q: string; a: string }[];
  };
  next: { id: string; title: string; text: string; cta: { label: string } };
};
