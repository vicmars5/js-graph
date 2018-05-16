const Graph = require('../lib/graph')

const run = () => {
  const graph = new Graph()

  console.log('graph',`
          2    3
      (A)--(B)--(C)
       |   / \\   |
      6| 8/   \\5 |7
       | /     \\ |
      (D)-------(E)
            4
  `)
  const a = graph.createNode('A')
  const b = graph.createNode('B')
  const c = graph.createNode('C')
  const d = graph.createNode('D')
  const e = graph.createNode('E')

  // A <-- 2 --> B
  Graph.connect({ node: a, target: b, weight: 2 })
  Graph.connect({ node: b, target: a, weight: 2 })
  // A <-- 6 --> D
  Graph.connect({ node: a, target: d, weight: 6 })
  Graph.connect({ node: d, target: a, weight: 6 })
  // B <-- 3 --> C
  Graph.connect({ node: b, target: c, weight: 3 })
  Graph.connect({ node: c, target: b, weight: 3 })
  // B <-- 8 --> D
  Graph.connect({ node: b, target: d, weight: 8 })
  Graph.connect({ node: d, target: b, weight: 8 })
  // B <-- 5 --> E
  Graph.connect({ node: b, target: e, weight: 5 })
  Graph.connect({ node: e, target: b, weight: 5 })
  // C <-- 7 --> E
  Graph.connect({ node: c, target: e, weight: 7 })
  Graph.connect({ node: e, target: c, weight: 7 })
  // D <-- 9 --> E
  Graph.connect({ node: d, target: e, weight: 4 })
  Graph.connect({ node: e, target: d, weight: 4 })

  const treeNodes = graph.kruskal(a)
  console.log('tree nodes', treeNodes.map((con) => {
    return `(${con.target.val},${con.origin.val}): ${con.weight}`
  }).join(' '))
}
module.exports = run
