# SEO Kit Components

SEO Kit provides a set of components that can be easily integrated into your application. Within the web CLI, you have access to a feature that allows you to preview these components directly. ([http://localhost:4000/components](http://localhost:4000/components))

## Component Preview

You can view components in either **Light** or **Dark** mode directly from the web CLI. Additionally, you can switch between two available styles:

- **Default**: Features rounded edges and a soft design.
- **Yankees**: A sharper, more defined style.

## Yankees Style Customization

The **Yankees** style can be further customized using CSS variables. These variables allow you to control the cut size and other design aspects globally across the application or even on a per-element basis using inline styles.

Example variables for customization:

```css
--yankees-cut-size: 8px;
--yankees-cut-size-large: 8%;
--yankees-cut-multiplicator-large: 2;
