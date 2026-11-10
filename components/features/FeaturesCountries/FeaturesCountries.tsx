import Link from "next/link";

import {
  COUNTRY_COUNT,
  SPEC_COUNT,
  flagClass,
  photoSpecs,
  sizeText,
  type CountrySpecs,
  type PhotoSpec,
} from "../featureData";
import "./FeaturesCountries.scss";

// The country requirements hub, with every country's full photo rules. A placeholder until the
// hub is built.
const COUNTRY_HUB = "#";

function Size({ spec }: { spec?: PhotoSpec }) {
  if (!spec) {
    return (
      <span className="fcountries__none">
        <span aria-hidden="true">—</span>
        <span className="fcountries__sr">Not available</span>
      </span>
    );
  }
  return <>{sizeText(spec)}</>;
}

function CountryTable({ rows, part }: { rows: CountrySpecs[]; part: string }) {
  return (
    <table className="fcountries__table">
      <caption className="fcountries__sr">Photo sizes and backgrounds by country, {part}</caption>
      <thead>
        <tr>
          <th scope="col">Country</th>
          <th scope="col">Passport</th>
          <th scope="col">Visa</th>
          <th scope="col">
            <span className="fcountries__bg-head">Background</span>
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((entry) => {
          const spec = (entry.passport ?? entry.visa) as PhotoSpec;
          return (
            <tr key={entry.code}>
              <th scope="row">
                <span className="fcountries__country">
                  <span className={`fcountries__flag ${flagClass(entry.code)}`} aria-hidden="true" />
                  <span className="fcountries__name">
                    {entry.country}
                    {entry.cropOnly && <span className="fcountries__badge">Crop only</span>}
                  </span>
                </span>
              </th>
              <td>
                <Size spec={entry.passport} />
              </td>
              <td>
                <Size spec={entry.visa} />
              </td>
              <td>
                <span className="fcountries__bg">
                  <span
                    className="fcountries__swatch"
                    style={{ background: spec.backgroundColor }}
                    aria-hidden="true"
                  />
                  <span className="fcountries__bg-label">{spec.background}</span>
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

/** Every country the editor supports, with its photo sizes and background, from its own specs. */
export default function FeaturesCountries() {
  const half = Math.ceil(photoSpecs.length / 2);

  return (
    <section className="fcountries" id="countries">
      <div className="fcountries__wrap">
        <header className="fcountries__head">
          <span>Countries</span>
          <h2>Official photo sizes for {COUNTRY_COUNT} countries</h2>
          <p>
            {SPEC_COUNT} passport and visa specs, including the Schengen visa. Pick yours and the
            editor applies its size, head height, background and file limits.
          </p>
        </header>

        <div className="fcountries__tables">
          <CountryTable rows={photoSpecs.slice(0, half)} part="part 1 of 2" />
          <CountryTable rows={photoSpecs.slice(half)} part="part 2 of 2" />
        </div>

        <p className="fcountries__note">
          These are the photo sizes. Every country&apos;s full dimensions, including head height,
          margins and file limits, are on its own page:{" "}
          <Link href={COUNTRY_HUB} className="fcountries__link">
            see all country requirements
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
