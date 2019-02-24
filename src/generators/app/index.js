import qoa from 'qoa';
import LintingEsLintMixin from '../linting-eslint';
import { executeMixinGenerator } from '../../executeMixinGenerator';

const choices = {
  appStarter: 'Create Open Web Components Starter App',
  appProduction: 'Create Open Web Components Enterprise App Setup (if you feel lost use the Starter App first)',
  wcVanilla: 'Create a vanilla web component following the Open Web Components recommendations',
  wcUpgrade: 'Upgrade my existing web component to use the Open Web Components recommendations',
  nothing: 'Nah, I am fine thanks! => exit',
};

const AppMixin = subclass => class AppMixin extends subclass {
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
  }

  async _promptUpgrade() {
    const { upgrade } = await qoa.prompt([
      {
        type: 'interactive',
        query: 'What would you like to upgrade?',
        handle: 'upgrade',
        symbol: '>',
        menu: [
          'Linting',
          'Building',
        ],
      },
    ]);
    if (upgrade === 'Linting') {
      executeMixinGenerator(LintingEsLintMixin);
    }
    console.log(upgrade);
  }
}

export default AppMixin;
