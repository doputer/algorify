import useSiteMetadata from '@/hooks/useSiteMetadata';

interface SEOProps {
  title?: string;
  description?: string;
}

function SEO({ title = 'Algorify', description = 'Algorithm Visualization' }: SEOProps) {
  const seo = useSiteMetadata();

  return (
    <>
      <html lang="ko" />
      <title>{title || seo.title}</title>
      <meta name="description" content={description || seo.description} />
    </>
  );
}

export default SEO;
