import Graph from "./graph.js";

export function graphFromEncoding(encoding) {
  var copyGraph = new Graph();
  copyGraph.addVertex();
  for (var i = 0; i < encoding.length; i++) {
    copyGraph.addVertexId(encoding[i]);
  }
  if (copyGraph.nodes.length - 1 != copyGraph.edges.length) {
    throw "incorrect construction from copy";
  }
  return copyGraph;
}

export function codeFromGraph(graph) {
  var graphCopy = graphFromEncoding(graph.encoding);
  var result = "";

  while (graphCopy.nodes.length > 2) {
    let u = smallestLeaf(graphCopy);
    console.log("smallest leaf id= " + u.id);
    let i = smallestNeighbor(graphCopy, u);
    console.log("smallestNeighbor id= " + i.id);
    console.log("");
    result = result + " " + i.id;
    reduce(graphCopy, u);
  }
  console.log(result);
  return result;
}

export function smallestLeaf(graphCopy) {
  console.log(
    "trying to find smallest leaf with " + graphCopy.nodes.length + " nodes"
  );

  for (var j = 0; j < graphCopy.nodes.length; j++) {
    let noder = graphCopy.nodes[j];

    if (noder.degree == 1) return noder;
  }
  throw "couldn't find a leaf in smallestLeaf subroutine";
}

export function smallestNeighbor(graphCopy, vertex) {
  var id = Math.min.apply(
    Math,
    vertex.neighbors.map((x) => x.id)
  );

  for (var i = 0; i < vertex.neighbors.length; i++) {
    if (vertex.neighbors[i].id == id) return vertex.neighbors[i];
  }

  throw "coudln't find a smallest neighbor in smallestNeighbor subroutine";
}

export function reduce(graphCopy, vertex) {
  let indexToRemove = vertex.id;

  console.log("remove vertex id " + vertex.id);

  for (var i = 0; i < vertex.neighbors.length; i++) {
    let neighbor = vertex.neighbors[i];
    neighbor.degree = neighbor.degree - 1;
    let index = neighbor.neighbors.indexOf(vertex);
    neighbor.neighbors.splice(index, 1);
  }

  for (var i = 0; i < graphCopy.edges.length; i++) {
    var edge = graphCopy.edges[i];
    if (edge.node1.id == indexToRemove || edge.node2.id == indexToRemove) {
      graphCopy.edges.splice(i, 1);
      console.log("removed edge");
    }
  }

  let indexinArrayToRemove = -1;
  for (var i = 0; i < graphCopy.nodes.length; i++) {
    if (graphCopy.nodes[i].id == vertex.id) {
      indexinArrayToRemove = i;
    }
  }

  if (indexinArrayToRemove == -1) {
    throw "coudln't find edge-to-remove in array with id = " + vertex.id;
  }
  graphCopy.nodes.splice(indexinArrayToRemove, 1);
}
