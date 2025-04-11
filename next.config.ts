import type { NextConfig } from "next";
import nextIntl from 'next-intl/plugin';

// 🔧 ใช้ plugin wrap config
const withNextIntl = nextIntl();

const nextConfig: NextConfig = {
  // Your Next.js config here (ถ้ามี)
};

export default withNextIntl(nextConfig);
