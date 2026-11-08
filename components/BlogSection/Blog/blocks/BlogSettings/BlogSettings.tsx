import { HugeiconsIcon } from "@hugeicons/react";

import RichText from "../../../shared/RichText/RichText";
import { BLOG_ICONS } from "../../../shared/blogIcons";
import type { SettingsBlock } from "../../../types";
import "./BlogSettings.scss";

/** A phone-settings style list: each setting with a switch, or with a chip for its value. */
export default function BlogSettings({ data }: { data: SettingsBlock }) {
  return (
    <ul className="blog-settings">
      {data.rows.map((row) => (
        <li key={row.label} className="blog-settings__row">
          <span className="blog-settings__icon" aria-hidden="true">
            <HugeiconsIcon icon={BLOG_ICONS[row.icon]} size={20} strokeWidth={1.7} />
          </span>

          <span className="blog-settings__text">
            <span className="blog-settings__label">{row.label}</span>
            {row.text && (
              <span className="blog-settings__note">
                <RichText text={row.text} />
              </span>
            )}
          </span>

          {row.state ? (
            <span className={`blog-settings__switch blog-settings__switch--${row.state}`}>
              <span className="blog-settings__state">{row.state === "on" ? "On" : "Off"}</span>
              {/* Only a picture of a switch: the word beside it says the same thing. */}
              <span className="blog-settings__track" aria-hidden="true">
                <span className="blog-settings__knob" />
              </span>
            </span>
          ) : (
            row.value && <span className="blog-settings__value">{row.value}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
