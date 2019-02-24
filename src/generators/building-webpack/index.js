import fs from 'fs';
import { extendJson, copyTemplates } from '../../core.js';

const BuildingWebpackMixin = subclass =>
  class extends subclass {
    async execute() {
      super.execute();

      extendJson(
        `${process.cwd()}/package.json`,
        JSON.parse(fs.readFileSync(`${__dirname}/templates/_package.json`, 'utf-8')),
      );

      copyTemplates(`${__dirname}/templates/static/**/*`);
    }
  };

export default BuildingWebpackMixin;
