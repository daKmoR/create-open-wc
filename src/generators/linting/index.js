import LintingEsLint from '../linting-eslint/index.js';

const LintingMixin = subclass => class LintingMixin extends LintingEsLint(subclass) {
  execute() {
    if (super.execute) {
      super.execute();
    }
    // extend package.json
    this.fs.extendJSON(
      this.destinationPath('package.json'),
      this.fs.readJSON(this.templatePath('_package.json')),
    );

    // write everything else
    this.fs.copyTpl(
      this.templatePath('static/**/*'),
      this.destinationPath(),
      this.config.getAll(),
      undefined,
      { globOptions: { dot: true } },
    );
  }
}

export default LintingMixin;
