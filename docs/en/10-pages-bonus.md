# Pages - Bonus

## Adding Legal Pages
In addition to your landing, pillar, and child pages, you may need to add other types of pages, such as legal pages. Depending on your country, you might be required to include pages like Privacy Policy, Terms of Service, or a Legal Notice. You can add these pages in the same way you add other pages and then include links to them in the footer of your site.

Example pages to consider:
- **Privacy Policy**
- **Terms of Service**
- **Legal Notice**
- **FAQ**
- **Glossary**

Including these pages ensures that your website complies with legal requirements and provides clear information to your users.

### Adding the Link to the Footer

To include a link to your pillar page in the footer:

1. Open the file `apps/client-app/src/app/footer/footer.component.ts`.
2. Import the URL of your page:

   ```typescript
   import { url as PrivacyPolicyUrl } from '../pages/privacy-policy/privacy-policy.page';
   ```
3. Update the `linksByLang` mapping to include the new page:

   ```typescript
   linksByLang: Record<string, Link[]> = {
     'en': [
       { url: PrivacyPolicyUrl, label: 'Privacy Policy' },
     ]
   };
   ```

## Customizing the Header and Footer
The header and footer of your site are fully customizable, allowing you to add CTAs (Call to Actions) or other information that suits your needs.

### Example Customizations:
- **Header CTA**: Use the `seok-call-to-action` component or simple HTML to add a promotional button or message in the header.
- **Footer Information**: Add additional links, contact information, or a brief description of your business in the footer.

Feel free to experiment and tailor these elements to match your brand and objectives.

## Implementing addAlternateLangHref for International SEO

You can integrate the `addAlternateLangHref` function into your Angular component like this:

```typescript
constructor() {
  addAlternateLangHref('en', '/en/sample-page');
}
```

### What It Does:
The `addAlternateLangHref` function adds a `<link>` element to the document's head, signaling the alternate language version of the page. This improves SEO by allowing search engines to recognize and serve the correct language version of your content.
