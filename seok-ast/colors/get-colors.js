const ts = require('typescript');
const fs = require('fs');
const path = require('path');

// Read the content of the Tailwind configuration file
const fileName = path.join(__dirname, '../../apps/client-app/tailwind.config.js');
const fileContent = fs.readFileSync(fileName, 'utf8');

// Function to extract the values of primary, secondary, neutral, and darkMode
function extractTailwindConfig(content) {
  // Parse the content of the file
  const sourceFile = ts.createSourceFile(fileName, content, ts.ScriptTarget.ES2015, true, ts.ScriptKind.JS);

  let primaryColors = {};
  let secondaryColors = {};
  let neutralColors = {};
  let darkMode = null;

  // Traverse the nodes of the syntax tree
  function visit(node) {
    if (ts.isPropertyAssignment(node)) {
      const keyName = node.name.escapedText;

      if (keyName === 'darkMode') {
        darkMode = node.initializer.getText().replace(/['"`]/g, ''); // Remove quotes
      } else if (keyName === 'theme') {
        const themeObject = node.initializer;
        if (ts.isObjectLiteralExpression(themeObject)) {
          themeObject.properties.forEach(themeProp => {
            if (ts.isPropertyAssignment(themeProp) && ts.isIdentifier(themeProp.name)) {
              const themeKeyName = themeProp.name.escapedText;
              if (themeKeyName === 'extend') {
                const extendObject = themeProp.initializer;
                if (ts.isObjectLiteralExpression(extendObject)) {
                  extendObject.properties.forEach(extendProp => {
                    if (ts.isPropertyAssignment(extendProp) && ts.isIdentifier(extendProp.name)) {
                      const extendKeyName = extendProp.name.escapedText;
                      if (extendKeyName === 'colors') {
                        const colorsObject = extendProp.initializer;
                        if (ts.isObjectLiteralExpression(colorsObject)) {
                          colorsObject.properties.forEach(colorProp => {
                            if (ts.isPropertyAssignment(colorProp) && ts.isIdentifier(colorProp.name)) {
                              const colorKeyName = colorProp.name.escapedText;
                              if (colorKeyName === 'primary') {
                                primaryColors = extractColors(colorProp.initializer);
                              } else if (colorKeyName === 'secondary') {
                                secondaryColors = extractColors(colorProp.initializer);
                              } else if (colorKeyName === 'neutral') {
                                neutralColors = extractColors(colorProp.initializer);
                              }
                            }
                          });
                        }
                      }
                    }
                  });
                }
              }
            }
          });
        }
      }
    }
    ts.forEachChild(node, visit);
  }

  // Function to extract colors from the node
  function extractColors(node) {
    const colors = {};
    if (ts.isObjectLiteralExpression(node)) {
      node.properties.forEach(colorProp => {
        const colorName = colorProp.name.text;
        if (ts.isPropertyAssignment(colorProp)) {
          const colorValue = colorProp.initializer.getText().replace(/['"`]/g, ''); // Remove quotes
          colors[colorName] = colorValue;
        }
      });
    }
    return colors;
  }

  visit(sourceFile);

  return { primaryColors, secondaryColors, neutralColors, darkMode };
}

// Extract colors and darkMode from the Tailwind configuration file
const { primaryColors, secondaryColors, neutralColors, darkMode } = extractTailwindConfig(fileContent);

// Create a temporary path if it doesn't exist and write the extracted data to a JSON file
const tmpPath = path.join(__dirname, '../../tmp');
if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}
fs.writeFileSync(path.join(__dirname, '../../tmp/get-colors.json'), JSON.stringify({ primary: primaryColors, secondary: secondaryColors, neutral: neutralColors, darkMode }, null, 2));
