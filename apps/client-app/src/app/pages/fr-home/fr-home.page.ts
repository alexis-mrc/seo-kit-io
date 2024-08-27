import { SeokPageState } from '@seo-kit-boilerplate/seok-core/pages';
import { Metatags } from '@seo-kit-boilerplate/seok-core/metatags';
export const id = "fr-home";
export const url = "fr";
export const lang = "fr";
export const state: SeokPageState = "published";
export const metatags: Metatags = {
    title: "SEO KIT : Du traffic organique avec un Angular SEO friendly",
    description: "D\u00E9couvre seo-kit-boilerplate pour cr\u00E9er facilement des applications Angular SEO friendly. Cr\u00E9e maintenant ton site, d\u00E9ploie-le en un clic et apparais en premier !",
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
