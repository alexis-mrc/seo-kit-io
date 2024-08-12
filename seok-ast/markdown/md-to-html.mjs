import fs from 'node:fs';
import path from 'node:path';

import { unified } from 'unified';
import markdown from 'remark-parse';
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the colors from the JSON file
const mdToHtmlJSON = JSON.parse(fs.readFileSync(path.join(__dirname, '../../tmp/md-to-html.json')).toString());

function transformImgToSeokImage(htmlContent) {
  const imgInPRegex = /<p><img\s+([^>]*)><\/p>/g;
  const imgRegex = /<img\s+([^>]*)>/g;
  const seokImageTemplate = `<seok-image-presentation [data]='{
    img: {
      alt: "{alt}",
      link: "{src}",
      objectFit: "contains",
      caption: "{title}"
    },
    {width: "width",}
    {height: "height",}
    {loading: "loading"}
  }'></seok-image-presentation>`;

  // Replace <img> tags with seok-image-presentation
  htmlContent = htmlContent.replace(imgInPRegex, '<img $1>');

  let prioritySetted = false;

  htmlContent = htmlContent.replace(imgRegex, (match, attributes) => {
    // Parse attributes
    const { src, alt, title, width, height, loading } = parseAttributes(attributes);

    // Replace in template
    let seokImage = seokImageTemplate
      .replace('{src}', src || '')
      .replace('{alt}', alt || '')
      .replace('{title}', title || alt || '');

    if (width) {
      seokImage = seokImage.replace('{width: "width",}', `width: "${width}",`)
    } else {
      seokImage = seokImage.replace('{width: "width",}', '');
    }

    if (height) {
      seokImage = seokImage.replace('{height: "height",}', `height: "${height}",`)
    } else {
      seokImage = seokImage.replace('{height: "height",}', '');
    }

    if (!prioritySetted) {
      prioritySetted = true;
      seokImage = seokImage.replace('{loading: "loading"}', `priority: true,`)
    } else if (loading) {
      seokImage = seokImage.replace('{loading: "loading"}', `loading: "${loading}",`)
    } else {
      seokImage = seokImage.replace('{loading: "loading"}', '');
    }

    return seokImage;
  });

  return htmlContent;
}

// Function to parse attributes from <img> tag
function parseAttributes(attributeString) {
  const attributes = {};
  const attributePairs = attributeString.match(/([a-zA-Z\-]+)="([^"]*)"/g);
  if (attributePairs) {
    attributePairs.forEach(pair => {
      const [key, value] = pair.split('=');
      attributes[key.trim()] = value.replace(/"/g, '');
    });
  }
  return attributes;
}

const markdownToHtml = (htmlFilePath, markdownFilePath) => {
  fs.readFile(markdownFilePath, 'utf8', (err, markdownContent) => {
    if (err) {
      console.error(`Error while reading Markdown: ${err}`);
      return;
    }

    // Use unified to transform Markdown to HTML
    unified()
      .use(markdown)
      .use(remarkRehype)
      .use(rehypeStringify, {
        quote: '\"'
      })
      .process(markdownContent, (err, htmlContent) => {
        if (err) {
          console.error(`Error converting Markdown to HTML: ${err}`);
          return;
        }

        let htmlText = String(htmlContent);
        const toReplaceForAngular = { '@': '&#64;', '{': '&#123;', '}': '&#125;' };

        for (let key of Object.keys(toReplaceForAngular)) {
          htmlText = htmlText.replaceAll(key, toReplaceForAngular[key]);
        }

        htmlText = transformImgToSeokImage(htmlText);
        htmlText = `<main>
${htmlText}
</main>`

        if (fs.existsSync(htmlFilePath)) {
          // Copy old HTML content to a file

          try {
            fs.copyFileSync(htmlFilePath, htmlFilePath + '.old');
          } catch (err) {
            if (err) {
              console.error(`Error copy old HTML file: ${err}`);
              return;
            }
          }
        }

        // Write HTML content to a file
        fs.writeFile(htmlFilePath, htmlText, (err) => {
          if (err) {
            console.error(`Error writing HTML file: ${err}`);
            return;
          }
        });
      });
  });
}

markdownToHtml(mdToHtmlJSON.htmlPage, path.join(__dirname, '../../tmp/md-to-html.md'));
