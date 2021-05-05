import Node from "./node.js";
import Edge from "./edge.js";

export default class Graph {
  constructor() {
    this.nodes = [];
    this.edges = [];
    this.encoding = [];
  }

  nextId() {
    return (
      Math.max.apply(
        Math,
        this.nodes.map((x) => x.id)
      ) + 1
    );
  }

  addVertex() {
    var indexOfNeighbor = Math.floor(Math.random() * this.nodes.length);
    var newnode;
    if (this.nodes.length == 0) {
      newnode = new Node(0);
    } else {
      newnode = new Node(this.nextId());
      newnode.secondaryConstructor(this.nodes[indexOfNeighbor]);
      this.encoding.push(indexOfNeighbor);
      console.log("pushed " + indexOfNeighbor);
    }

    this.nodes.push(newnode);

    if (this.nodes.length != 1) {
      this.edges.push(
        new Edge(this.nodes[indexOfNeighbor], this.nodes[newnode.id])
      );
    }
  }

  addVertexId(id) {
    var newnode;

    newnode = new Node(this.nextId());
    newnode.secondaryConstructor(this.nodes[id]);
    this.nodes.push(newnode);

    if (this.nodes.length != 1) {
      this.edges.push(new Edge(this.nodes[id], this.nodes[newnode.id]));
    }
  }

  removeVertex() {
    let indexToRemove = this.nextId() - 1;
    this.encoding.pop();

    for (var i = 0; i < this.nodes[indexToRemove].neighbors.length; i++) {
      var neighbor = this.nodes[indexToRemove].neighbors[i];
      neighbor.degree -= 1;
      let index = neighbor.neighbors.indexOf(this.nodes[indexToRemove]);
      neighbor.neighbors.splice(index, 1);
    }

    for (var i = 0; i < this.edges.length; i++) {
      var edge = this.edges[i];
      if (edge.node1.id == indexToRemove || edge.node2.id == indexToRemove) {
        this.edges.splice(i, 1);
        console.log("removed edge");
      }
    }

    this.nodes.splice(indexToRemove, 1);
  }
}
