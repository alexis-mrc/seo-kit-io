import { CallToActionData } from '../call-to-action/call-to-action.model';

export interface CatchphraseElement {
  text: string;
  emphase: boolean;
}

export interface CatchphraseData {
  catchphrase: CatchphraseElement[];
  cta: CallToActionData | undefined;
}
