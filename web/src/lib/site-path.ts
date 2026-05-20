const RAW_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH?.trim() || '';

export const BASE_PATH = RAW_BASE_PATH
  ? `/${RAW_BASE_PATH.replace(/^\/+|\/+$/g, '')}`
  : '';

export function withBasePath(path: string): string {
  if (!path || path === '/') {
    return BASE_PATH || '/';
  }

  if (/^(https?:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }

  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${normalized}`;
}

export function withAssetPath(path: string): string {
  return withBasePath(path.startsWith('/') ? path : `/${path}`);
}

export function normalizeAppPath(pathname: string): string {
  let normalized = pathname.toLowerCase();

  if (BASE_PATH && normalized.startsWith(BASE_PATH.toLowerCase())) {
    normalized = normalized.slice(BASE_PATH.length) || '/';
  }

  const localeMatch = normalized.match(/^\/(zh|en)(\/|$)/);
  if (!localeMatch) {
    return normalized || '/';
  }

  const stripped = normalized.replace(/^\/(zh|en)/, '');
  return stripped || '/';
}