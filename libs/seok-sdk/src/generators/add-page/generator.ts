import {
  formatFiles,
  generateFiles,
  Tree
} from '@nx/devkit';
import * as path from 'path';
import { classify, dasherize } from '@nx/devkit/src/utils/string-utils';
import * as ts from 'typescript';

function addImportStatement(sourceFile: ts.SourceFile, importText: string): ts.SourceFile {
  const importStatement = ts.createSourceFile(
    'temp.ts',
    importText,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  ).statements[0];

  return ts.factory.updateSourceFile(sourceFile, [
    importStatement,
    ...sourceFile.statements,
  ]);
}

function addRouteConfig(sourceFile: ts.SourceFile, routeText: string): ts.SourceFile {
  const routesArray = sourceFile.statements.find(
    (stmt) => ts.isVariableStatement(stmt) &&
      (stmt.declarationList.declarations[0].name as ts.Identifier).text === 'pagesRoutes'
  ) as ts.VariableStatement;

  if (!routesArray) {
    throw new Error('Could not find pagesRoutes array.');
  }

  const arrayLiteral = routesArray.declarationList.declarations[0].initializer as ts.ArrayLiteralExpression;

  // Créez un AST temporaire pour le texte de la route
  const tempSourceFile = ts.createSourceFile(
    'temp.ts',
    `const temp = [${routeText}];`,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TS
  );

  const newRoute = (tempSourceFile.statements[0] as ts.VariableStatement)
    .declarationList.declarations[0].initializer as ts.ArrayLiteralExpression;

  const updatedArrayLiteral = ts.factory.updateArrayLiteralExpression(arrayLiteral, [
    ...arrayLiteral.elements,
    ...newRoute.elements,
  ]);

  const updatedRoutesArray = ts.factory.updateVariableDeclaration(
    routesArray.declarationList.declarations[0],
    routesArray.declarationList.declarations[0].name,
    routesArray.declarationList.declarations[0].exclamationToken,
    routesArray.declarationList.declarations[0].type,
    updatedArrayLiteral
  );

  const updatedRoutesVariableStatement = ts.factory.updateVariableStatement(
    routesArray,
    routesArray?.modifiers || [],
    ts.factory.updateVariableDeclarationList(
      routesArray.declarationList,
      [updatedRoutesArray]
    )
  );

  return ts.factory.updateSourceFile(sourceFile, [
    ...sourceFile.statements.filter(stmt => stmt !== routesArray),
    updatedRoutesVariableStatement,
  ]);
}

function cleanPageName(name: string): string | null {
  // Regular expression to match valid names
  const validNameRegex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;

  // Trim the input name
  const trimmedName = name.trim();

  // Check if the trimmed name is valid
  if (validNameRegex.test(trimmedName)) {
    return trimmedName;
  }

  // Return null if the name is invalid
  return null;
}


export async function addPageGenerator(
  tree: Tree,
  options: { name: string }
) {

  const cleanedName = cleanPageName(options.name);

  const nameClassified = classify(cleanedName);
  const nameDasherized = dasherize(cleanedName);

  generateFiles(tree, path.join(__dirname, 'files'), `apps/client-app/src/app/pages/${nameDasherized}`, {
    nameClassified,
    nameDasherized
  });

  const pagesRoutesPath = 'apps/client-app/src/app/pages/pages.routes.ts';

  if (!tree.exists(pagesRoutesPath)) {
    throw new Error(`File ${pagesRoutesPath} does not exist.`);
  }

  const fileContent = tree.read(pagesRoutesPath, 'utf-8');
  const sourceFile = ts.createSourceFile(pagesRoutesPath, fileContent, ts.ScriptTarget.Latest, true);

  const importStatement = `import { url as ${nameClassified}Url, state as ${nameClassified}State } from './${nameDasherized}/${nameDasherized}.page';\n`;
  const routeConfig = `...('published' === ${nameClassified}State ? [{
  path: ${nameClassified}Url,
  loadComponent: () => import('./${nameDasherized}/${nameDasherized}.component').then(m => m.${nameClassified}Component),
  data: {
    sitemap: '${nameDasherized}/${nameDasherized}.sitemap.json'
  }
}] : []),`;

  let updatedSourceFile = sourceFile;

  if (!fileContent.includes(importStatement)) {
    updatedSourceFile = addImportStatement(updatedSourceFile, importStatement);
  }

  if (!fileContent.includes(routeConfig)) {
    updatedSourceFile = addRouteConfig(updatedSourceFile, routeConfig);
  }

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const newFileContent = printer.printFile(updatedSourceFile);

  tree.write(pagesRoutesPath, newFileContent);
  await formatFiles(tree);
}

export default addPageGenerator;
