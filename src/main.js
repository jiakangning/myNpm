const program = require('commander');
const path = require('path');
const { version } = require('./constant');

const mapActions = {
  create: {
    alias: 'c',
    description: 'create a project',
    examples: [
      'caf-init create a <project-name>',
    ],
  },
  config: {
    alias: 'conf',
    description: 'config project variable',
    examples: [
      'caf-init config set <k> <v>',
    ],
  },
  '*': {
    alias: '',
    description: 'command is not found',
    examples: [],
  },
};

Reflect.ownKeys(mapActions).forEach((action) => {
  program
    .command(action)
    .alias(mapActions[action].alias)
    .description(mapActions[action].description)
    .action(() => {
      if (action === '*') {
        console.log(mapActions[action].description);
      } else {
        //   引入js并执行
        require(path.resolve(__dirname, action))(...process.argv.splice(3));
      }
    });
});

program.on('--help', () => {
  Reflect.ownKeys(mapActions).forEach((action) => {
    mapActions[action].examples.forEach((examples) => {
      console.log(`  ${examples}`);
    });
  });
});
program.version(version).parse(process.argv);
