/** Build-time mount path for a static host, e.g. /busines-card on GitHub Pages. */
export function basePath(value = ""): string {
  if (!value || value === "/") return "";
  if (!/^\/[a-zA-Z0-9_-]+(?:\/[a-zA-Z0-9_-]+)*$/.test(value)) {
    throw new Error("NEXT_PUBLIC_BASE_PATH must be a path such as /busines-card, without a trailing slash.");
  }
  return value;
}

export function assetPath(path: string, mount = process.env.NEXT_PUBLIC_BASE_PATH ?? ""): string {
  if (!path.startsWith("/") || path.startsWith("//")) throw new Error("Public assets must use a root-relative path.");
  return `${basePath(mount)}${path}`;
}
