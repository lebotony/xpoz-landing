import { Helmet } from 'react-helmet';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  url?: string;
}

export const SEO = ({
  title = 'XPOZ.ME - Adult Content Platform | OnlyFans Alternative for Creators & Fans',
  description = 'Join XPOZ.ME, the ultimate adult content platform where creators share exclusive nudes, porn videos, and intimate content. Subscribe to your favorite models, access premium NSFW content, and connect with the hottest creators. Better than OnlyFans with lower fees and more freedom.',
  keywords = 'onlyfans, onlyfans alternative, adult content, nsfw, porn, nudes, xxx, adult videos, sexy content, premium porn, exclusive content, adult creators, porn platform, nude models, sexy girls, hot content, adult entertainment, xxx videos, porn site, nude content, sexy videos, adult subscription, 18+ content, erotic content, spicy content, uncensored content, nude photos, porn videos, adult platform, sexy platform, horny, naughty content, adult models, cam girls, sexy creators, nude creators, premium nudes, exclusive porn, fan platform, creator platform, monetize content, adult monetization, sell nudes, sell porn, adult income, creator income',
  ogImage = 'https://xpoz.me/og-image.jpg',
  url = 'https://xpoz.me',
}: SEOProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'XPOZ.ME',
    alternateName: 'XPOZ - Adult Content Platform',
    url: url,
    description: description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${url}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': 'Organization',
      name: 'XPOZ.ME',
      logo: {
        '@type': 'ImageObject',
        url: `${url}/logo.png`,
      },
    },
    audience: {
      '@type': 'PeopleAudience',
      suggestedMinAge: 18,
    },
  };

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'XPOZ.ME',
    url: url,
    logo: `${url}/logo.png`,
    description: description,
    sameAs: [
      'https://twitter.com/xpozme',
      'https://t.me/xpozme',
      'https://whatsapp.com/channel/xpozme',
    ],
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="XPOZ.ME" />
      <meta name="rating" content="adult" />
      <meta name="content-rating" content="adult" />

      {/* Age Restriction */}
      <meta name="age-restriction" content="18+" />
      <meta name="audience" content="adult" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="XPOZ.ME" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta name="twitter:site" content="@xpozme" />
      <meta name="twitter:creator" content="@xpozme" />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Language */}
      <meta httpEquiv="content-language" content="en-US" />
      <link rel="alternate" hrefLang="en" href={url} />

      {/* Mobile Optimization */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

      {/* Theme Color */}
      <meta name="theme-color" content="#FF4458" />
      <meta name="msapplication-TileColor" content="#FF4458" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationData)}
      </script>
    </Helmet>
  );
};
