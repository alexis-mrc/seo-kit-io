# Build and Deploy

([http://localhost:4000/deploy](http://localhost:4000/deploy))

## Build client-app and Get Files
SEO Kit allows you to build the `client-app` and provides access to the generated files. You can download these files and manually copy them to your server. Please note that depending on your hosting type, you will need to manage the redirection to the `index.html` file for proper routing.

## Deploy to Firebase with One Click
Deploying your site to Firebase can be done with a single click through the SEO Kit web CLI. Detailed instructions and configurations are provided on the Deploy page within the web CLI.

## Get a Custom Domain from GoDaddy
To purchase a custom domain via GoDaddy, follow these steps:

1. Go to [GoDaddy](https://www.godaddy.com/).
2. Use the search bar to find your desired domain name.
3. Select your preferred domain from the search results.
4. Add the domain to your cart and proceed to checkout.
5. Complete the purchase by following the on-screen instructions.

Once the domain is purchased, you can configure it to work with Firebase as outlined in the next section.

## Use Custom Domain with Firebase
To configure your custom domain with Firebase:

1. **Add Domain to Firebase**:
  - Go to the [Firebase Console](https://console.firebase.google.com/).
  - Select your project and navigate to the "Hosting" section.
  - Click on "Add Custom Domain" and enter the domain you purchased.

2. **Verify Domain Ownership**:
  - Firebase will provide records that you need to add to your domain's DNS settings on GoDaddy.
  - Log in to your GoDaddy account and go to your DNS settings.
  - Add the records provided by Firebase and save the changes.

3. **Deploy and Test**:
  - Deploy your site to Firebase using the One Click Deploy button.
  - After deployment, test your custom domain to ensure everything is working correctly.

With these steps completed, your site should be live and accessible via your custom domain.
