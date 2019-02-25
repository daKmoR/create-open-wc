import TestingKarmaMixin from '../testing-karma/index.js';
import TestingKarmaBsMixin from '../testing-karma-bs/index.js';

const TestingMixin = subclass =>
  class extends TestingKarmaBsMixin(TestingKarmaMixin(subclass)) {
    async execute() {
      await super.execute();

      // extend package.json
      this.copyTemplateJsonInto(
        `${__dirname}/templates/_package.json`,
        this.destinationPath('package.json'),
      );

      console.log('... Testing Done');
    }
  };

export default TestingMixin;
