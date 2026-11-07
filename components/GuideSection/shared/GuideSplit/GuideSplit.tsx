import RichText from "../RichText/RichText";
import "./GuideSplit.scss";

type Props = {
  id: string;
  heading: string;
  text: string;
  /** The line after the text. Can use **bold** and [label](/guide/slug) links. */
  more: string;
  /** A narrow card, which leaves the content on the right more room. */
  narrow?: boolean;
  /** The card on the left. */
  children: React.ReactNode;
};


export default function GuideSplit({ id, heading, text, more, narrow = false, children }: Props) {
  return (
    <section id={id} className={`guide-split${narrow ? " guide-split--narrow" : ""}`}>
      <div className="guide-split__copy">
        <h2 className="guide-split__heading">{heading}</h2>
        <p>{text}</p>
        <p>
          <RichText text={more} />
        </p>
      </div>

      <div className="guide-split__card">{children}</div>
    </section>
  );
}
