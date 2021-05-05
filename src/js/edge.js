import Node from "./node.js";

export default class Edge {
  constructor(node1, node2) {
    if (node1.id >= node2.id) {
      throw "invalid edge " + node1.id + " " + node2.id;
    }

    this.node1 = node1;
    this.node2 = node2;
  }
}
