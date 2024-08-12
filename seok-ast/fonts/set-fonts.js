const csstree = require('css-tree');
const fs = require('fs');
const path = require("path");
const prettier = require("prettier");

// Paths to the files
const cssFilePath = path.join(__dirname, '../../apps/client-app/src/generated/fonts.scss');
const jsonFilePath = path.join(__dirname, '../../tmp/set-fonts.json');

// Load and parse the CSS file
const css = fs.readFileSync(cssFilePath, 'utf8');
const ast = csstree.parse(css);

// Function to check if the `font-family` is `main-font` or `title-font`
function isMainOrTitleFontFace(node) {
  let fontFamily = '';

  node.block.children.forEach(declaration => {
    if (declaration.property === 'font-family') {
      fontFamily = declaration.value.children.head.data.value.replace(/"/g, '');
    }
  });

  return fontFamily === 'main-font' || fontFamily === 'title-font';
}

// Remove all @font-face declarations with `font-family` equal to `main-font` or `title-font`
csstree.walk(ast, {
  visit: 'Atrule',
  enter(node, item, list) {
    if (node.name === 'font-face' && isMainOrTitleFontFace(node)) {
      list.remove(item);
    }
  }
});

// Read font information from the JSON file
const fonts = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

// Function to generate @font-face declarations
function generateFontFace(usedFor, type, path) {
  return `
@font-face {
  font-family: "${usedFor}-font";
  font-style: ${type === 'italic' ? 'italic' : 'normal'};
  font-weight: ${type === 'bold' ? '700' : '400'};
  font-display: swap;
  src: url('${path}');
}
`;
}

// Generate new @font-face declarations and add them to the AST
let fontsContent = '';

Object.entries(fonts).forEach(([key, value]) => {
  if (value) {
    let usedFor = key.includes('title') ? 'title' : 'main';
    let type = key.includes('Bold') ? 'bold' : (key.includes('Italic') ? 'italic' : 'normal');
    fontsContent += generateFontFace(usedFor, type, value);
  }
});

const newAst = csstree.parse(fontsContent);

newAst.children.forEach(node => {
  ast.children.appendData(node);
});

// Generate the modified CSS with CSSTree
const rawCss = csstree.generate(ast);

// Format the CSS with Prettier
const formattedCss = prettier.format(rawCss, { parser: "css" });

// Save the modified CSS back to the original file
fs.writeFileSync(cssFilePath, formattedCss, 'utf8');
