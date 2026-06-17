import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin(
  // Points to the server-side request config (getRequestConfig)
  "./src/i18n/request.ts"
);

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "publiish.io",
                port: "",
                pathname: "/**",
            },
        ],
    },
};

export default withNextIntl(nextConfig);

