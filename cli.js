const program = require('commander')
const Graph = require('./lib/graph')

program
  .version('0.0.1')

program
  .command('list-nodes')
  .action(() => {
    const graph = new Graph()
    console.log('nodes', graph.getNodeList())
  })

program
  .command('-h, --help')
  .description('help')
  .action(() => {
    program.help()
  })

if (!process.argv.slice(2).length) {
  program.help();
}

program.parse(process.argv)
