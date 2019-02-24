import fs from 'fs';
import { extendJson, copyTemplates, executeMixinGenerator } from '../../core.js';
import LintingEsLint from '../linting-eslint/index.js';
import LintingPrettierMixin from '../linting-prettier/index.js';
import LintingCommitlintMixin from '../linting-commitlint/index.js';

const LintingMixin = subclass =>
  // eslint-disable-next-line no-shadow
  class LintingMixin extends subclass {
    async execute() {
      if (super.execute) {
        super.execute();
      }

      await executeMixinGenerator(LintingEsLint);
      await executeMixinGenerator(LintingPrettierMixin);
      await executeMixinGenerator(LintingCommitlintMixin);

      // extend package.json
      extendJson(
        `${process.cwd()}/package.json`,
        JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8')),
      );

      // write everything else
      copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };

export default LintingMixin;
