const Graph = require('../dist/graph')
const expect = require('expect.js')

describe('Kruskal', () => {
  let graph
  it('graph instance', () => {
    graph = new Graph()
    expect(graph).to.be.ok()
  })
  let a, b, c, d, e
  it('create nodes A, B, C, D, E', () => {
    a = graph.createNode('A')
    b = graph.createNode('B')
    c = graph.createNode('C')
    d = graph.createNode('D')
    e = graph.createNode('E')
  })

  it(`connecting nodes
          2    3
      (A)--(B)--(C)
       |   / \\   |
      6| 8/   \\5 |7
       | /     \\ |
      (D)-------(E)
            9
    `, () => {
    // A <-- 2 --> B
    expect(Graph.connect({ node: a, target: b, weight: 2 })).to.be.ok()
    expect(Graph.connect({ node: b, target: a, weight: 2 })).to.be.ok()
    // A <-- 6 --> D
    expect(Graph.connect({ node: a, target: d, weight: 6 })).to.be.ok()
    expect(Graph.connect({ node: d, target: a, weight: 6 })).to.be.ok()
    // B <-- 3 --> C
    expect(Graph.connect({ node: b, target: c, weight: 3 })).to.be.ok()
    expect(Graph.connect({ node: c, target: b, weight: 3 })).to.be.ok()
    // B <-- 8 --> D
    expect(Graph.connect({ node: b, target: d, weight: 8 })).to.be.ok()
    expect(Graph.connect({ node: d, target: b, weight: 8 })).to.be.ok()
    // B <-- 5 --> E
    expect(Graph.connect({ node: b, target: e, weight: 5 })).to.be.ok()
    expect(Graph.connect({ node: e, target: b, weight: 5 })).to.be.ok()
    // C <-- 7 --> E
    expect(Graph.connect({ node: c, target: e, weight: 7 })).to.be.ok()
    expect(Graph.connect({ node: e, target: c, weight: 7 })).to.be.ok()
    // D <-- 9 --> E
    expect(Graph.connect({ node: d, target: e, weight: 9 })).to.be.ok()
    expect(Graph.connect({ node: e, target: d, weight: 9 })).to.be.ok()
  })

  it('Minimum Spanning Tree', () => {
    const treeNodes = graph.kruskal(a)
    console.log('tree nodes', treeNodes.map((con) => {
      return `(${con.target.val},${con.origin.val}): ${con.weight}`
    }).join(' '))
  })
})
