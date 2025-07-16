import {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
 
const nextConfig: NextConfig = {
  basePath: '/ats', 
};
 
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);