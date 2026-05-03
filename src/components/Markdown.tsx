import parse from "html-react-parser"

export function Markdown({ content }: { content: string }) {
  return <div>{parse(content)}</div>
}
