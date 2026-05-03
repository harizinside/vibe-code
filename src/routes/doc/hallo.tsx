import { createFileRoute, Link } from "@tanstack/react-router";
import { renderMarkdown, extractHeadings } from "../../utils/markdown";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { Markdown } from "../../components/Markdown";
import { TableOfContents } from "../../components/TableOfContents";

export const Route = createFileRoute("/doc/hallo")({
  loader: async () => {
    const filePath = join(process.cwd(), "docs/api.md");
    const raw = await readFile(filePath, "utf-8");
    const html = await renderMarkdown(raw);
    const headings = extractHeadings(raw);
    return { html, headings };
  },
  component: DocPage,
});

function DocPage() {
  const { html, headings } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/doc/hallo" className="hover:text-blue-600 transition-colors">Doc</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium">Hallo</span>
      </nav>

      <div className="flex gap-8">
        <div className="prose flex-1 min-w-0">
          <Markdown content={html} />
        </div>
        <aside className="hidden lg:block w-56 shrink-0">
          <TableOfContents headings={headings} />
        </aside>
      </div>
    </div>
  );
}
