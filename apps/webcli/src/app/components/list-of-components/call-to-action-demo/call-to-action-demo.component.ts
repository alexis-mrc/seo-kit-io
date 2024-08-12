import {Component, computed, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CallToActionComponent, CallToActionData} from "@seo-kit-boilerplate/seok-ui";
import {ComponentCardComponent} from "../component-card/component-card.component";
import {Highlight} from "ngx-highlightjs";

@Component({
  selector: 'app-call-to-action-demo',
  standalone: true,
    imports: [CommonModule, CallToActionComponent, ComponentCardComponent, Highlight],
  templateUrl: './call-to-action-demo.component.html',
  styleUrl: './call-to-action-demo.component.scss',
})
export class CallToActionDemoComponent {

  copy(copyText: string) {
    navigator.clipboard.writeText(copyText).then(function() {
      console.log('Copied to clipboard successfully!');
    });
  }

  showPreview = signal<boolean>(true);

  callToActionData = signal<CallToActionData>({
    link: {
      url: 'https://example.com',
      label: 'CTA Link'
    },
    incentiveSentence: 'Under sentence !'
  });


  callToActionTsData = computed(() => {
    return `callToActionData = signal<BigTitleData>(${JSON.stringify(this.callToActionData(), null, 2)});`
  });
  callToActionHtml = signal('<seok-call-to-action [data]="callToActionData()"></seok-call-to-action>');
  callToActionImport = signal(
    `import {CallToActionComponent, CallToActionData} from "@seo-kit-boilerplate/seok-ui";

    ...

@Component({
  ...
  imports: [..., CallToActionComponent],
  ...
})
`
  );
}
