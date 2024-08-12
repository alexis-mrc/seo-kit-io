export const isExternalLink = (url: string): boolean => {
  return url.startsWith('http') || url.startsWith('https') || url.startsWith('www');
}

export const getRouterLinkFragment = (url: string | undefined): {routerLink: string; fragment?: string} => {
  if (!url) {
    return {
      routerLink: ''
    }
  }

  const splitted = url.split('#');
  if (splitted.length === 2) {
    return {
      routerLink: splitted[0],
      fragment: splitted[1]
    }
  } else {
    return {
      routerLink: url
    }
  }
}

export interface Link {
  url: string;
  label: string;
}

export interface ImgData {
  alt: string;
  link: string;
  objectFit?: string;
  caption?: string;
}

export const isLink = (data: any): data is Link => {
  return (
    typeof data === 'object' &&
    data !== null &&
    typeof data.url === 'string' &&
    typeof data.label === 'string'
  );
}
