import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  basePath: '/ats', 
  assetPrefix: '/ats',
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);