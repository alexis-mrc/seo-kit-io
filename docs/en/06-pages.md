# Pages - General Overview

([http://localhost:4000/pages](http://localhost:4000/pages))

## Adding a Page via the WebCLI

In this section, you'll learn how to add new pages to your application using the WebCLI. This includes setting up the necessary criteria, exploring the possibilities, and understanding the impact on your sitemap and routing configuration.

### Configuration (Route / Meta / Sitemap)

When adding a new page, it's important to configure the route, metadata, and sitemap settings correctly. This ensures that your page is accessible, optimized for search engines, and properly integrated into your website's structure.

## Pages

On this page, you can easily add new pages to your application, manage their SEO settings, and control their draft or publish state.

### Add Page

- **Page Id**: The ID of the page should start with a letter and contain only alphanumeric characters and hyphens (`-`). This ID should be unique across your application.
- **Current Pages**: If you're navigating through a large list of pages, you can quickly find what you're looking for by pressing `Ctrl + F` to open the navigator search function.

#### Example of Page Information

- **Id**: example
- **Path**: `apps/client-app/src/app/pages/example/example.page.ts`
- **Lang**: en
- **Url**: example
- **Url in production**: `https://example.com/example`

### SEO and Sitemap Settings

Those data will be used to configure the sitemap and the metatags of the page.
Undefined values won't be used in the generated page.

#### Metatags
- **Title**: Example
- **Description**: Page Description
- **Image Absolute URL**: URL of the image
- **Open Graph Data**:
  - **OG Type**: Open Graph Type
  - **OG Site Name**: Open Graph Site Name
- **Twitter Data**:
  - **Twitter Card**: Twitter Card Type
  - **Twitter Site**: Twitter Site
  - **Twitter Creator**: Twitter Creator

#### Sitemap

- **Last Modified (YYYY-MM-DD)**: The last modification date of the page.
- **Change Frequency**: How often the content of the page is expected to change.
- **Priority**: The priority of the page relative to other pages on the site.
- **Images**: Add images associated with the page to enhance its SEO and social media sharing.

## Page Types

There are three main types of pages you can create:

1. **Landing CRO (Conversion Rate Optimization)**: Designed to convince users to take a specific action, such as signing up or making a purchase.
2. **Pillar**: These are pages that receive traffic from search engines and rank first for targeted keywords. They are foundational content pieces that attract organic traffic.
3. **Child**: Supportive pages for pillar content, providing more detailed information and targeting long-tail keywords to capture more specific search queries.
