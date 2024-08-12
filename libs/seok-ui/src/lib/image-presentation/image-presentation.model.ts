import { ImgData } from '../seok-ui.utils';

export interface ImagePresentationData {
  img: ImgData;
  width?: string;
  height?: string;
  loading?: 'lazy' | 'eager' | 'auto';
  priority?: boolean;
}
