import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.GITHUB_ACTIONS ? "/fincalc" : "",
  assetPrefix: process.env.GITHUB_ACTIONS ? "/fincalc/" : "",
};

export default nextConfig;
