export interface FaqData {

  title: string;
  overtitle: string;
  overtitlePrimary: boolean;

  items: FaqItem[];
}

export interface FaqItem {
  question: string;
  response: string;
}
