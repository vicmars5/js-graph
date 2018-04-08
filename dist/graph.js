(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

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
      this.nodes = [];
    }

    createNode (val) {
      const node = {
        val,
        connections: []
      };
      this.nodes.push(node);
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
      };
      node.connections.push(connection);
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
      let compare;
      if (!params.node) {
        throw new Error('No node in params')
      }
      const node = params.node;
      if (params.compare) {
        compare = params.compare;
      } else {
        compare = (connection) => connection.val === params.val;
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

  module.exports = Graph;

})));
