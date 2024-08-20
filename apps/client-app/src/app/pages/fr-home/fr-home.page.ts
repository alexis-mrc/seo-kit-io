import { SeokPageState } from '@seo-kit-boilerplate/seok-core/pages';
import { Metatags } from '@seo-kit-boilerplate/seok-core/metatags';
export const id = "fr-home";
export const url = "fr";
export const lang = "fr";
export const state: SeokPageState = "published";
export const metatags: Metatags = {
    title: "SEO KIT : une strat\u00E9gie SEO efficace et rapide \u00E0 mettre en place",
    description: "D\u00E9couvrez le SEO-Kit-Boilerplate pour cr\u00E9er des sites web optimis\u00E9s pour le SEO sans effort. D\u00E9ployez en toute simplicit\u00E9. Commencez d\u00E8s aujourd'hui \u00E0 construire votre site web \u00E0 haut classement !",
    image: "https://seo-kit.io/logo-seo-kit.svg",
    og: {
        type: "website",
        site_name: "SEO KIT"
    },
    twitter: {
        card: "summary_large_image",
        site: "SEO KIT",
        creator: ""
    }
};
