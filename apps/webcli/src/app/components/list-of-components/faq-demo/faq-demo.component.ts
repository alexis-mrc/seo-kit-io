import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FaqComponent, FaqData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-faq-demo',
  standalone: true,
    imports: [CommonModule, FaqComponent, ComponentCardComponent, Highlight],
  templateUrl: './faq-demo.component.html',
  styleUrl: './faq-demo.component.scss',
})
export class FaqDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  faqData = signal<FaqData>( {
    "title": "Got a question ?",
    "overtitle": "DON'T WORRY",
    "overtitlePrimary": true,
    "items": [
      {
        "question": "How to add a question ?",
        "response": "Add more object in the items"
      },
      {
        "question": "What is the format of an item ?",
        "response": "{question: string, response: string}"
      }
    ]
  });


  faqTsData = computed(() => {
    return `faqData = signal<CatchphraseData>(${JSON.stringify(this.faqData(), null, 2)});`
  });
  faqHtml = signal('<seok-faq [data]="faqData()"></seok-faq>');
  faqImport = signal(
    `import {FaqComponent, FaqData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., FaqComponent],
  ...
})
`
  );
}
