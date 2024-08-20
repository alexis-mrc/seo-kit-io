import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { setJsonLd } from '@seo-kit-boilerplate/seok-core/json-ld';
import { updateMetatags } from '@seo-kit-boilerplate/seok-core/metatags';
import { setLang } from '@seo-kit-boilerplate/seok-core/lang';
import { metatags, lang } from './fr-home.page';
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
  selector: 'app-fr-home',
  standalone: true,
  imports: [CommonModule, ImagePresentationComponent, CatchphraseComponent, BigTitleComponent, ImagePresentationComponent, ClassicTextImageComponent, FaqComponent, PricesComponent],
  templateUrl: './fr-home.component.html',
  styleUrl: './fr-home.component.scss',
  host: { ngSkipHydration: 'true' },
})
export class FrHomeComponent {

  catchphraseData = signal<CatchphraseData>({
    "catchphrase": [
      {
        "text": "Générez du trafic organique gratuit avec sites ",
        "emphase": false
      },
      {
        "text": "optimisés",
        "emphase": true
      },
      {
        text: ' pour le SEO',
        emphase: false
      }
    ],
    "cta": {
      "link": {
        "url": "/fr/#pricing",
        "label": "Commencer"
      },
      "incentiveSentence": "Lancez votre stratégie SEO dès aujourd'hui !"
    }
  });

  setupcti = signal<ClassicTextImageData>({
    title: 'Installation et mises à jour faciles',
    subtitle:
      'Commencez rapidement en clonant le dépôt, et restez à jour sans effort.',
    overtitle: 'Installation simplissime',
    overtitlePrimary: true,
    image: {
      alt: 'Configuration facile par clonage et mises à jour simplifiées',
      link: '/setup-seo-kit.webp',
      objectFit: 'scale-down',
    },
    width: "1405",
    height: "429",
    imageFirst: false,
  });

  configurepreviewcti = signal<ClassicTextImageData>({
    title: 'Configurez et Prévisualisez Facilement',
    subtitle:
      'Utilisez notre CLI web pour configurer et prévisualiser votre application client avec aisance.',
    overtitle: 'Configuration Fluide',
    overtitlePrimary: true,
    image: {
      alt: 'Configurer et prévisualiser',
      link: '/configure-preview.webp',
      objectFit: 'scale-down',
    },
    width: "769",
    height: "304",
    imageFirst: true,
  });


  seostrategycti = signal<ClassicTextImageData>({
    title: 'Élaborez Votre Stratégie SEO',
    subtitle:
      "Suivez notre stratégie pilier/enfant pour optimiser efficacement le SEO de votre site web.",
    overtitle: 'Stratégie SEO Efficace',
    overtitlePrimary: true,
    image: {
      alt: 'Stratégie SEO',
      link: '/seo-strategy.webp',
      objectFit: 'scale-down',
    },
    width: "900",
    height: "452",
    imageFirst: false,
  });


  onclickdeploycti = signal<ClassicTextImageData>({
    title: 'Déploiement en Un Clic',
    subtitle:
      'Déployez votre site en un seul clic sur votre domaine personnalisé ou partagez un lien de prévisualisation.',
    overtitle: 'Déploiement Sans Effort',
    overtitlePrimary: true,
    image: {
      alt: 'Déploiement en un clic',
      link: '/one-click-deployment.webp',
      objectFit: 'scale-down',
    },
    width: "947",
    height: "331",
    imageFirst: true,
  });

  highperformancecti = signal<ClassicTextImageData>({
    title: 'Profitez d’une Haute Performance',
    subtitle:
      'Obtenez des scores parfaits sur PageSpeed et offrez une expérience utilisateur fluide.',
    overtitle: 'Performance Ultra-Rapide',
    overtitlePrimary: true,
    image: {
      alt: 'Performance élevée PageSpeed',
      link: '/pagespeed-seo-kit.webp',
      objectFit: 'scale-down',
    },
    width: "1856",
    height: "1058",
    imageFirst: false,
  });


  organictrafficcti = signal<ClassicTextImageData>({
    title: 'Gagnez du Trafic Organique Gratuit',
    subtitle:
      'Voyez votre trafic croître au fil du temps avec notre modèle optimisé pour le SEO.',
    overtitle: 'Croissance Organique',
    overtitlePrimary: true,
    image: {
      alt: 'Trafic organique gratuit',
      link: '/organic-traffic.webp',
      objectFit: 'scale-down',
    },
    width: "870",
    height: "310",
    imageFirst: true,
  });
  pricing = signal<BigTitleData>({
    title: 'Payez une fois et créez des projets illimités !',
    subtitle: 'Des plans abordables pour commencer avec SEO-Kit',
    overtitle: 'Offre de Lancement',
    overtitlePrimary: true,
  });


  pricingitem = signal<PricesData>({
    plans: [
      {
        name: 'Maker 🚀',
        popular: 'Tout ce dont vous avez besoin',
        prices: [
          {
            strokedValue: '149€',
            value: '99€',
            duration: 'une fois',
            offText: '50€ de réduction pendant le lancement',
          },
        ],
        features: [
          { aviable: true, label: 'Angular 18 avec optimisation des performances' },
          { aviable: true, label: 'Tailwind CSS pour un style sans effort' },
          { aviable: true, label: 'Prévisualisation et déploiement en un clic sur Firebase' },
          { aviable: true, label: 'Option de déploiement sur n’importe quel serveur' },
          { aviable: true, label: 'Structure optimisée pour le SEO' },
          { aviable: true, label: 'Génération automatique de sitemap' },
          { aviable: true, label: 'Documentation complète : personnalisation et ajout rapide de nouvelles pages pillier/enfant' },
          { aviable: true, label: 'Mises à jour régulières et fonctionnalités à venir' },
        ],
        cta: {
          link: { url: '', label: 'Bientôt disponible' },
          incentiveSentence: 'Payez une fois. Créez des projets illimités !',
        },
      },
    ],
    pricesPossibilities: [],
    pricesPossibilitiesSubtext: '',
  });

  faq1719596154289 = signal<FaqData>({
    title: 'FAQ',
    overtitle: 'VOUS AVEZ DES QUESTIONS ?',
    overtitlePrimary: true,
    items: [
      {
        question: 'Qu’est-ce que seo-kit-boilerplate ?',
        response:
          'seo-kit-boilerplate est un modèle puissant conçu pour vous aider à créer des sites web optimisés pour le SEO rapidement et efficacement en utilisant Angular 18, Tailwind CSS et Nx.',
      },
      {
        question: 'Comment commencer avec seo-kit-boilerplate ?',
        response:
          'Il vous suffit de suivre le README.md du dépôt : 9 étapes simples et vous êtes prêt à commencer à construire en moins de 15 minutes !',
      },
      {
        question: 'Puis-je déployer mon site sur n’importe quel serveur ?',
        response:
          'Oui, vous pouvez soit déployer votre site sur Firebase avec un bouton en un clic, soit obtenir les fichiers du site pour les déployer sur n’importe quel serveur.',
      },
      {
        question: 'Quelles sont les principales fonctionnalités de seo-kit-boilerplate ?',
        response:
          'Les principales fonctionnalités incluent l’utilisation d’Angular 18, Tailwind CSS, Nx, et des options de déploiement faciles pour Firebase ou tout autre serveur.',
      },
      {
        question: 'Comment puis-je configurer et prévisualiser mon application client ?',
        response:
          'Vous pouvez configurer et prévisualiser votre application client en utilisant le CLI web.',
      },
      {
        question: 'Que comprennent les fonctionnalités à venir ?',
        response:
          'Plus de composants et plus de choix de styles. Vous pouvez mettre à jour votre projet simplement avec un seul pull depuis Github.',
      },
      {
        question: 'Comment fonctionne SEO KIT ?',
        response:
          'SEO KIT fonctionne en lisant les fichiers du projet et en extrayant les données nécessaires pour les modifier facilement. Le CLI web écrase ces fichiers avec une configuration minimale requise. Votre projet fonctionne comme un projet Angular classique.',
      },
      {
        question: 'Puis-je modifier les fichiers générés par le CLI web ?',
        response:
          'Oui, vous pouvez modifier les fichiers générés par le CLI web directement, comme vous le feriez avec toute autre partie de votre projet. Cependant, il est important de noter que les fichiers xxxx.page.ts doivent conserver leur structure originale pour garantir que SEO KIT fonctionne correctement.',
      },
      {
        question: 'Quelle est la licence pour seo-kit-boilerplate ?',
        response:
          'Vous ne pouvez utiliser seo-kit-boilerplate que si vous l’avez acheté. Vous pouvez créer des sites illimités avec, mais vous ne pouvez pas revendre le modèle.',
      },
      {
        question: 'Qui puis-je contacter pour obtenir du support ?',
        response: 'Pour obtenir du support, vous pouvez contacter support@seo-kit.io.',
      },
    ],
  });


  constructor() {
    setLang(lang);
    setJsonLd();
    updateMetatags(metatags);
  }
}
