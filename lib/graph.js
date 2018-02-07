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
  contructor () {
    this.nodes = []
  }

  createNode (val) {
    const node = {
      val,
      connections
    }
    this.nodes.push(val)
    return node
  }

  /**
   * @param {JSON} node - Origin node. Read Node schema
   * @param {JSON} node - Target node. Read Node schema
   * @param {number} weight - Connection weight
   */
  static connectNode({ node, target, weight }) {
    const connection = {
      target,
      wegith
    }
    node.connections.push(connection)
    return connection
  }

  /**
   * @param {JSON} params
   * @param {Object} params.val - Not required
   * @param {Function} params.compare - Compare function
   * @param {JSON} params.node - Origin node
   */
  static removeConnection (params) {
    let compare
    if (!params.node) {
      throw new Error('No node in params')
    }
    const node = params.node
    if (params.compare) {
      compare = compare
    } else {
      compare = (connection) => connection.val === params.val
    }
    return this.node.connections.findIndex(node)
  }
}
