import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfComponentsComponent} from "../list-of-components/list-of-components.component";
import {SEO_KIT_STYLE} from "@seo-kit-boilerplate/seok-ui";

@Component({
  selector: 'app-default-style',
  standalone: true,
  imports: [CommonModule, ListOfComponentsComponent],
  templateUrl: './default-style.component.html',
  styleUrl: './default-style.component.scss',
  viewProviders: [
    {
      provide: SEO_KIT_STYLE, useValue: 'default'
    }
  ]
})
export class DefaultStyleComponent {}
