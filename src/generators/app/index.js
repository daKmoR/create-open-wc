import qoa from 'qoa';
import { executeMixinGenerator } from '../../core.js';
import LintingMixin from '../linting';

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
          query: 'What would you like to scaffold?',
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
      if (scaffold === 'Starter App') {
        console.log('WIP');
      }
    }

    // eslint-disable-next-line class-methods-use-this
    async _promptUpgrade() {
      const { upgrade } = await qoa.prompt([
        {
          type: 'interactive',
          query: 'What would you like to upgrade?',
          handle: 'upgrade',
          symbol: '>',
          menu: ['Linting', 'Building'],
        },
      ]);
      if (upgrade === 'Linting') {
        executeMixinGenerator(LintingMixin);
      }
    }
  };

export default AppMixin;
