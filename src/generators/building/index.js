import { executeMixinGenerator } from '../../core.js';
import BuildingWebpackMixin from '../building-webpack/index.js';

const BuildingMixin = subclass =>
  class extends subclass {
    async execute() {
      if (super.execute) {
        super.execute();
      }

      await executeMixinGenerator(BuildingWebpackMixin);
    }
  };

export default BuildingMixin;
