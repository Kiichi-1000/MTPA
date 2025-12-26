export interface SeoMetaInput {
  title: string;
  description: string;
  /**
   * Absolute URL recommended (e.g. https://example.com/path).
   * If omitted, will default to current location.href in browser.
   */
  canonicalUrl?: string;
  ogImageUrl?: string;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

function getOrCreateMetaByName(name: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[name="${CSS.escape(name)}"]`) as HTMLMetaElement | null;
  if (existing) return existing;
  const meta = document.createElement('meta');
  meta.setAttribute('name', name);
  document.head.appendChild(meta);
  return meta;
}

function getOrCreateMetaByProperty(property: string): HTMLMetaElement {
  const existing = document.querySelector(`meta[property="${CSS.escape(property)}"]`) as HTMLMetaElement | null;
  if (existing) return existing;
  const meta = document.createElement('meta');
  meta.setAttribute('property', property);
  document.head.appendChild(meta);
  return meta;
}

function getOrCreateLink(rel: string): HTMLLinkElement {
  const existing = document.querySelector(`link[rel="${CSS.escape(rel)}"]`) as HTMLLinkElement | null;
  if (existing) return existing;
  const link = document.createElement('link');
  link.setAttribute('rel', rel);
  document.head.appendChild(link);
  return link;
}

export function applySeoMeta(input: SeoMetaInput) {
  if (!isBrowser()) return;

  const canonicalUrl = input.canonicalUrl ?? window.location.href;
  const ogImageUrl =
    input.ogImageUrl ??
    // Fallback to existing meta if present; otherwise use current origin (safe default).
    (document.querySelector('meta[property="og:image"]')?.getAttribute('content') ?? `${window.location.origin}/og.svg`);

  document.title = input.title;

  getOrCreateMetaByName('description').setAttribute('content', input.description);

  // canonical
  getOrCreateLink('canonical').setAttribute('href', canonicalUrl);

  // Open Graph
  getOrCreateMetaByProperty('og:title').setAttribute('content', input.title);
  getOrCreateMetaByProperty('og:description').setAttribute('content', input.description);
  getOrCreateMetaByProperty('og:url').setAttribute('content', canonicalUrl);
  getOrCreateMetaByProperty('og:image').setAttribute('content', ogImageUrl);

  // Twitter
  getOrCreateMetaByName('twitter:title').setAttribute('content', input.title);
  getOrCreateMetaByName('twitter:description').setAttribute('content', input.description);
  getOrCreateMetaByName('twitter:image').setAttribute('content', ogImageUrl);
}

export type JsonLd = Record<string, unknown> | Array<Record<string, unknown>>;

function getOrCreateJsonLdScript(id: string): HTMLScriptElement {
  const existing = document.getElementById(id) as HTMLScriptElement | null;
  if (existing && existing.tagName.toLowerCase() === 'script') return existing;

  if (existing) {
    // If id is already used by non-script element, do nothing to avoid breaking DOM.
    return existing as unknown as HTMLScriptElement;
  }

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  document.head.appendChild(script);
  return script;
}

export function applyJsonLd(id: string, data: JsonLd) {
  if (!isBrowser()) return;
  const script = getOrCreateJsonLdScript(id);
  // Use textContent to avoid HTML parsing.
  script.textContent = JSON.stringify(data);
}

export function removeJsonLd(id: string) {
  if (!isBrowser()) return;
  const el = document.getElementById(id);
  if (el && el.tagName.toLowerCase() === 'script') {
    el.remove();
  }
}


