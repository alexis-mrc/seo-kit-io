export interface VideoPresentationData {
  type: 'autoplay' | 'loop' | 'default';
  poster?: string;
  link: string;
  widthClass: string;
}
