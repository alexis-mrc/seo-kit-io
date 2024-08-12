"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonLdData = void 0;
const seo_kit_data_1 = require("../../../generated-by-seo-kit/seo-kit.data");
// TODO THROW ERROR IF NOT VALORIZED
const website = seo_kit_data_1.websiteName && seo_kit_data_1.websiteUrl ? {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: seo_kit_data_1.websiteName,
    url: seo_kit_data_1.websiteUrl,
} : undefined;
const publisher = seo_kit_data_1.websiteName && seo_kit_data_1.websiteUrl ? Object.assign(Object.assign(Object.assign({ '@type': 'Organization', name: seo_kit_data_1.websiteName, url: seo_kit_data_1.websiteUrl }, (seo_kit_data_1.creationDate ? {
    foundingDate: seo_kit_data_1.creationDate
} : {})), (seo_kit_data_1.logoUrl && seo_kit_data_1.logoWidth && seo_kit_data_1.logoHeight ? {
    logo: {
        '@type': 'ImageObject',
        url: seo_kit_data_1.logoUrl,
        width: seo_kit_data_1.logoWidth,
        height: seo_kit_data_1.logoHeight
    }
} : {})), (seo_kit_data_1.supportEmail ? {
    email: seo_kit_data_1.supportEmail
} : {})) : undefined;
exports.JsonLdData = Object.assign(Object.assign({}, (website ? {
    website: website
} : {})), (publisher ? {
    publisher: publisher
} : {}));
//# sourceMappingURL=json-ld.data.js.map