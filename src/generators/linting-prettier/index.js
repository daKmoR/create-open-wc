import fs from 'fs';
import { extendJson, copyTemplates } from '../../core.js';

const LintingPrettierMixin = subclass => class LintingPrettierMixin extends subclass {
  execute() {
    super.execute();

    extendJson(`${process.cwd()}/package.json`, {
      "scripts": {
        "lint:prettier": "prettier '**/*.js' --list-different || (echo '↑↑ these files are not prettier formatted ↑↑' && exit 1)",
        "format:prettier": "prettier '**/*.js' --write"
      },
      "devDependencies": {
        "@open-wc/prettier-config": "^0.1.0"
      }
    });

    fs.copyFileSync(`${__dirname}/templates/_prettier.config.js`, `${process.cwd()}/prettier.config.js`);

    copyTemplates(`${__dirname}/templates/static/**/*`);
  }
};

export default LintingPrettierMixin;
