import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestimoniesComponent, TestimonialData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-testimonies-demo',
  standalone: true,
    imports: [CommonModule, TestimoniesComponent, ComponentCardComponent, Highlight],
  templateUrl: './testimonies-demo.component.html',
  styleUrl: './testimonies-demo.component.scss',
})
export class TestimoniesDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  testimoniesData = signal<TestimonialData[]>( [
    {
      photo: '/logo-seo-kit.svg',
      name: 'John Doe',
      moreInfo: 'Dev',
      quote: 'SEO Kit is really great !',
      source: 'https://wikipedia.com'
    },
    {
      name: 'Alex',
      quote: 'I love using SEO Kit to build all my Saas product. I manage to build a nice webstite optimized for SEO on most of my Saas !',
    }
  ]);


  testimoniesTsData = computed(() => {
    return `testimoniesData = signal<TestimonialData[]>(${JSON.stringify(this.testimoniesData(), null, 2)});`
  });
  testimoniesHtml = signal('<seok-testimonies [data]="testimoniesData()"></seok-testimonies>');
  testimoniesImport = signal(
    `import {TestimoniesComponent, TestimonialData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., TestimoniesComponent],
  ...
})
`
  );
}
