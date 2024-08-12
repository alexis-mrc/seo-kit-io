import {Component, inject, input} from '@angular/core';
import {NgClass} from "@angular/common";
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';
import { FaqData } from './faq.model';

@Component({
  selector: 'seok-faq',
  standalone: true,
  imports: [NgClass],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss'
})
export class FaqComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<FaqData>();
}
