import { extendJson, copyTemplates } from '../../core.js';

const LintingEsLintMixin = subclass => class LintingEsLintMixin extends subclass {
  execute() {
    super.execute();

    extendJson(`${process.cwd()}/package.json`, {
      "scripts": {
        "lint:eslint": "eslint --ext .js,.html .",
        "format:eslint": "eslint --ext .js,.html . --fix"
      },
      "devDependencies": {
        "@open-wc/eslint-config": "^0.3.0"
      }
    });

    copyTemplates(`${__dirname}/templates/static/**/*`);
  }
};

export default LintingEsLintMixin;
