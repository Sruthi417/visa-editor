/** Where a FlyFrame feature stands. `tbd` means the decision hasn't been made. */
export type ProductStatus = "live" | "planned" | "tbd";

/** What the competitor's own pages say about a feature. */
export type CompetitorStatus = "stated" | "not-stated";

export type ProductCell = {
  status: ProductStatus;
  /** Shown under the status. Optional for `tbd`. */
  text?: string;
};

export type CompetitorCell = {
  status: CompetitorStatus;
  /** For `stated` this is the claim. For `not-stated` it is an optional note. */
  text?: string;
};

export type ComparisonRow = {
  feature: string;
  flyframe: ProductCell;
  competitor: CompetitorCell;
};

export type ComparisonGroup = {
  id: string;
  title: string;
  description: string;
  rows: ComparisonRow[];
};

export type SummaryCard = {
  name: string;
  /** Image path under /public, shown at the top of the card. */
  image: string;
  /** The paragraph under the image. */
  paragraph: string;
  /** The short line in the small card at the bottom, under the name. */
  text: string;
};

/** One card on the /compare hub. Each one has its own title, image and blurb. */
export type HubCard = {
  /** Matches a comparison's slug, so the card links to /compare/{slug}. */
  slug: string;
  title: string;
  /** Image path under /public. */
  image: string;
  /** CSS object-position for the 16:9 card crop, such as "center 40%". Defaults to the centre. */
  imagePosition?: string;
  blurb: string;
};

export type Comparison = {
  slug: string;
  seo: { title: string; description: string };
  hero: {
    title: string;
    intro: string;
    /** The "VS" image between the two brand cards. */
    badge: string;
    cta: { label: string };
    /** The short checks under the button. The date is added in front of these. */
    points: string[];
  };
  /** ISO date (YYYY-MM-DD) the competitor's pages were read. */
  checkedOn: string;
  /** `logo` is a file name in public/images/compare, shown in the hero's brand card. */
  product: { name: string; status: ProductStatus; logo: string };
  competitor: { name: string; url: string; status: "live" | "planned"; logo: string };
  summary: { title: string; cards: [SummaryCard, SummaryCard] };
  howToRead: { title: string; items: { label: string; text: string }[] };
  /** The main title above the first table. */
  features: { title: string };
  groups: ComparisonGroup[];
  strengths: {
    title: string;
    flyframe: { heading: string; points: string[] };
    competitor: { heading: string; points: string[] };
  };
  cta: { title: string; text: string; label: string; href: string };
  sources: {
    title: string;
    openedOn: string;
    links: { label: string; url: string }[];
    notUsed: string;
    disclaimer: string;
  };
};
