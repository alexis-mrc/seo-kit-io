const ts = require('typescript');
const fs = require('fs');
const path = require('path');

let nxSrcFolder = path.join(__dirname, '../../');

function updateSeokPage(seokPage) {
  // Read content of the .page.ts file
  const contentPageAsString = fs.readFileSync(seokPage.filePath).toString();

  // Parse the TypeScript file content
  const sourceFile = ts.createSourceFile('xxx.page.ts', contentPageAsString, ts.ScriptTarget.Latest, true);

  // Function to update a node value in the AST
  const updateNodeValue = (node, newValue) => {
    if (ts.isStringLiteral(node)) {
      return ts.factory.createStringLiteral(newValue);
    } else if (ts.isObjectLiteralExpression(node)) {
      const propertiesSetted = [];
      const properties = node.properties.map(prop => {
        if (ts.isPropertyAssignment(prop) && ts.isIdentifier(prop.name)) {
          const propName = prop.name.text;
          if (newValue[propName] !== undefined) {
            propertiesSetted.push(propName);
            const updatedValue = updateNodeValue(prop.initializer, newValue[propName]);
            return ts.factory.createPropertyAssignment(prop.name, updatedValue);
          }
        }
        return prop;
      });

      for (let [key, value] of Object.entries(newValue)) {
        if (!propertiesSetted.includes(key)) {
          properties.push(ts.factory.createPropertyAssignment(
            ts.factory.createIdentifier(key),
            createLiteralOrObject(value)
          ));
        }
      }

      return ts.factory.createObjectLiteralExpression(properties, true);
    }

    return createLiteralOrObject(newValue);
  };

  const createLiteralOrObject = (value) => {
    if (typeof value === 'string') {
      return ts.factory.createStringLiteral(value);
    } else if (typeof value === 'object' && value !== null) {
      const properties = Object.keys(value).map(key =>
        ts.factory.createPropertyAssignment(
          ts.factory.createIdentifier(key),
          createLiteralOrObject(value[key])
        )
      );
      return ts.factory.createObjectLiteralExpression(properties, true);
    }
    return ts.factory.createNull();
  };

  // Transformer function to update node values
  const transformer = context => rootNode => {
    const visit = node => {
      if (ts.isVariableStatement(node)) {
        const declarations = node.declarationList.declarations.map(declaration => {
          if (ts.isIdentifier(declaration.name) && declaration.initializer) {
            const varName = declaration.name.text;
            switch (varName) {
              case 'id':
                declaration.initializer = updateNodeValue(declaration.initializer, seokPage.id);
                break;
              case 'url':
                declaration.initializer = updateNodeValue(declaration.initializer, seokPage.url);
                break;
              case 'lang':
                declaration.initializer = updateNodeValue(declaration.initializer, seokPage.lang);
                break;
              case 'state':
                declaration.initializer = updateNodeValue(declaration.initializer, seokPage.state);
                break;
              case 'metatags':
                declaration.initializer = updateNodeValue(declaration.initializer, seokPage.metatags);
                break;
            }
          }
          return declaration;
        });
        return ts.factory.updateVariableStatement(node, node.modifiers, ts.factory.updateVariableDeclarationList(node.declarationList, declarations));
      }
      return ts.visitEachChild(node, visit, context);
    };
    return ts.visitNode(rootNode, visit);
  };

  const result = ts.transform(sourceFile, [transformer]);
  const printer = ts.createPrinter();
  const updatedContent = printer.printFile(result.transformed[0]);

  // Write the updated content back to the .page.ts file
  fs.writeFileSync(seokPage.filePath, updatedContent);

  // Define the path to the .sitemap.json file
  const pathSitemapData = path.join(nxSrcFolder, seokPage.filePath.replace('.page.ts', '.sitemap.json'));

  // Read and parse the .sitemap.json file if it exists
  if (fs.existsSync(pathSitemapData) && seokPage.sitemap) {
    try {
      fs.writeFileSync(pathSitemapData, JSON.stringify(seokPage.sitemap, null, 2));
    } catch (e) {
      console.log('Error while writing sitemap ' + pathSitemapData);
    }
  }

  return seokPage;
}

// Example usage
const pageToUpdate = JSON.parse(fs.readFileSync(path.join(__dirname, '../../tmp/page-to-update.json')).toString());
updateSeokPage(pageToUpdate);
