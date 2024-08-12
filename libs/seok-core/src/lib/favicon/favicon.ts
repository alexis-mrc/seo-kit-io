import {inject} from "@angular/core";
import {DOCUMENT} from "@angular/common";

export const setFavicon = (faviconFileName: string) => {
  if (!faviconFileName) {
    return;
  }

  const extension = faviconFileName.split('.').pop()?.toLowerCase();
  let mimeType;

  switch (extension) {
    case 'png':
      mimeType = 'image/png';
      break;
    case 'jpg':
    case 'jpeg':
      mimeType = 'image/jpeg';
      break;
    case 'ico':
      mimeType = 'image/x-icon';
      break;
    case 'svg':
      mimeType = 'image/svg+xml';
      break;
    case 'gif':
      mimeType = 'image/gif';
      break;
    case 'webp':
      mimeType = 'image/webp';
      break;
    default:
      throw new Error('Unsupported file extension');
  }

  const document = inject(DOCUMENT);
  const linkElement = document.createElement('link');
  linkElement.rel = 'icon';
  linkElement.type = mimeType;
  linkElement.href = `/${faviconFileName}`;

  const head = document.head;
  const existingLink = head.querySelector('link[rel="icon"]');

  if (existingLink) {
    head.removeChild(existingLink);
  }

  head.appendChild(linkElement);
}
