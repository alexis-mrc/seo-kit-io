import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CatchphraseComponent, CatchphraseData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-catchphrase-demo',
  standalone: true,
    imports: [CommonModule, CatchphraseComponent, ComponentCardComponent, Highlight],
  templateUrl: './catchphrase-demo.component.html',
  styleUrl: './catchphrase-demo.component.scss',
})
export class CatchphraseDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  catchphraseData = signal<CatchphraseData>({
    "catchphrase": [
      {
        "text": "This is a ",
        "emphase": false
      },
      {
        "text": "new",
        "emphase": true
      },
      {
        "text": " catchphrase",
        "emphase": false
      }
    ],
    "cta": {
      "link": {
        "url": "/",
        "label": "With a home button"
      },
      "incentiveSentence": "And an Incentive sentence"
    }
  });


  catchphraseTsData = computed(() => {
    return `catchphraseData = signal<CatchphraseData>(${JSON.stringify(this.catchphraseData(), null, 2)});`
  });
  catchphraseHtml = signal('<seok-catchphrase [data]="catchphraseData()"></seok-catchphrase>');
  catchphraseImport = signal(
    `import {CatchphraseComponent, CatchphraseData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., CatchphraseComponent],
  ...
})
`
  );
}
