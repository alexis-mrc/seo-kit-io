# Pages - Creating a Pillar Page

## Using [Surfer](https://get.surferseo.com/seo-kit-io) for Keyword Research and Content Creation

**[Surfer](https://get.surferseo.com/seo-kit-io)** helps you with keyword research and content creation in the following ways:

- **Topic Explorer and Keyword Research**: [Surfer](https://get.surferseo.com/seo-kit-io) assists in finding relevant keywords related to your initial query, including keyword difficulty, search volume, semantic clustering, and user intent.
- **Content Editor**: Once you identify a valuable keyword (with a decent search volume and manageable difficulty), use [Surfer](https://get.surferseo.com/seo-kit-io)'s Content Editor to analyze existing results for that keyword. This tool provides writing suggestions and helps generate a content outline. For faster content generation, you might use ChatGPT, but detailed guidance on this will be covered in another page.
- **Markdown Export**: After drafting your content using [Surfer](https://get.surferseo.com/seo-kit-io)'s Content Editor, click the `...` in the top-right corner and select `Export as Markdown`. The generated Markdown file can be uploaded directly via the WebCLI for the relevant page. Note that this will overwrite any existing HTML file for that page.

## Our Top Ranking Website Content Was Written Using [Surfer](https://get.surferseo.com/seo-kit-io)

At SEO Kit, we have leveraged **[Surfer](https://get.surferseo.com/seo-kit-io)** to create some of our top-ranking content. [Surfer](https://get.surferseo.com/seo-kit-io)'s advanced SEO tools and content optimization features have been instrumental in achieving high search engine rankings. Here’s how [Surfer](https://get.surferseo.com/seo-kit-io) has helped us:

1. **Keyword Research and Analysis**: [Surfer](https://get.surferseo.com/seo-kit-io)’s Topic Explorer and keyword research tools enabled us to identify high-value keywords with significant search volume and manageable difficulty. This allowed us to target relevant topics that attract a large audience.

2. **Content Optimization**: Using [Surfer](https://get.surferseo.com/seo-kit-io)'s Content Editor, we analyzed top-performing content for our target keywords. [Surfer](https://get.surferseo.com/seo-kit-io) provided actionable insights and recommendations on how to structure and optimize our content to meet the highest standards for SEO.

3. **Markdown Export**: [Surfer](https://get.surferseo.com/seo-kit-io)’s ability to export content as Markdown streamlined our workflow. We could easily transfer the content into our WebCLI setup, ensuring that our pillar pages and other key content were consistently formatted and optimized.

4. **Continuous Improvement**: [Surfer](https://get.surferseo.com/seo-kit-io)’s ongoing content analysis tools helped us refine our pages over time, ensuring that we maintained and improved our rankings. We used [Surfer](https://get.surferseo.com/seo-kit-io)’s recommendations to adjust our content based on the latest SEO trends and competitive insights.

By integrating [Surfer](https://get.surferseo.com/seo-kit-io) into our content creation process, we’ve been able to produce high-quality, SEO-optimized content that drives traffic and enhances our site’s visibility. We highly recommend using [Surfer](https://get.surferseo.com/seo-kit-io) for anyone looking to improve their content strategy and achieve better search engine rankings.

## [Frase.io](https://www.frase.io/?via=seo-kit-io) as an Alternative

While [Surfer](https://get.surferseo.com/seo-kit-io) is a powerful tool for SEO content creation, **[Frase.io](https://www.frase.io/?via=seo-kit-io)** is another excellent alternative for those looking to optimize their content strategy. [Frase.io](https://www.frase.io/?via=seo-kit-io) offers a range of features that can help improve your content’s SEO performance. Here’s an overview of what [Frase.io](https://www.frase.io/?via=seo-kit-io) brings to the table:

1. **Content Research**: [Frase.io](https://www.frase.io/?via=seo-kit-io) provides robust content research tools that help you discover what your competitors are writing about and identify gaps in your content. This feature is particularly useful for understanding the topics and keywords that are trending in your industry.

2. **SEO Optimization**: Similar to [Surfer](https://get.surferseo.com/seo-kit-io), [Frase.io](https://www.frase.io/?via=seo-kit-io) offers SEO optimization recommendations based on competitive analysis. It provides insights into keyword usage, content structure, and readability to help ensure that your content meets the highest SEO standards.

3. **Content Briefs**: [Frase.io](https://www.frase.io/?via=seo-kit-io) allows you to create detailed content briefs that outline the key elements to include in your content. These briefs help guide your writing process and ensure that your content is comprehensive and well-targeted.

4. **Content Analysis**: With [Frase.io](https://www.frase.io/?via=seo-kit-io), you can analyze your content against top-ranking pages to see how well it performs in comparison. This analysis helps you make data-driven adjustments to improve your content’s effectiveness.

5. **User-Friendly Interface**: [Frase.io](https://www.frase.io/?via=seo-kit-io) is known for its intuitive interface, which makes it easy to use even for those who are new to SEO content optimization. Its user-friendly design helps streamline the content creation process, allowing you to focus on producing high-quality content.

6. **Pricing and Features**: [Frase.io](https://www.frase.io/?via=seo-kit-io) offers various pricing plans to fit different needs and budgets. It provides a range of features that can be tailored to your specific content strategy and SEO goals.

For those looking for a powerful yet user-friendly alternative to [Surfer](https://get.surferseo.com/seo-kit-io), [Frase.io](https://www.frase.io/?via=seo-kit-io) is worth considering. It offers a comprehensive suite of tools to help you create, optimize, and analyze content, ensuring that your SEO efforts are both effective and efficient.

## Manual Creation

Creating a pillar page manually gives you full freedom, but it can be more complex. We recommend using SEO Kit components, especially for images, to maintain design consistency. Alternatively, if [Surfer](https://get.surferseo.com/seo-kit-io) is too costly, consider using other tools like [Frase.io](https://www.frase.io/?via=seo-kit-io) for content optimization.

## Adding the Link to the Header

To include a link to your pillar page in the header:

1. Open the file `apps/client-app/src/app/header/header.component.ts`.
2. Import the URL of your pillar page:
   
   ```typescript
   import { url as ExamplePillarUrl } from '../pages/example-pillar/example-pillar.page';
   ```
3. Update the `linksByLang` mapping to include the new page:
   
   ```typescript
   linksByLang: Record<string, Link[]> = {
     'en': [
       { url: ExamplePillarUrl, label: 'Example Pillar' },
     ]
   };
   ```

This configuration ensures that the link appears correctly based on the selected language. The label is what will be displayed in the header, and the URL should be retrieved from the page configuration file to ensure synchronization with WebCLI changes.

## Configuration

As with all pages, ensure you configure the meta tags and sitemap appropriately for SEO. This includes setting up the meta title, description, and any other relevant meta tags to improve search engine visibility.
