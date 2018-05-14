const Graph = require('../lib/graph')

const graph = new Graph()
let s, a, b, c, d, f;
s = graph.createNode('s')
a = graph.createNode('a')
b = graph.createNode('b')
c = graph.createNode('c')
d = graph.createNode('d')
f = graph.createNode('f')

Graph.connect({
  node: s,
  target: a,
  weight: 5
})
Graph.connect({
  node: s,
  target: b,
  weight: 2
})
Graph.connect({
  node: a,
  target: d,
  weight: 2
})
Graph.connect({
  node: a,
  target: c,
  weight: 4
})
Graph.connect({
  node: b,
  target: a,
  weight: 8
})
Graph.connect({
  node: b,
  target: d,
  weight: 7
})
Graph.connect({
  node: d,
  target: f,
  weight: 1
})
Graph.connect({
  node: c,
  target: f,
  weight: 3
})

const three = graph.dijkstra(s)

console.log('path', three)

const path = Graph.getPathFromParent(three, d)
console.log('path to d', path)
