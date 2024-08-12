export const removeTrailingSlashes = (url: string) => {
  if (!url) {
    return '';
  }

  return url.replace(/\/+$/, "");
}
