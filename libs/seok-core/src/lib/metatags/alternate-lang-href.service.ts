import { afterNextRender, DestroyRef, ElementRef, inject, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

export const addAlternateLangHref = (lang: string, absoluteHref: string) => {
  const document = inject(DOCUMENT)
  const destroyRef = inject(DestroyRef);
  const renderer = inject(Renderer2);

  const linkAlternate = document.createElement('link');
  linkAlternate.href = absoluteHref;
  linkAlternate.hreflang = lang;
  linkAlternate.rel = 'alternate';

  // Used to remove alternate from SSG that don't listen to onDestroy
  const links = document.querySelectorAll(`link[rel="alternate"][hreflang="${lang}"][href="${absoluteHref}"]`);
  for (const link of links) {
    renderer.removeChild(document.head, link);
  }

  renderer.appendChild(document.head, linkAlternate);

  destroyRef.onDestroy(() => {
    renderer.removeChild(document.head, linkAlternate);
  })
}
