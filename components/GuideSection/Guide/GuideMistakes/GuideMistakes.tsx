import type { Guide } from "../../types";
import "./GuideMistakes.scss";

/** The common mistakes as a simple table: each mistake on the left, its fix on the right. */
export default function GuideMistakes({ data }: { data: Guide["mistakes"] }) {
  return (
    <section id={data.id} className="guide-mistakes">
      <h2 className="guide-mistakes__title">{data.title}</h2>
      <p className="guide-mistakes__sub">{data.sub}</p>

      <div className="guide-mistakes__wrap">
        <table className="guide-mistakes__table">
          <thead>
            <tr>
              <th scope="col">{data.mistakeLabel}</th>
              <th scope="col">{data.fixLabel}</th>
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row) => (
              <tr key={row.mistake}>
                <th scope="row">{row.mistake}</th>
                <td data-label={data.fixLabel}>{row.fix}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
