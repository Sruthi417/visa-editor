import BlogButton from "../../shared/BlogButton/BlogButton";
import type { Blog } from "../../types";
import "./BlogCta.scss";

/** The next step: a sky banner with its content centred, the same as the Guide and Compare banners. */
export default function BlogCta({ data }: { data: Blog["next"] }) {
  return (
    <section id={data.id} className="blog-cta">
      <h2>{data.title}</h2>
      <p>{data.text}</p>
      <BlogButton label={data.cta.label} variant="light" className="blog-cta__button" />
    </section>
  );
}
