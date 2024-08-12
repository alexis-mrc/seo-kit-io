# Assets

The public folder contains static assets that are publicly accessible and served by the web server. This includes files such as images and other resources that do not require server-side processing. These assets are directly accessible via a URL and are typically used for rendering the user interface. ([http://localhost:4000/assets](http://localhost:4000/assets))

## Public Folder

In the **public** folder of `apps/client-app`, you can manage all your static assets. These assets are essential for the frontend of your application, as they include all the necessary files for media content.

### Uploading Assets

You can easily upload your assets to the **public** folder using the web CLI. Simply browse your directories to select the assets you want to include. Once uploaded, these assets will be optimized automatically for better performance, including compression and conversion to web-friendly formats like WebP.

### Usage

Once your assets are uploaded, they can be referenced in your application via their URL paths.
The public folder is served at the root of your domain (for an image `logo.webp` : https://example.com/logo.webp)

This method ensures that your assets are readily available and efficiently served to the user, contributing to faster load times and a better overall user experience.

### Best Practices

- **Optimize your assets**: Before uploading, ensure your assets are as optimized as possible. SEO Kit’s asset management will further optimize images and other files to ensure minimal impact on page load times.
- **Use proper naming conventions**: Keep your filenames clear and descriptive. It's better for images SEO. Avoid using spaces or special characters.
- **Leverage WebP format**: Whenever possible, use WebP for images as it offers superior compression and quality. It's automatically done when uploaded through web CLI.

## Summary

The **public** folder in SEO Kit is your go-to place for managing static assets. Proper management of these assets is crucial for the performance and accessibility of your website.
