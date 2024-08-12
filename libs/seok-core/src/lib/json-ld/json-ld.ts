import {
  ChangeDetectorRef,
  ElementRef,
  inject
} from '@angular/core';
import {JsonLdData} from "./json-ld.data";
import {DOCUMENT} from "@angular/common";


export const setJsonLd = (specificJsonLd?: Object) => {
  const elRef = inject(ElementRef);

  const jsonLd = specificJsonLd ? {...JsonLdData, ...specificJsonLd} : JsonLdData;

  const json = JSON.stringify(jsonLd).replace(/<\/script>/g, '<\\/script>');
  const scriptElement = inject(DOCUMENT).createElement('script');
  scriptElement.type = 'application/ld+json';
  scriptElement.innerHTML = json;
  elRef.nativeElement.appendChild(scriptElement);
}
