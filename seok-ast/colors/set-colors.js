const ts = require('typescript');
const fs = require('fs');
const path = require("path");

// Path to the Tailwind configuration file
const fileName = path.join(__dirname, '../../apps/client-app/tailwind.config.js');
// Read the content of the Tailwind configuration file
const fileContent = fs.readFileSync(fileName, 'utf8');

// Read the colors from the JSON file
const colors = JSON.parse(fs.readFileSync(path.join(__dirname, '../../tmp/set-colors.json')).toString());

// Function to update the Tailwind configuration file
function updateTailwindConfig(content) {
  // Parse the content of the Tailwind configuration file into a TypeScript source file
  const sourceFile = ts.createSourceFile(fileName, content, ts.ScriptTarget.Latest, true, ts.ScriptKind.JS);

  // Visitor function to traverse and update the AST
  function visit(node) {
    if (ts.isPropertyAssignment(node)) {
      const keyName = node.name.escapedText || (ts.isStringLiteral(node.name) ? node.name.text : null);

      // Update the 'primary' color if it exists in the colors object
      if (keyName === 'primary' && colors?.primary) {
        return ts.factory.createPropertyAssignment('primary', createColorObject(colors.primary));
        // Update the 'secondary' color if it exists in the colors object
      } else if (keyName === 'secondary' && colors?.secondary) {
        return ts.factory.createPropertyAssignment('secondary', createColorObject(colors.secondary));
        // Update the 'neutral' color if it exists in the colors object
      } else if (keyName === 'neutral' && colors?.neutral) {
        return ts.factory.createPropertyAssignment('neutral', createColorObject(colors.neutral));
        // Update the 'darkMode' setting if it exists in the colors object
      } else if (keyName === 'darkMode' && colors?.darkMode) {
        if (colors.darkMode === 'media') {
          return ts.factory.createPropertyAssignment('darkMode', ts.factory.createStringLiteral(colors.darkMode));
        } else {
          const array =
            colors.darkMode.includes('htmlnever') ?
              ts.factory.createArrayLiteralExpression([ts.factory.createStringLiteral('selector'), ts.factory.createStringLiteral('htmlnever')])
              :
              ts.factory.createArrayLiteralExpression([ts.factory.createStringLiteral('selector'), ts.factory.createStringLiteral('html')]);

          return ts.factory.createPropertyAssignment('darkMode', array);
        }
      }
    }
    // Recursively visit each child node
    return ts.visitEachChild(node, visit, undefined);
  }

  // Function to create a color object in the AST
  function createColorObject(colors) {
    const properties = Object.entries(colors).map(([key, value]) =>
      ts.factory.createPropertyAssignment(
        ts.factory.createNumericLiteral(key),
        ts.factory.createStringLiteral(value)
      )
    );
    return ts.factory.createObjectLiteralExpression(properties, true);
  }

  // Apply the visitor function to the source file AST
  const updatedSourceFile = ts.visitNode(sourceFile, visit);
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  // Return the updated content of the Tailwind configuration file
  return printer.printFile(updatedSourceFile);
}

// Generate the new content for the Tailwind configuration file
const newContent = updateTailwindConfig(fileContent);
// Write the updated content back to the Tailwind configuration file
fs.writeFileSync(fileName, newContent, 'utf8');
