import {ChangeDetectionStrategy, Component, computed, inject, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { CatchphraseData } from './catchphrase.model';
import { CallToActionComponent } from '../call-to-action/call-to-action.component';
import { getRouterLinkFragment, isExternalLink } from '../seok-ui.utils';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'seok-catchphrase',
  standalone: true,
  imports: [RouterLink, NgClass, CallToActionComponent],
  templateUrl: './catchphrase.component.html',
  styleUrl: './catchphrase.component.scss'
})
export class CatchphraseComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<CatchphraseData>();

  urlData = computed(() => getRouterLinkFragment(this.data()?.cta?.link?.url));

  protected readonly isExternalLink = isExternalLink;
}
