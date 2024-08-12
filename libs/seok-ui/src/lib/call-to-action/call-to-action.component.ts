import {Component, computed, inject, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { CallToActionData } from './call-to-action.model';
import { getRouterLinkFragment, isExternalLink } from '../seok-ui.utils';

@Component({
  selector: 'seok-call-to-action',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './call-to-action.component.html',
  styleUrl: './call-to-action.component.scss'
})
export class CallToActionComponent {


  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<CallToActionData>();

  urlData = computed(() => getRouterLinkFragment(this.data()?.link?.url));

  protected readonly isExternalLink = isExternalLink;
}
