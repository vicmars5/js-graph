const Graph = require('../dist/graph')
const expect = require('expect.js')

describe('Islands finder', () => {
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

    x = graph.createNode('X')
    y = graph.createNode('Y')
    z = graph.createNode('Z')
  })

  it(`connecting nodes
          2    3             9    9
      (A)--(B)--(C)      (X)--(Y)--(Z)
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

    // X <-- 9 --> Y
    expect(Graph.connect({ node: x, target: y, weight: 9 })).to.be.ok()
    expect(Graph.connect({ node: y, target: x, weight: 9 })).to.be.ok()
    // Y <-- 9 --> Z
    expect(Graph.connect({ node: y, target: z, weight: 9 })).to.be.ok()
    expect(Graph.connect({ node: z, target: y, weight: 9 })).to.be.ok()
  })

  it('Create island from A with 5 nodes', () => {
    const island = Graph.getIsland(a)
    expect(island.length).to.be(5)
  })
  it('Create island from X with 3 nodes', () => {
    const island = Graph.getIsland(x)
    expect(island.length).to.be(3)
  })
  it('Get all islands', () => {
    let nodes = [...graph.getNodes()] // clone nodes array
    const islands = []
    let node
    let island = null
    while (nodes.length) {
      node = nodes.pop()
      island = Graph.getIsland(node)
      nodes = nodes.reduce((newNodes, node) => {
        if (!island.find((n) => n === node)) {
          newNodes.push(node)
        }
        return newNodes
      }, [])
      islands.push(island)
    }
    expect(islands.length).to.be(2)
    console.log('islands\n', islands.map((island, index) => {
      const nodesStr = island.map((node) => {
        return node.val
      }).join(', ')
      return `island ${index}:\n${nodesStr}`
    }).join('\n'))
  })
})
