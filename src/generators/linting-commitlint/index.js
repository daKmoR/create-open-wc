import fs from 'fs';
import { extendJson, copyTemplates } from '../../core.js';

const LintingCommitlintMixin = subclass =>
  // eslint-disable-next-line no-shadow
  class LintingCommitlintMixin extends subclass {
    async execute() {
      super.execute();

      extendJson(
        `${process.cwd()}/package.json`,
        JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8')),
      );

      copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };

export default LintingCommitlintMixin;
