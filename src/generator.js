import qoa from 'qoa';

class Generator {
  constructor() {
    this.prompt = (...params) => {
      qoa.prompt(...params);
    }
  }

  // async prompting() {
  //   this.promptResult = await qoa.prompt(this.prompts);
  // }

  writing() {
    console.log('...');
  }

  execute() {}
}

export default Generator;

