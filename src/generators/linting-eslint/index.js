import { extendJson, copyTemplates } from '../../core.js';

const LintingEsLintMixin = subclass => class LintingEsLintMixin extends subclass {
  async execute() {
    super.execute();

    extendJson(
      `${process.cwd()}/package.json`,
      JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8'))
    );

    copyTemplates(`${__dirname}/templates/static/**/*`);
  }
};

export default LintingEsLintMixin;
