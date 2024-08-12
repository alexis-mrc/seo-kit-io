import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './home.page';
import {
  ImagePresentationComponent,
  CatchphraseData,
  CatchphraseComponent,
  BigTitleComponent,
  ClassicTextImageComponent,
  FaqComponent,
  PricesComponent,
  ClassicTextImageData,
  BigTitleData,
  PricesData, FaqData
} from '@seo-kit-boilerplate/seok-ui';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent, CatchphraseComponent, BigTitleComponent, ImagePresentationComponent, ClassicTextImageComponent, FaqComponent, PricesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class HomeComponent {

  catchphraseData = signal<CatchphraseData>({
    "catchphrase": [
      {
        "text": "Get free organic traffic with ",
        "emphase": false
      },
      {
        "text": "SEO-optimized",
        "emphase": true
      },
      {
        "text": " websites",
        "emphase": false
      }
    ],
    "cta": {
      "link": {
        "url": "/",
        "label": "Get started"
      },
      "incentiveSentence": "launch your SEO strategy today!"
    }
  });

  setupcti = signal<ClassicTextImageData>({
    title: 'Easy Setup and Updates',
    subtitle:
      'Get started quickly by cloning the repository, and stay up-to-date effortlessly.',
    overtitle: 'Hassle-Free Setup',
    overtitlePrimary: true,
    image: {
      alt: 'Easy setup by cloning and updates',
      link: '/setup-seo-kit.webp',
      objectFit: 'scale-down',
    },
    imageFirst: false,
  });

  configurepreviewcti = signal<ClassicTextImageData>({
    title: 'Configure and Preview Easily',
    subtitle:
      'Use our web CLI to configure and preview your client app with ease.',
    overtitle: 'Seamless Configuration',
    overtitlePrimary: true,
    image: {
      alt: 'Configure and preview',
      link: '/configure-preview.webp',
      objectFit: 'scale-down',
    },
    imageFirst: true,
  });

  seostrategycti = signal<ClassicTextImageData>({
    title: 'Build Your SEO Strategy',
    subtitle:
      "Follow our pillar/child strategy to optimize your website's SEO effectively.",
    overtitle: 'Effective SEO Strategy',
    overtitlePrimary: true,
    image: {
      alt: 'SEO strategy',
      link: '/seo-strategy.webp',
      objectFit: 'scale-down',
    },
    imageFirst: false,
  });

  onclickdeploycti = signal<ClassicTextImageData>({
    title: 'One-Click Deployment',
    subtitle:
      'Deploy your site with a single click to your custom domain, or share a preview link.',
    overtitle: 'Effortless Deployment',
    overtitlePrimary: true,
    image: {
      alt: 'One-click deployment',
      link: '/one-click-deployment.webp',
      objectFit: 'scale-down',

    },
    imageFirst: true,
  });

  highperformancecti = signal<ClassicTextImageData>({
    title: 'Enjoy High Performance',
    subtitle:
      'Achieve perfect PageSpeed scores and deliver a seamless user experience.',
    overtitle: 'Blazing Fast Performance',
    overtitlePrimary: true,
    image: {
      alt: 'High performance pagespeed',
      link: '/pagespeed-seo-kit.webp',
      objectFit: 'scale-down',
    },
    imageFirst: false,
  });

  organictrafficcti = signal<ClassicTextImageData>({
    title: 'Gain Free Organic Traffic',
    subtitle:
      'Watch your traffic grow over time with our SEO-optimized boilerplate.',
    overtitle: 'Organic Growth',
    overtitlePrimary: true,
    image: {
      alt: 'Free organic traffic',
      link: '/organic-traffic.webp',
      objectFit: 'scale-down',
    },
    imageFirst: true,
  });

  pricing = signal<BigTitleData>({
    title: 'Pay once and Build unlimited projects!',
    subtitle: 'Affordable plans to get you started with seo-kit',
    overtitle: 'Launch Offer',
    overtitlePrimary: true,
  });

  pricingitem = signal<PricesData>({
    plans: [
      {
        name: 'Solo 💪',
        popular: '',
        prices: [
          {
            strokedValue: '149€',
            value: '99€',
            duration: 'once',
            offText: '50€ off during launching',
          },
        ],
        features: [
          {
            aviable: true,
            label: 'Built with Angular 18 with performance optimization',
          },
          { aviable: true, label: 'Tailwind CSS for effortless styling' },
          {
            aviable: true,
            label: 'Nx for scalable and maintainable structure',
          },
          { aviable: true, label: 'One-click deployment to Firebase' },
          { aviable: true, label: 'Preview deployment with Firebase' },
          { aviable: true, label: 'Option to deploy on any server' },
          { aviable: true, label: 'SEO-optimized structure' },
          { aviable: true, label: 'Web CLI for configuration and preview' },
          { aviable: true, label: 'Automatic sitemap generation' },
          { aviable: true, label: 'Extensive documentation' },
          { aviable: true, label: 'Regular updates and upcoming features' },
          {
            aviable: false,
            label: 'Guide for building pillar page/child page strategy',
          },
          { aviable: false, label: 'Discord community' },
        ],
        cta: {
          link: { url: '', label: 'Coming soon' },
          incentiveSentence: 'Pay once. Build unlimited projects!',
        },
      },
      {
        name: 'Maker 🚀',
        popular: 'Everything you needed',
        prices: [
          {
            strokedValue: '179€',
            value: '119€',
            duration: 'once',
            offText: '50€ off during launching',
          },
        ],
        features: [
          {
            aviable: true,
            label: 'Built with Angular 18 with performance optimization',
          },
          { aviable: true, label: 'Tailwind CSS for effortless styling' },
          {
            aviable: true,
            label: 'Nx for scalable and maintainable structure',
          },
          { aviable: true, label: 'One-click deployment to Firebase' },
          { aviable: true, label: 'Preview deployment with Firebase' },
          { aviable: true, label: 'Option to deploy on any server' },
          { aviable: true, label: 'SEO-optimized structure' },
          { aviable: true, label: 'Web CLI for configuration and preview' },
          { aviable: true, label: 'Automatic sitemap generation' },
          { aviable: true, label: 'Extensive documentation' },
          { aviable: true, label: 'Regular updates and upcoming features' },
          {
            aviable: true,
            label: 'Guide for building pillar page/child page strategy',
          },
          { aviable: true, label: 'Discord community' },
        ],
        cta: {
          link: { url: '', label: 'Coming soon' },
          incentiveSentence: 'Pay once. Build unlimited projects!',
        },
      },
    ],
    pricesPossibilities: [],
    pricesPossibilitiesSubtext: '',
  });

  faq1719596154289 = signal<FaqData>({
    title: 'Frequently Asked Questions',
    overtitle: 'HAVE QUESTIONS?',
    overtitlePrimary: true,
    items: [
      {
        question: 'What is seo-kit-boilerplate?',
        response:
          'seo-kit-boilerplate is a powerful boilerplate designed to help you build SEO-optimized websites quickly and efficiently using Angular 18, Tailwind CSS, and Nx.',
      },
      {
        question: 'How do I get started with seo-kit-boilerplate?',
        response:
          'First, clone the repository from GitHub, install the dependencies using npm install, and start the web CLI with npm start.',
      },
      {
        question: 'Can I deploy my site on any server?',
        response:
          'Yes, you can either deploy your site on Firebase with a one-click button or get the site files to deploy on any server.',
      },
      {
        question: 'What are the main features of seo-kit-boilerplate?',
        response:
          'The main features include using Angular 18, Tailwind CSS, Nx, and easy deployment options for Firebase or any server.',
      },
      {
        question: 'What is the project structure of seo-kit-boilerplate?',
        response:
          'The project includes apps/client-app, apps/webcli-app, seok-config-files, libs/seok-sdk, libs/seok-ui, and sitemap logic.',
      },
      {
        question: 'How can I configure and preview my client app?',
        response:
          'You can configure and preview your client app using the web CLI.',
      },
      {
        question: 'What is included in the upcoming features?',
        response:
          "Upcoming features include an SEO Guide to build your pillar page/child page strategy and a Technical Guide explaining how to improve an Angular app's SEO.",
      },
      {
        question: 'Can I edit the files generated by the web CLI and seok-sdk?',
        response:
          'Files in the src/generated directory should not be edited as they may be overwritten. You can edit files in the src/app directory, but some changes may affect the functionality provided by the web CLI.',
      },
      {
        question: 'What is the license for seo-kit-boilerplate?',
        response:
          'You can only use seo-kit-boilerplate if you have purchased it. You can build unlimited sites with it, but you cannot resell the boilerplate.',
      },
      {
        question: 'Who can I contact for support?',
        response: 'For support, you can contact at support@seo-kit.io.',
      },
    ],
  });

  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
