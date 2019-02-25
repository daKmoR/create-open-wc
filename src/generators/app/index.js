import qoa from 'qoa';
import { executeMixinGenerator } from '../../core.js';
import LintingMixin from '../linting';
import TestingMixin from '../testing/index.js';
import BuildingMixin from '../building/index.js';
import StarterAppMixin from '../starter-app/index.js';

const AppMixin = subclass =>
  // eslint-disable-next-line no-shadow
  class AppMixin extends subclass {
    async execute() {
      const { rootMenu } = await qoa.prompt([
        {
          type: 'interactive',
          query: 'What would you like to do today?',
          handle: 'rootMenu',
          symbol: '>',
          menu: [
            'Scaffold a new project',
            'Upgrade an existing project',
            'Nah, I am fine thanks! => exit',
          ],
        },
      ]);
      if (rootMenu === 'Scaffold a new project') {
        await this._promptScaffold();
      }
      if (rootMenu === 'Upgrade an existing project') {
        await this._promptUpgrade();
      }
    }

    // eslint-disable-next-line class-methods-use-this
    async _promptScaffold() {
      const { scaffold } = await qoa.prompt([
        {
          type: 'interactive',
          query: 'What would you like to scaffold?\nNote: Content will be written in a new folder.',
          handle: 'scaffold',
          symbol: '>',
          menu: [
            'Starter App',
            'Enterprise App Setup (if you feel lost use the Starter App first)',
            'Vanilla Web Component',
            'Mono Repo for web components',
            'Minimal playground',
          ],
        },
      ]);
      switch (scaffold) {
        case 'Starter App':
          executeMixinGenerator(StarterAppMixin);
          break;
        default:
          console.log('Sorry not yet implemented - visit us on https://github.com/open-wc/open-wc');
      }
    }

    // eslint-disable-next-line class-methods-use-this
    async _promptUpgrade() {
      const { upgrade } = await qoa.prompt([
        {
          type: 'interactive',
          query:
            'What would you like to upgrade?\nNote: Files will be written to the current folder (existing files will be overwritten)',
          handle: 'upgrade',
          symbol: '>',
          menu: ['Linting', 'Testing', 'Building'],
        },
      ]);
      switch (upgrade) {
        case 'Linting':
          executeMixinGenerator(LintingMixin);
          break;
        case 'Testing':
          executeMixinGenerator(TestingMixin);
          break;
        case 'Building':
          executeMixinGenerator(BuildingMixin);
          break;
        default:
      }
    }
  };

export default AppMixin;
