import {Component, inject, input} from '@angular/core';
import {NgClass} from "@angular/common";
import { BigTitleData } from './big-title.model';
import { SEO_KIT_STYLE, SeoKitStyle } from '../template-style.model';

@Component({
  selector: 'seok-big-title',
  standalone: true,
  imports: [NgClass],
  templateUrl: './big-title.component.html',
  styleUrl: './big-title.component.scss'
})
export class BigTitleComponent {

  SeoKitStyle: SeoKitStyle = inject<SeoKitStyle>(SEO_KIT_STYLE);

  data = input.required<BigTitleData>();
}
