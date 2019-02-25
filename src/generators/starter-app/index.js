import path from 'path';
import qoa from 'qoa';
import LintingMixin from '../linting/index.js';
import BuildingMixin from '../building/index.js';
import TestingMixin from '../testing/index.js';

function getClassName(tagName) {
  return tagName
    .split('-')
    .reduce((previous, part) => previous + part.charAt(0).toUpperCase() + part.slice(1), '');
}

const StarterAppMixin = subclass =>
  class extends BuildingMixin(TestingMixin(LintingMixin(subclass))) {
    async execute() {
      // before super to also affect the Mixin it applies
      let tagName = '';
      do {
        // eslint-disable-next-line no-await-in-loop
        const result = await qoa.prompt([
          {
            type: 'input',
            query: 'Give it a tag name (min two words separated by dashes)',
            handle: 'tagName',
          },
        ]);
        // eslint-disable-next-line prefer-destructuring
        tagName = result.tagName;
      } while (/^([a-z])(?!.*[<>])(?=.*-).+$/.test(tagName) === false);
      const className = getClassName(tagName);

      this.templateData = { ...this.templateData, tagName, className };

      this._destinationPath = path.join(process.cwd(), tagName);

      console.log('Setup Starter App...');
      await super.execute();

      // write & rename app-template
      this.copyTemplate(
        `${__dirname}/templates/_app.js`,
        this.destinationPath(`src/${tagName}.js`),
      );

      // write & rename test-template
      this.copyTemplate(
        `${__dirname}/templates/_test.js`,
        this.destinationPath(`test/${tagName}.test.js`),
      );

      this.copyTemplateJsonInto(
        `${__dirname}/templates/_package.json`,
        this.destinationPath('package.json'),
      );

      await this.copyTemplates(`${__dirname}/templates/static/**/*`);

      console.log('');
      console.log('You are all set up now!');
      console.log('');
      console.log('All you need to do is run:');
      console.log(`  cd ${tagName}`);
      console.log('  npm run start');
      console.log('');
    }
  };

export default StarterAppMixin;
