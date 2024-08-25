import fs from 'fs';
import { EOL } from 'node:os';
import path from 'path';

const ROOT_DIR = import.meta.dirname;

const generatedTest = fs
  .readFileSync(path.join(ROOT_DIR, 'generated-file.ts'), { encoding: 'utf8' })
  .split(EOL) // remove imports from file
  .slice(4)
  .join(EOL);

const importAxiosStatement = `import axios from 'axios';${EOL}`;

const importExpectStatement = `import expect from 'expect';${EOL}`;

const generatedTestWithImports = importAxiosStatement + EOL + generatedTest;

const generatedTestWithExpectImport = importAxiosStatement + importExpectStatement + EOL + generatedTest;

fs.writeFileSync(path.join(ROOT_DIR, 'expect-type-tests', 'types.test.ts'), generatedTestWithExpectImport);
fs.writeFileSync(path.join(ROOT_DIR, 'jest-all-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'jest-partial-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'vitest-all-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'vitest-partial-type-tests', 'types.test.ts'), generatedTestWithImports);
