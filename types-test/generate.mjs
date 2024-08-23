import fs from 'fs';
import path from 'path';

const ROOT_DIR = import.meta.dirname;

const LINE_BREAK = '\n';

const generatedTest = fs
  .readFileSync(path.join(ROOT_DIR, 'generated-file.ts'), { encoding: 'utf8' })
  .split(LINE_BREAK) // remove imports from file
  .slice(4)
  .join(LINE_BREAK);

const importAxiosStatement = `import axios from 'axios';${LINE_BREAK}`;

const importExpectStatement = `import expect from 'expect';${LINE_BREAK}`;

const generatedTestWithImports = importAxiosStatement + LINE_BREAK + generatedTest;

const generatedTestWithExpectImport = importAxiosStatement + importExpectStatement + LINE_BREAK + generatedTest;

fs.writeFileSync(path.join(ROOT_DIR, 'expect-type-tests', 'types.test.ts'), generatedTestWithExpectImport);
fs.writeFileSync(path.join(ROOT_DIR, 'jest-all-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'jest-partial-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'vitest-all-type-tests', 'types.test.ts'), generatedTestWithImports);
fs.writeFileSync(path.join(ROOT_DIR, 'vitest-partial-type-tests', 'types.test.ts'), generatedTestWithImports);
