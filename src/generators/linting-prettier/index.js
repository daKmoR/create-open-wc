import fs from 'fs';
import { extendJson, copyTemplates } from '../../core.js';

const LintingPrettierMixin = subclass =>
  class extends subclass {
    async execute() {
      super.execute();

      extendJson(
        `${process.cwd()}/package.json`,
        JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8')),
      );

      fs.copyFileSync(
        `${__dirname}/templates/_prettier.config.js`,
        `${process.cwd()}/prettier.config.js`,
      );

      copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };

export default LintingPrettierMixin;
