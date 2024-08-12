import fs from 'fs';
import path from 'path';

export const getAllFiles = (dirPath: string, initialDir?: string): string[] => {
  const allFiles: string[] = [];

  const files = fs.readdirSync(dirPath);

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      // Recursively get files in subdirectory
      allFiles.push(...getAllFiles(filePath, dirPath));
    } else {
      const pathToRemove = (initialDir ? initialDir : dirPath) + '/'
      if (filePath.startsWith(pathToRemove)) {
        allFiles.push(filePath.substring(pathToRemove.length));
      } else {
        allFiles.push(filePath);
      }
    }
  });

  return allFiles;
};
