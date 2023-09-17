import type { Site } from "lume/core.ts";

/**
 * Includes the filters:
 *   - `peekHtml` for generating a text extract from HTML
 *   - `repeat`, a loop with extra features
 */
export default () => {
  return (site: Site) => {
    site.filter("sortSemVer", sortSemVer);
    site.filter("compareSemVer", compareSemVer);
  };
};

export function sortSemVer<T = string>(
  arr: T[],
  mapper: (t: T) => string = String,
) {
  return arr.sort((a, b) => compareSemVer(mapper(a), mapper(b)));
}

export function compareSemVer(a: string, b: string) {
  // intentionally lax regex
  const svre = /^v?(\d+)\.(\d+)\.(\d+)(-[^\+]*)?/;
  const digitsre = /^\d+$/;
  const [, aMajor, aMinor, aPatch, aPrerelease] = svre.exec(a)!;
  const [, bMajor, bMinor, bPatch, bPrerelease] = svre.exec(b)!;
  const aPrerelTags = aPrerelease?.split(".") ?? [];
  const bPrerelTags = bPrerelease?.split(".") ?? [];

  let cmp = Number(aMajor) - Number(bMajor);
  if (cmp === 0) cmp = Number(aMinor) - Number(bMinor);
  if (cmp === 0) cmp = Number(aPatch) - Number(bPatch);
  if (cmp === 0) {
    if (aPrerelTags.length === 0 && bPrerelTags.length > 0) cmp = 1;
    else if (aPrerelTags.length > 0 && bPrerelTags.length === 0) cmp = -1;
    else cmp = aPrerelTags.length - bPrerelTags.length;
  }
  while (cmp === 0) {
    const aPrerelTag = aPrerelTags.shift();
    const bPrerelTag = bPrerelTags.shift();
    if (!aPrerelTag || !bPrerelTag) break;
    if (digitsre.test(aPrerelTag) && digitsre.test(bPrerelTag)) {
      cmp = Number(aPrerelTag) - Number(bPrerelTag);
    } else {
      cmp = aPrerelTag.localeCompare(bPrerelTag);
    }
  }
  return cmp;
}
