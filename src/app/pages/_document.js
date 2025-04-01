import Document, { Html, Head, Main, NextScript } from 'next/document';
import { NextSeo } from 'next-seo';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <NextSeo
            title="Star Hotel - Best Dining Experience"
            description="Discover the best food, fresh and organic meals delivered to your door with Star Hotel."
            canonical="https://star-hotel-seven.vercel.app"
            openGraph={{
              url: 'https://star-hotel-seven.vercel.app',
              title: 'Star Hotel - Best Dining Experience',
              description: 'Order fresh, organic food delivered to your door from Star Hotel.',
              images: [
                {
                  url: '/images/dining.png',
                  alt: 'Star Hotel Dining Experience',
                  width: 800,
                  height: 600,
                },
              ],
            }}
            twitter={{
              handle: '@starhotel',
              site: '@starhotel',
              cardType: 'summary_large_image',
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
