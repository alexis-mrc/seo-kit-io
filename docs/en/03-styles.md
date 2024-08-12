# Style Settings

This page provides an overview of the style guidelines used throughout the web CLI. It includes information on the color modes, color schemes, and font styles applied to various components. ([http://localhost:4000/styles](http://localhost:4000/styles))

## Color Mode

SEO Kit offers three color modes to ensure your application adapts to different user preferences:

- **Dark Mode**: Applies a dark theme across the application.
- **Light Mode**: Applies a light theme across the application.
- **User Settings Mode**: Automatically adapts the color scheme based on the user's system or browser preferences.

## Color Scheme

### Primary Color

The primary color scheme is generated automatically based on the selected primary color. This color is used throughout the application to maintain a consistent visual identity.

- **Primary Color Example**:
  - `#e60009` is the primary color.
  - The WebCLI generates a full palette of shades for this color, from light to dark.

### Secondary Color

In addition to the primary color, SEO Kit allows you to configure a secondary color. This secondary color can be used throughout your application to complement the primary color or to highlight specific elements.

- **Using Secondary Colors**:
  - You can apply the secondary color in your application using Tailwind CSS classes.
  - For text color, use classes like `text-secondary-500`.
  - For background color, use classes like `bg-secondary-500`.
  - Similar to the primary color, a full palette of secondary color shades will be generated.


### Generated Palette (Example)

Here’s an example of how the primary color might be automatically extended into a full palette:

- **50**: `#ffe5e6`
- **100**: `#ffccce`
- **200**: `#ff999d`
- **300**: `#ff666c`
- **400**: `#ff333b`
- **500**: `#e60009`
- **600**: `#cc0008`
- **700**: `#990006`
- **800**: `#660004`
- **900**: `#330002`
- **950**: `#1a0001`

The primary color is used for key elements such as buttons, links, and highlights.

## Font Settings

The typography in SEO Kit is designed to ensure readability and maintain a professional appearance. You can customize the fonts used for titles and body text by uploading your own fonts and assigning them to the appropriate roles.

### Uploading Fonts

You can upload custom fonts through the WebCLI. When uploading, specify whether the font is for titles or main body text, and whether it’s regular, bold, or italic.

- **Available Fonts**:
  - Title Regular
  - Title Bold
  - Title Italic
  - Main Regular
  - Main Bold
  - Main Italic

Browse your files to select them. After uploading, your font will be optimized and ready to use in your project.

---

By configuring these style settings, you can ensure that your application maintains a consistent and professional look, tailored to your specific design requirements.
