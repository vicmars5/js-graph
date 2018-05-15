/**
 * Node schema
 * Node {
 *   val: Object,
 *   connections: Array<Node>
 * }
 *
 * Connection {
 *   target: Node
 * }
 */
class Graph {
  constructor () {
    this.nodes = []
  }

  createNode (val) {
    const node = {
      val,
      connections: []
    }
    this.nodes.push(node)
    return node
  }

  /**
   * @param {JSON} node - Origin node. Read Node schema
   * @param {JSON} node - Target node. Read Node schema
   * @param {number} weight - Connection weight
   */
  static connect ({ node, target, weight }) {
    const connection = {
      target,
      weight: weight || 1
    }
    node.connections.push(connection)
    return connection
  }

  /**
   * TODO
   * @param {JSON} params
   * @param {Object} params.val - Not required
   * @param {Function} params.compare - Compare function
   * @param {JSON} params.node - Origin node
   */
  static disconnect (params) {
    let compare
    if (!params.node) {
      throw new Error('No node in params')
    }
    const node = params.node
    if (params.compare) {
      compare = params.compare
    } else {
      compare = (connection) => connection.val === params.val
    }
    return this.node.connections.findIndex(node, compare) // this might not work
  }

  /**
   * TODO
   * @param {JSON} from - Node
   * @param {JSON} target - Node
   */
  static path (from, target) {
    // TODO
  }

  /**
   * @return {Array<JSON>} - List of nodes
   */
  getNodes () {
    return this.nodes
  }

  /**
   * @return {Object} - first node. Return null if there are no nodes
   */
  getFirstNode () {
    if (this.nodes.length === 0) {
      return null
    }
    return this.nodes[0]
  }

  /**
   * Get minimum spaning tree (MST)
   */
  prim (startNode) {
    // clone all nodes in graph
    const treeNodes = this.nodes.map((node) => ({
      node,
      visited: false,
      parent: null,
      weight: startNode === node ? 0 : Infinity
    }))

    // Iterate over all the elements in the array
    treeNodes.forEach(() => {
      const minTreeNodePos = Graph.primMinKey(treeNodes)
      const minTreeNode = minTreeNodePos.treeNode
      minTreeNode.visited = true
      minTreeNode.node.connections.forEach((connection) => {
        const treeNode = treeNodes.find((tn) => tn.node === connection.target)
        if (!treeNode.visited && connection.weight < treeNode.weight) {
          treeNode.weight = connection.weight
          treeNode.parent = minTreeNode
        }
      })
    })

    return treeNodes
  }

  /**
   * @param {Array<JSON>} treeNodes
   * @param {weight} treeNodes
   * @param {boolean} visited
   * @return {JSON}
   * @return {Number} .index
   * @return {JSON} .treeNode
   * @return {Number} .weight
   */
  static primMinKey (treeNodes) {
    /**
     * min: {
     *  treeNode: JSON
     *  index: Number
     *  weight: Number
     * }
     */
    return treeNodes.reduce((min, treeNode, index) => {
      if (!treeNode.visited && treeNode.weight < min.weight) {
        return {
          index,
          treeNode,
          weight: treeNode.weight
        }
      }
      return min
    }, { weight: Infinity, index: -1 })
  }

  static primParseTree (treeNodes) {
    const treeIndex = treeNodes.findIndex(({ parent }) => parent === null)
    const parent = treeNodes.splice(treeIndex, 1)[0]
    const leafs = Graph.primParseTreeFindLeafs(parent, treeNodes)
    return {
      node: parent.node.val,
      weight: parent.weight,
      leafs
    }
  }

  static primParseTreeFindLeafs (parent, treeNodes) {
    const leafNodesIndexes = treeNodes.reduce((indexes, leaf, index) => {
      if (leaf.parent === parent) {
        indexes.push(index)
      }
      return indexes
    }, [])
    const leafNodes = leafNodesIndexes.map((leafIndex) => {
      return treeNodes.splice(leafIndex, 1)[0]
    })
    const leafs = leafNodes.map((leafNode) => {
      const subLeafs = Graph.primParseTreeFindLeafs(leafNode, treeNodes)
      return {
        node: leafNode.node.val,
        weight: leafNode.weight,
        leafs: subLeafs
      }
    })

    return leafs
  }

  /**
   * Get Minimum Spanning Tree (MST)
   * @return MST
   */
  kruskal () {
    const unsortedConnections = this.nodes.reduce((connections, node) => {
      node.connections.forEach((connection) => {
        // is the inverse connection
        const paralelCon = connections.find((c) => {
          return c.target === node && c.origin === connection.target
        })
        if (!paralelCon || connection.weight < paralelCon.weight) {
          connections.push({
            ...connection,
            origin: node
          })
        }
      })
      return connections
    }, [])

    // incremental array sort
    const connections = unsortedConnections.sort((a, b) => {
      return a.weight - b.weight
    })

    //console.log('sorted connection')
    //console.log(connections.map(({ origin, weight, target }) => {
    //  return `${origin.val} - ${weight} -> ${target.val}`
    //}).join('\n'))

    const visitedNodes = []
    let smallerCon
    while (connections.length) {
      smallerCon = connections.shift()
      const notCircular = !Graph.kruskalIsCircular(visitedNodes, smallerCon.origin, smallerCon.target)
      if (notCircular) {
        visitedNodes.push(smallerCon)
      }
    }
    return visitedNodes
  }

  /*
   * @param {array} treeConnections - Current connections we have in the tree
   * @parma {JSON} nodeA - <Graph.Node>
   * @parma {JSON} nodeA - <Graph.Node> Node we are searching
   */
  static kruskalIsCircular (treeConnections, nodeA, nodeB, visited = new Set()) {
    return treeConnections.some((con) => {
      let target = null
      if (visited.has(con)) {
        return false
      }
      if (con.origin === nodeA) {
        target = con.target
      }
      if (con.target === nodeA) {
        target =  con.origin
      }
      if (target === nodeB) {
        return true
      }
      if (target) {
        visited.add(con)
        return Graph.kruskalIsCircular(treeConnections, target, nodeB, visited)
      }
      return false
    })
  }

  /*
   * @params {node} start
   */
  dijkstra (start) {
    const visited = []
    const nodes = this.nodes.map((node) => ({
      node,
      weight: node === start ? 0 : Infinity,
      parent: null
    }))

    while (nodes.length) {
      let min = null
      nodes.forEach((node) => {
        if (min === null || node.weight < min.weight) {
          min = node
        }
      })

      if (!min) {
        break
      }

      const index = nodes.findIndex((node) => node === min)
      nodes.splice(index, 1)
      visited.push(min)

      min.node.connections.forEach((connection) => {
        const weight = connection.weight + min.weight
        const target = connection.target
        const node = nodes.find(({ node }) => node === target)

        if (node && node.weight > weight) {
          node.weight = weight
          node.parent = min.node
        }
      })
    }
    return visited
  }

  /**
   * @param {array} tree - point data
   * @param {json} tree[].node - Reference to node in graph
   * @param {number} tree[].weight - Weight from the beginning of three to the
   *     point
   * @param {json} tree[].parent - Path to the parent node
   * @param {json} target - Node reference
   */
  static getPathFromParent (three, target) {
    const targetPoint = three.find(({ node }) => node === target)
    const rootPoint = three.find(({ parent }) => parent === null)
    const path = []
    let current = targetPoint

    path.push(current.node)
    while (current !== rootPoint) {
      const parent = current.parent // parent node. it is not a point
      current = three.find(({ node }) => node === parent)
      path.push(current.node)
    }

    return {
      weight: targetPoint.weight,
      start: rootPoint.node,
      path
    }
  }

  /**
   * @param {JSON} from - Origin node
   * @param {JSON} to - Target node
   */
  getFastestPath (from, to) {
  }

  /**
   * find node
   * @param {Function} compare - Params node
   * @return {JSON} node - If not found null
   */
  find (compare) {
    return this.nodes.find(compare)
  }
}

module.exports = Graph
