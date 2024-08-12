"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSeo = exports.provideUpdateSeo = exports.UPDATE_SEO = void 0;
const core_1 = require("@angular/core");
const platform_browser_1 = require("@angular/platform-browser");
const seo_builder_1 = require("./metatags.builder");
/**
 * Token UPDATE_SEO
 * Useful to simplify testing
 */
exports.UPDATE_SEO = new core_1.InjectionToken('UPDATE_SEO');
/**
 * Provide UPDATE_SEO token
 */
const provideUpdateSeo = () => ({
    provide: exports.UPDATE_SEO, useValue: internalUpdateSeo
});
exports.provideUpdateSeo = provideUpdateSeo;
/**
 * Update the SEO for the page
 * @param data the seo data
 * Must be called in an injection context
 */
const updateSeo = (data) => {
    (0, core_1.inject)(exports.UPDATE_SEO)(data);
};
exports.updateSeo = updateSeo;
/**
 * Internal : Update the SEO for the page
 * @param data the seo data
 * Must be called in an injection context
 */
const internalUpdateSeo = (data) => {
    (0, core_1.inject)(platform_browser_1.Title).setTitle(seo_builder_1.MetatagsBuilder.getTitle(data));
    const meta = (0, core_1.inject)(platform_browser_1.Meta);
    internalRemoveTags(meta);
    meta.addTags(seo_builder_1.MetatagsBuilder.getTags(data));
};
/**
 * Internal : Remove all tags set by SeoBuilder
 * @param meta
 */
const internalRemoveTags = (meta) => {
    const tags = seo_builder_1.MetatagsBuilder.getAllTagsSelectors();
    for (const tag of tags) {
        if (!!meta.getTag(tag)) {
            meta.removeTag(tag);
        }
    }
};
//# sourceMappingURL=seo.service.js.map
