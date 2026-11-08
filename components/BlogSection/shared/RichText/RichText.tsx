import Link from "next/link";

// **bold** and [label](/path). Everything else in the text is shown as it is.
const MARKUP = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Text from the blog JSON, with its bold phrases and links turned on. */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(MARKUP)) {
    const [whole, bold, label, href] = match;
    const start = match.index ?? 0;

    parts.push(text.slice(last, start));

    if (bold) {
      parts.push(<strong key={start}>{bold}</strong>);
    } else if (/^https?:\/\//.test(href)) {
      // Sources and spec pages open in a new tab.
      parts.push(
        <a key={start} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>,
      );
    } else if (href.startsWith("#")) {
      // A section of the same post: a plain anchor, so the browser's smooth scroll and the
      // section's landing offset apply.
      parts.push(
        <a key={start} href={href}>
          {label}
        </a>,
      );
    } else {
      // Many of these pages are still to be written, so they aren't fetched ahead of a click.
      parts.push(
        <Link key={start} href={href} prefetch={false}>
          {label}
        </Link>,
      );
    }

    last = start + whole.length;
  }

  parts.push(text.slice(last));
  return <>{parts}</>;
}
