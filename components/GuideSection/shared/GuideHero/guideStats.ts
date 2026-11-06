/** The icon names a stat can use. The hero maps each one to its icon. */
export type GuideStatIcon = "zap" | "clock" | "image" | "badge-check";

export type GuideStat = {
  id: number;
  icon: GuideStatIcon;
  /** The big number. `null` shows the icon large instead. */
  value: string | null;
  label: string;
};

/** The four tiles along the bottom of the guide hero. */
export const GUIDE_STATS: GuideStat[] = [
  {
    id: 1,
    icon: "zap",
    value: "4",
    label: "SIMPLE STEPS",
  },
  {
    id: 2,
    icon: "clock",
    value: "56",
    label: "SECONDS",
  },
  {
    id: 3,
    icon: "image",
    value: null,
    label: "PHOTO TIPS",
  },
  {
    id: 4,
    icon: "badge-check",
    value: "4",
    label: "KEY RULES",
  },
];
