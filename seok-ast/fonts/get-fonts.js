const csstree = require('css-tree');
const fs = require('fs');
const path = require("path");

// Path to the CSS file
const fileName = path.join(__dirname, '../../apps/client-app/src/generated/fonts.scss');

// Read and parse the CSS file
const css = fs.readFileSync(fileName, 'utf8');
const ast = csstree.parse(css);

// Object to store font paths
const fonts = {
  titleRegular: "",
  titleBold: "",
  titleItalic: "",
  mainRegular: "",
  mainBold: "",
  mainItalic: ""
};

// Function to extract font information from @font-face rule
function extractFontInfo(node) {
  let fontFamily = '';
  let fontStyle = 'normal';
  let fontWeight = '400';
  let src = '';

  // Iterate over the declarations in the @font-face rule
  node.block.children.forEach(declaration => {
    const property = declaration.property;
    const valueNode = declaration.value;

    // Extract relevant properties
    if (property === 'font-family') {
      fontFamily = valueNode.children.head.data.value.replace(/"/g, '');
    } else if (property === 'font-style') {
      fontStyle = valueNode.children.head.data.name;
    } else if (property === 'font-weight') {
      fontWeight = valueNode.children.head.data.value;
    } else if (property === 'src') {
      src = valueNode.children.head.data.value.replace(/'/g, '');
    }
  });

  return { fontFamily, fontStyle, fontWeight, src };
}

// Traverse the AST and extract font information from @font-face rules
csstree.walk(ast, {
  visit: 'Atrule',
  enter(node) {
    if (node.name === 'font-face') {
      const { fontFamily, fontStyle, fontWeight, src } = extractFontInfo(node);

      // Assign font paths to the respective keys in the fonts object
      if (fontFamily === 'title-font') {
        if (fontStyle === 'normal' && fontWeight === '400') fonts.titleRegular = src;
        if (fontStyle === 'italic') fonts.titleItalic = src;
        if (fontWeight === '700') fonts.titleBold = src;
      } else if (fontFamily === 'main-font') {
        if (fontStyle === 'normal' && fontWeight === '400') fonts.mainRegular = src;
        if (fontStyle === 'italic') fonts.mainItalic = src;
        if (fontWeight === '700') fonts.mainBold = src;
      }
    }
  }
});

// Ensure the temporary directory exists
const tmpPath = path.join(__dirname, '../../tmp');
if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}

// Write the fonts object to a JSON file
fs.writeFileSync(path.join(__dirname, '../../tmp/get-fonts.json'), JSON.stringify(fonts, null, 2));
