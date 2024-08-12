import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ListOfComponentsComponent} from "../list-of-components/list-of-components.component";
import {SEO_KIT_STYLE} from "@seo-kit-boilerplate/seok-ui";

@Component({
  selector: 'app-yankees-style',
  standalone: true,
  imports: [CommonModule, ListOfComponentsComponent],
  templateUrl: './yankees-style.component.html',
  styleUrl: './yankees-style.component.scss',
  viewProviders: [
    {
      provide: SEO_KIT_STYLE, useValue: 'yankees'
    }
  ]
})
export class YankeesStyleComponent {}
