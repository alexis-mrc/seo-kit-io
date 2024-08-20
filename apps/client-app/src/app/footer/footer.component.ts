import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import { Link, SEO_KIT_STYLE, SeoKitStyle } from '@seo-kit-boilerplate/seok-ui';
import {seokContactEmail} from "@seo-kit-boilerplate/seok-generated/settings";
import { LangService } from '@seo-kit-boilerplate/seok-core/lang';
import { url as LegalNoticeUrl } from '../pages/legal-notice/legal-notice.page';
import { url as PrivacyUrl } from '../pages/privacy/privacy.page';
import { url as ToSUrl } from '../pages/terms-of-service/terms-of-service.page';
import { url as FrLegalNoticeUrl } from '../pages/fr-legal-notice/fr-legal-notice.page';
import { url as FrPrivacyUrl } from '../pages/fr-privacy/fr-privacy.page';
import { url as FrToSUrl } from '../pages/fr-terms-of-service/fr-terms-of-service.page';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  mail =signal<string>(seokContactEmail)

  linksByLang: Record<string, Link[]> = {
    'en': [
      {url: ToSUrl, label: 'Terms of Service'},
      {url: LegalNoticeUrl, label: 'Legal Notice'},
      {url: PrivacyUrl, label: 'Privacy'},
    ],
    'fr': [
      {url: FrToSUrl, label: 'CGU/CGV'},
      {url: FrLegalNoticeUrl, label: 'Mentions Légales'},
      {url: FrPrivacyUrl, label: 'Charte du respect de la vie privée'},
    ],
  };

  lang = inject(LangService).lang;
  links = computed(() => {
    const lang = this.lang();
    return this.linksByLang[lang] ?? [];
  });
}
