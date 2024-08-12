import { ImgData } from '../seok-ui.utils';

export interface ClassicTextImageData {
  title: string;
  subtitle?: string;
  overtitle?: string;
  overtitlePrimary: boolean;

  image: ImgData;
  width?: string;
  height?: string;

  imageFirst: boolean;
}
