import Link from "next/link";

export default function ContentLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-24">
      <p className="text-sm text-foreground/60 mb-6">
        <Link href="/solstrandhage/for-beboere">← For beboere</Link>
      </p>
      <article
        className="prose prose-neutral max-w-none
        prose-headings:font-serif prose-headings:tracking-tight prose-headings:text-foreground
        prose-h1:text-4xl prose-h1:sm:text-5xl prose-h1:leading-tight
        prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
        prose-h3:text-xl prose-h3:mt-8
        prose-p:text-foreground/85
        prose-li:text-foreground/85
        prose-strong:text-foreground
        prose-a:text-accent prose-a:no-underline hover:prose-a:underline
        prose-table:text-sm
        prose-th:text-left prose-th:text-foreground prose-th:font-semibold
        prose-td:align-top
        prose-hr:border-foreground/10"
      >
        {children}
      </article>
    </div>
  );
}
