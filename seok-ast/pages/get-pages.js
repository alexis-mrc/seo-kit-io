const ts = require('typescript');
const fs = require('fs');
const path = require('path');

let nxSrcFolder = path.join(__dirname, '../../');

function getSeokPage(dataFilePath) {
  // Read content of the .page.ts file
  const contentPageAsString = fs.readFileSync(dataFilePath).toString();

  // Define the path to the .sitemap.json file
  const pathSitemapData = path.join(nxSrcFolder, dataFilePath.replace('.page.ts', '.sitemap.json'));
  let sitemapData = {};

  // Read and parse the .sitemap.json file if it exists
  if (fs.existsSync(pathSitemapData)) {
    try {
      sitemapData = JSON.parse(fs.readFileSync(pathSitemapData).toString());
    } catch (e) {
      console.log('Error while reading and parsing ' + pathSitemapData);
    }
  }

  // Parse the TypeScript file content
  const sourceFile = ts.createSourceFile('xxx.page.ts', contentPageAsString, ts.ScriptTarget.Latest, true);

// Function to extract values from the AST
  const extractValueFromNode = (node) => {
    if (ts.isStringLiteral(node)) {
      return node.text;
    } else if (ts.isObjectLiteralExpression(node)) {
      const result = {};
      node.properties.forEach(prop => {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          result[prop.name.text] = extractValueFromNode(prop.initializer);
        }
      });
      return result;
    }
    return undefined;
  };

// Initialize variables to store extracted values
  let id = '';
  let url = '';
  let lang = '';
  let state = 'draft';
  let metatags = { title: '' };

// Traverse the AST to extract the values
  ts.forEachChild(sourceFile, node => {
    if (ts.isVariableStatement(node)) {
      node.declarationList.declarations.forEach(declaration => {
        if (ts.isIdentifier(declaration.name) && declaration.initializer) {
          const varName = declaration.name.text;
          const value = extractValueFromNode(declaration.initializer);
          switch (varName) {
            case 'id':
              id = value;
              break;
            case 'url':
              url = value;
              break;
            case 'lang':
              lang = value;
              break;
            case 'state':
              state = value;
              break;
            case 'metatags':
              metatags = value;
              break;
          }
        }
      });
    }
  });

  // Create the SeokPage object
  const seokPage = {
    filePath: dataFilePath,
    id,
    url,
    state,
    lang,
    sitemap: sitemapData,
    metatags,
  };

  return seokPage;
}

// Read the colors from the JSON file
const pagesToGet = JSON.parse(fs.readFileSync(path.join(__dirname, '../../tmp/pages-to-get.json')).toString());
const pagesToReturn = [];

for (const pageToGet of pagesToGet) {
  pagesToReturn.push(getSeokPage(pageToGet));
}

// Create a temporary path if it doesn't exist and write the extracted data to a JSON file
const tmpPath = path.join(__dirname, '../../tmp');
if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}
fs.writeFileSync(path.join(__dirname, '../../tmp/get-pages.json'), JSON.stringify(pagesToReturn, null, 2));
