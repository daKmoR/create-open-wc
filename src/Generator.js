import path from 'path';
import { copyTemplates, copyTemplate, copyTemplateJsonInto } from './core.js';

class Generator {
  constructor() {
    this._destinationPath = process.cwd();
    this.templateData = {};
  }

  // eslint-disable-next-line class-methods-use-this
  execute() {}

  destinationPath(destination = '') {
    return path.join(this._destinationPath, destination);
  }

  copyTemplate(from, to) {
    copyTemplate(from, to, this.templateData);
  }

  copyTemplateJsonInto(from, to) {
    copyTemplateJsonInto(from, to, this.templateData);
  }

  async copyTemplates(from, to = this.destinationPath()) {
    return copyTemplates(from, to, this.templateData);
  }
}

export default Generator;
