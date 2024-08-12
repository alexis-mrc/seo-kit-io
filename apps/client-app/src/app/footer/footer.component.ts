import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import { Link, SEO_KIT_STYLE, SeoKitStyle } from '@seo-kit-boilerplate/seok-ui';
import {seokContactEmail} from "@seo-kit-boilerplate/seok-generated/settings";
import { LangService } from '@seo-kit-boilerplate/seok-core/lang';
import { url as ExamplePillarUrl } from '../pages/example-pillar/example-pillar.page';

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
      {url: ExamplePillarUrl, label: 'Example Pillar'},
    ]
  };

  lang = inject(LangService).lang;
  links = computed(() => {
    const lang = this.lang();
    return this.linksByLang[lang] ?? [];
  });
}
