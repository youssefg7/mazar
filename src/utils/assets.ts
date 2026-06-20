const EXTERNAL_LINK_PATTERN = /^[a-z][a-z0-9+.-]*:/i;

export function resolvePublicPath(path: string, basePath: string): string {
  if (!path || EXTERNAL_LINK_PATTERN.test(path) || path.startsWith("#")) {
    return path;
  }

  const cleanBase = basePath.endsWith("/") ? basePath : `${basePath}/`;
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  return `${cleanBase}${cleanPath}`.replace(/([^:]\/)\/+/g, "$1");
}

export function publicAsset(path: string): string {
  return resolvePublicPath(path, import.meta.env.BASE_URL);
}
