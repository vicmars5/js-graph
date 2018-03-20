const assert = require('assert')
const expect = require('expect.js')
const Graph = require('../lib/graph')

describe('Graph', () => {
  let graph;
  graph = new Graph()

  it('number of nodes is 0', () => {
    assert.equal(graph.getNodes().length, 0)
  })

  let node
  let nodes = []

  it('insert node', () => {
    node = graph.createNode('a')
    expect(node).to.be.ok()
  })

  it('node have "val"', () => {
    expect(node).to.have.key('val')
  })

  it('node have "connections"', () => {
    expect(node).to.have.key('connections')
  })

  nodes.push(node)
  it('add 3 nodes more', () => {
    nodes.push(graph.createNode('b'))
    nodes.push(graph.createNode('c'))
    nodes.push(graph.createNode('d'))
    expect(nodes).to.have.length(4)
  })

  it('connect node "a" to "b"', () => {
    const connection = Graph.connect({
      node,
      target: node[1],
      weight: 1
    })
    expect(node).to.be.ok()
    expect(connection).to.have.key('target')
    expect(connection).to.have.key('weight')
  })
})
