import type { NextConfig } from "next";
import { basePath } from "./src/lib/site-path";

const config: NextConfig = {
  output: "export",
  basePath: basePath(process.env.NEXT_PUBLIC_BASE_PATH),
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default config;
