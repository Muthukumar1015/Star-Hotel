// pages/_app.js

import { DefaultSeo } from 'next-seo';  // Import DefaultSeo from next-seo
import seoConfig from '../next-seo.config';  // Import your global SEO config
import '../styles/globals.css';  // Global styles for the application

function MyApp({ Component, pageProps }) {
  return (
    <>
      {/* Apply default global SEO settings */}
      <DefaultSeo {...seoConfig} />
      {/* Render the current page */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
