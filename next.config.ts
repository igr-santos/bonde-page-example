import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
  // StrictMode aplicado por padrão em desenvolvimento, faz
  // com que métodos useEffect e useEffectLayout sejam aplicados 2x
  // reactStrictMode: false
};

export default withNextIntl(nextConfig);
