import { SeokPageState } from '@seo-kit-boilerplate/seok-core/pages';
import { Metatags } from '@seo-kit-boilerplate/seok-core/metatags';
export const id = "home";
export const url = "";
export const lang = "en";
export const state: SeokPageState = "published";
export const metatags: Metatags = {
    title: "Discover the seo-kit-boilerplate to create SEO-optimized websites effortlessly. Deploy with ease. Start building your high-ranking website today!",
    description: "Discover the seo-kit-boilerplate to create SEO-optimized websites effortlessly. Deploy with ease. Start building your high-ranking website today!",
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
