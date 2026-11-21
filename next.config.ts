import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  // Rawbyte ikon og logo: statiske sider i public/rawbyte (ulistet, noindex).
  async redirects() {
    return [
      { source: "/rawbyte", destination: "/rawbyte/index.html", permanent: false },
    ];
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [["remark-gfm", {}]],
  },
});

export default withMDX(nextConfig);
