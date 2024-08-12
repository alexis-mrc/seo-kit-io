import * as ts from 'typescript';
import { formatFiles, Tree } from '@nx/devkit';
import { classify, dasherize } from '@nx/devkit/src/utils/string-utils';

// Fonction pour supprimer les importations correspondant à un chemin spécifique
function removeImportByPath(sourceFile: ts.SourceFile, pathToRemove: string, nameState: string): ts.SourceFile {
  const printer = ts.createPrinter();

  // Liste pour stocker les nouvelles déclarations
  const updatedStatements: ts.Statement[] = [];

  function visit(node: ts.Node): void {
      if (ts.isImportDeclaration(node)) {
      const importPath = node.moduleSpecifier.getText(sourceFile).replace(/['"]/g, '');

      if (importPath === pathToRemove) {
        // Ne pas ajouter cette importation à la liste des déclarations mises à jour
        return;
      }

      updatedStatements.push(node);
    } else if (ts.isVariableStatement(node)) {
      const declarations = node.declarationList.declarations;
      if (declarations.length === 1) {
        const declaration = declarations[0];
        if (ts.isArrayLiteralExpression(declaration.initializer)) {

          // On vérifie si l'élément contient des expressions conditionnelles
          const elements = declaration.initializer.elements.filter(element => {
            if (ts.isSpreadElement(element)) {
              const spreadCondition = element.expression;
              return !element.getText().includes(nameState);
            }
            return true;
          });

          // Re-créer l'expression de tableau mise à jour
          const updatedArray = ts.factory.updateArrayLiteralExpression(
            declaration.initializer,
            elements
          );

          // Re-créer la déclaration de variable mise à jour
          const updatedDeclaration = ts.factory.updateVariableDeclaration(
            declaration,
            declaration.name,
            declaration.exclamationToken,
            declaration.type,
            updatedArray
          );

          updatedStatements.push(ts.factory.updateVariableStatement(
            node,
            node.modifiers,
            ts.factory.updateVariableDeclarationList(
              node.declarationList,
              [updatedDeclaration]
            )
          ));
        } else {
          updatedStatements.push(node);
        }
      }
    } else if (ts.isStatement(node)) {
      updatedStatements.push(node);
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);

  // Retourner le fichier source mis à jour
  return ts.factory.updateSourceFile(sourceFile, updatedStatements);
}

export async function deletePageGenerator(tree: Tree, options: { name: string }) {
  const nameClassified = classify(options.name);
  const nameDasherized = dasherize(options.name);
  const pathToRemove = `./${nameDasherized}/${nameDasherized}.page`;

  // Supprimer le répertoire de la page
  tree.delete(`apps/client-app/src/app/pages/${nameDasherized}`);

  const pagesRoutesPath = 'apps/client-app/src/app/pages/pages.routes.ts';

  if (!tree.exists(pagesRoutesPath)) {
    throw new Error(`File ${pagesRoutesPath} does not exist.`);
  }

  const fileContent = tree.read(pagesRoutesPath, 'utf-8');
  const sourceFile = ts.createSourceFile(pagesRoutesPath, fileContent, ts.ScriptTarget.Latest, true);

  // Trouver et supprimer les importations correspondant au chemin
  const updatedSourceFile = removeImportByPath(sourceFile, pathToRemove, nameClassified + 'State');

  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });
  const newFileContent = printer.printFile(updatedSourceFile);
  tree.write(pagesRoutesPath, newFileContent);


  await formatFiles(tree);
}

export default deletePageGenerator;
