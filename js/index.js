'use strict';

let data = {
    nodes: [
        {id: 0, label: '0'},
        {id: 1, label: '1'},
        {id: 2, label: '2'},
        {id: 3, label: '3'},
        {id: 4, label: '4'},
    ],
    edges: [
        {from: 0, to: 1, arrows: 'to'},
        {from: 0, to: 2, arrows: 'to'},
        {from: 0, to: 4, arrows: 'to'},
        {from: 1, to: 0, arrows: 'to'},
        {from: 1, to: 3, arrows: 'to'},
        {from: 2, to: 0, arrows: 'to'},
        {from: 2, to: 1, arrows: 'to'},
        {from: 2, to: 3, arrows: 'to'},
        {from: 2, to: 4, arrows: 'to'},
        {from: 3, to: 4, arrows: 'to'},
        {from: 4, to: 0, arrows: 'to'},
    ]
};

let network;
let nextId = data.nodes.length;

$(document).ready(() => {

    let container = document.getElementById('network');
    let options = {

        manipulation: {
            addNode: function (data, callback) {

                data.id = nextId;
                data.label = nextId++;
                callback(data);
            },

            addEdge: function (data, callback) {

                data.arrows = "to";
                callback(data);
            }
        },

        physics: {solver: 'forceAtlas2Based'}
    };

    network = new vis.Network(container, data, options);
});

function generateTransitionMatrix() {

    let nodesCount = Object.keys(network.getPositions()).length;
    let matrix = [];

    for (let i = 0; i < nodesCount; i++) {

        let row = new Array(nodesCount).fill(0);

        connectedNodesFromNode(i).forEach( (node, _, array) => {

            row[node] = 1/array.length;
        });

        matrix.push(row);
    }

    return matrix[0].map((x,i) => matrix.map(x => x[i])); // transposed matrix
}

function connectedNodesFromNode(nodeId) {

    let result = [];

    network.getConnectedEdges(nodeId).forEach(edgeId => {

        let edge = network.body.edges[edgeId];

        if (edge.fromId == nodeId) {

            result.push(edge.toId);
        }
    });

    return result;
}

