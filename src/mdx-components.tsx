import type { MDXComponents } from "mdx/types";

export function useMDXComponents(
  components: MDXComponents,
): MDXComponents {
  return {
    ...components,
    table: ({ children, ...props }) => (
      <div className="not-prose my-6 overflow-x-auto">
        <table className="w-full text-sm prose-table" {...props}>
          {children}
        </table>
      </div>
    ),
    thead: (props) => (
      <thead
        className="border-b border-foreground/15 text-foreground"
        {...props}
      />
    ),
    th: (props) => (
      <th
        className="text-left font-semibold text-foreground py-2 pr-4 align-bottom whitespace-nowrap"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="text-foreground/85 py-2 pr-4 align-top border-b border-foreground/5"
        {...props}
      />
    ),
  };
}
