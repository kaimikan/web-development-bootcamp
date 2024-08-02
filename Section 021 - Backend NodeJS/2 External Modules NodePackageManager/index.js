// npm init - setups project, creates package.json file
// npm install *packagename* *another package name...* - installs a package (install can be shortened to i)

//! CJS = common javascript version below
// need to add "type": "commonjs" or to leave it empty, in package.json to use

// var generateName = require('sillyname');
// var sillyName = generateName();

//! ESM = ECMAscript modules (newer and better)
// need to add "type": "module", in package.json to use
import generateNameECMA from 'sillyname';
var sillyName = generateNameECMA();

console.log('A silly name: ' + sillyName);

// ---

import { randomSuperhero } from 'superheroes';
const randomHeroName = randomSuperhero();
console.log(`Superhero name: ${randomHeroName}`);
