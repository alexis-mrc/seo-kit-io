const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const fileName = path.join(__dirname, '../../libs/seok-generated/src/lib/settings.ts');
const fileContent = fs.readFileSync(fileName, 'utf8');

// Create a SourceFile object
const sourceFile = ts.createSourceFile(fileName, fileContent, ts.ScriptTarget.Latest, true);

// Object to store the extracted values
const extractedValues = {};

// Function to extract the values from the AST
const extractValues = (node) => {
  if (ts.isVariableStatement(node)) {
    node.declarationList.declarations.forEach(declaration => {
      if (ts.isIdentifier(declaration.name)) {
        const key = declaration.name.text;
        const initializer = declaration.initializer;

        if (ts.isStringLiteral(initializer)) {
          extractedValues[key] = initializer.text;
        } else if (ts.isObjectLiteralExpression(initializer)) {
          const objValue = {};
          initializer.properties.forEach(prop => {
            if (
              ts.isPropertyAssignment(prop) &&
              ts.isIdentifier(prop.name) &&
              ts.isStringLiteral(prop.initializer)
            ) {
              objValue[prop.name.text] = prop.initializer.text;
            }
          });
          extractedValues[key] = objValue;
        }
      }
    });
  }

  ts.forEachChild(node, extractValues);
};

// Traverse the AST and extract values
extractValues(sourceFile);

const tmpPath = path.join(__dirname, '../../tmp');
if (!fs.existsSync(tmpPath)) {
  fs.mkdirSync(tmpPath);
}
fs.writeFileSync(path.join(__dirname, '../../tmp/get-settings.json'), JSON.stringify(extractedValues, null, 2));

