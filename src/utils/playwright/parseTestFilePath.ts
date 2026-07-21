import path from 'path';
import {
  formatCamelCaseToPhrase,
  formatKebabCaseToPhrase,
  formatPhraseToTitleCase,
} from '../format/formatString';

export function parseTestFilePath(filePath: string) {
  const attributes = [];

  const normalizeFilePath = (p: string) => path.resolve(p).replace(/\\/g, '/');
  const normalizedFilePath = normalizeFilePath(filePath);

  let baseName = path.basename(normalizedFilePath, '.ts');
  baseName = baseName.replace(/\.spec$/, '');
  const fileName = baseName.replace(/\.([a-z])/g, (_, char) => char.toUpperCase());

  const testFolder = 'tests/';
  const testFolderIndex = normalizedFilePath.indexOf(testFolder);
  if (testFolderIndex === -1) {
    throw new Error(`'${testFolder}' part is not found during parsing of '${filePath}'`);
  }
  const testHierarchyIndex = testFolderIndex + testFolder.length;
  const pathSegments = normalizedFilePath.slice(testHierarchyIndex).split('/');

  if (pathSegments.length > 1) {
    // at least one folder exists - add in the begining
    const formattedFolder = formatKebabCaseToPhrase(pathSegments[0]);
    attributes.unshift(formattedFolder);
  }
  if (pathSegments.length > 2) {
    // combine other folders into one attribute
    const otherFolders = pathSegments.slice(1, -1);
    const formattedFolders = otherFolders.map((folder) => formatKebabCaseToPhrase(folder));
    const combinedName = formattedFolders.join(' / ');
    attributes.splice(1, 0, combinedName);
  }

  attributes.push(formatCamelCaseToPhrase(fileName));

  attributes.forEach((attribute, i) => {
    attributes[i] = formatPhraseToTitleCase(attribute);
  });

  return attributes;
}
