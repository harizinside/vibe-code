import type { TocItem } from "../utils/markdown"

export function TableOfContents({ headings }: { headings: TocItem[] }) {
  if (headings.length === 0) return null

  return (
    <nav className="sticky top-8 text-sm">
      <p className="font-semibold mb-2 text-gray-500 uppercase text-xs tracking-wider">
        On this page
      </p>
      <ul className="space-y-1 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="block py-1 text-gray-600 hover:text-blue-600 transition-colors"
              style={{ paddingLeft: h.level === 3 ? "1.5rem" : "0.75rem" }}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
