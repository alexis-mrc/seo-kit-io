export interface Metatags {

  /**
   * The title of the page
   */
  title: string;

  /**
   * The description of the page
   */
  description?: string;

  /**
   * An image to illustrate the page
   */
  image?: string;

  /**
   * The Open Graph data
   */
  og?: {
    /**
     * The type of Open Graph
     */
    type?: string;

    /**
     * The name of the site
     */
    site_name?: string;
  };

  /**
   * The Twitter data
   */
  twitter?: {

    /**
     * The type of card
     */
    card?: string;

    /**
     * The site of the site
     */
    site?: string;

    /**
     * The creator of the page
     */
    creator?: string;
  };
}
