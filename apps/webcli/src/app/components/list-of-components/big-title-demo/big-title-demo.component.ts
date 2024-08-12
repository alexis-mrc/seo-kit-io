import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BigTitleComponent, BigTitleData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-big-title-demo',
  standalone: true,
    imports: [CommonModule, BigTitleComponent, ComponentCardComponent, Highlight],
  templateUrl: './big-title-demo.component.html',
  styleUrl: './big-title-demo.component.scss',
})
export class BigTitleDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  bigTitleData = signal<BigTitleData>({
    title: 'Big title Demo',
    overtitle: 'overtitle value',
    subtitle: 'subtitle value',
    overtitlePrimary: true
  });


  bigTitleTsData = computed(() => {
    return `bigTitledata = signal<BigTitleData>(${JSON.stringify(this.bigTitleData(), null, 2)});`
  });
  bigTitleHtml = signal('<seok-big-title [data]="bigTitleData()"></seok-big-title>');
  bigTitleImport = signal(
    `import {BigTitleComponent, BigTitleData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., BigTitleComponent],
  ...
})
`
  );
}
