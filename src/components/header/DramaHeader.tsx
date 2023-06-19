import { DefaultSeoHeader } from 'components/header';

export function DramaHeader() {
  const pageTitle = '드라마 | 서플릭스';

  return (
    <DefaultSeoHeader>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />
    </DefaultSeoHeader>
  );
}
