import { ImgData } from '../seok-ui.utils';

export interface ClassicTextImageData {
  title: string;
  subtitle?: string;
  overtitle?: string;
  overtitlePrimary: boolean;

  image: ImgData;

  imageFirst: boolean;
}
