import Link from "next/link";

// **bold** and [label](/path). Everything else in the text is shown as it is.
const MARKUP = /\*\*(.+?)\*\*|\[(.+?)\]\((.+?)\)/g;

/** Text from the guide JSON, with its bold phrases and internal links turned on. */
export default function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;

  for (const match of text.matchAll(MARKUP)) {
    const [whole, bold, label, href] = match;
    const start = match.index ?? 0;

    parts.push(text.slice(last, start));
    parts.push(
      bold ? (
        <strong key={start}>{bold}</strong>
      ) : (
        // Many of these guides are still to be written, so they aren't fetched ahead of a click.
        <Link key={start} href={href} prefetch={false}>
          {label}
        </Link>
      ),
    );
    last = start + whole.length;
  }

  parts.push(text.slice(last));
  return <>{parts}</>;
}
