import fs from 'fs';
import path from 'path';
import glob from 'glob';
import deepmerge from 'deepmerge';

import Generator from './generator.js';

export async function executeMixinGenerator(Mixin) {
  class Do extends Mixin(Generator) {};
  const inst = new Do();

  await inst.execute();
}

export function copyTemplates(fromGlob, toDir = process.cwd(), data = {}) {
  glob(fromGlob, { dot: true }, function (er, files) {
    files.forEach((filePath) => {
      if (!fs.lstatSync(filePath).isDirectory()) {
        let fileContent = fs.readFileSync(filePath, 'utf-8');

        // TODO: fake template for now - find a small lit like template system
        Object.keys(data).forEach(key => {
          fileContent = fileContent.replace(new RegExp('\\${' + key + '}', 'g'), data[key]);
        });

        // find path write to
        const replace = path.join(fromGlob.replace(/\*/g, ''));
        const toPath = filePath.replace(replace, toDir + '/');

        // TODO: direct write for now => should be a virtual file system? (is it worth the heavy wight?)
        // maybe a message: Upgrade generators will override files - are you sure? is enough?
        const toPathDir = path.dirname(toPath);
        if (!fs.existsSync(toPathDir)) {
          fs.mkdirSync(toPathDir, { recursive: true });
        }
        fs.writeFileSync(toPath, fileContent);
        console.log(`Writing ${toPath}.`);
      }
    });
  });
}

export function extendJson(filePath, data) {
  let fileContent = fs.readFileSync(filePath, 'utf-8');
  const newData = deepmerge(JSON.parse(fileContent), data);
  fs.writeFileSync(filePath, JSON.stringify(newData, null, 2));
  console.log(`Writing ${filePath}.`);
}
