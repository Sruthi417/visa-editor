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
  badge: string;
  tone: "planned" | "live";
  text: string;
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
  /** The short blurb on this comparison's card in the /compare hub. */
  hub: { blurb: string };
  /** ISO date (YYYY-MM-DD) the competitor's pages were read. */
  checkedOn: string;
  /** `logo` is a file name in public/images/compare, shown in the hero's brand card. */
  product: { name: string; status: ProductStatus; logo: string };
  competitor: { name: string; url: string; status: "live" | "planned"; logo: string };
  summary: { title: string; paragraphs: string[]; cards: SummaryCard[] };
  howToRead: { title: string; items: { label: string; text: string }[] };
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
