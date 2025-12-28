import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applyJsonLd, applySeoMeta } from '../utils/seo';
import { NOTES } from '../data/notes';
import { SITE_ALT_NAME, SITE_NAME } from '../data/site';

export default function NoteIndexPage() {
  useEffect(() => {
    const origin = window.location.origin;
    const canonicalUrl = `${origin}/note`;
    const title = `Note - ${SITE_NAME}（${SITE_ALT_NAME}）`;
    const description = `仮面診断（MTPA）のNote一覧。診断結果の活用方法や、日常・仕事での使い方をまとめた記事を掲載します。`;

    applySeoMeta({
      title,
      description,
      canonicalUrl,
      ogImageUrl: `${origin}/og.svg`,
    });

    applyJsonLd('jsonld-note-index', {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `${canonicalUrl}#collection`,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: 'ja-JP',
      isPartOf: {
        '@type': 'WebSite',
        '@id': `${origin}/#website`,
        name: SITE_NAME,
        url: `${origin}/`,
      },
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: NOTES.map((n, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          url: `${origin}/note/${n.slug}`,
          name: n.title,
        })),
      },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: SITE_NAME, item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'Note', item: canonicalUrl },
        ],
      },
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <header className="mb-10">
          <p className="text-sm text-slate-500 mb-3">
            <Link to="/" className="underline underline-offset-4 hover:text-slate-700">仮面診断</Link>
            {' / '}
            <span>Note</span>
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">Note</h1>
          <p className="text-slate-600 leading-relaxed">
            仮面診断（MTPA）の結果を、日常・仕事・コミュニケーションに役立てるための記事をまとめます。
          </p>
        </header>

        <section className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-5">記事一覧</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {NOTES.map((note) => (
              <Link
                key={note.slug}
                to={`/note/${note.slug}`}
                className="group block rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-md transition-all p-5"
                aria-label={`記事「${note.title}」を読む`}
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-900 text-white text-xs font-semibold">
                    Note
                  </span>
                  <span className="text-xs text-slate-500">
                    {note.updatedAt ? `更新: ${note.updatedAt}` : `公開: ${note.publishedAt}`}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:underline underline-offset-4 mb-2">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {note.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-slate-900">
                  読む →
                </p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}


