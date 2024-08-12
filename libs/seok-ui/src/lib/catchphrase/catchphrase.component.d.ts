import { TemplateStyle } from "@seo-kit/homepage/models/app.model";
import { CatchphraseData } from "@seo-kit/homepage/models/catchphrase.model";
export declare class CatchphraseComponent {
    templateStyle: TemplateStyle;
    data: import("@angular/core").InputSignal<CatchphraseData>;
    protected readonly isExternalLink: (url: string) => boolean;
}
