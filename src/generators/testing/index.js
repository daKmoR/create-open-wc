import fs from 'fs';
import { extendJson, executeMixinGenerator } from '../../core.js';
import TestingKarmaMixin from '../testing-karma/index.js';
import TestingKarmaBsMixin from '../testing-karma-bs/index.js';

const TestingMixin = subclass =>
  class extends subclass {
    async execute() {
      if (super.execute) {
        super.execute();
      }

      await executeMixinGenerator(TestingKarmaMixin);
      await executeMixinGenerator(TestingKarmaBsMixin);

      // extend package.json
      extendJson(
        `${process.cwd()}/package.json`,
        JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8')),
      );
    }
  };

export default TestingMixin;
