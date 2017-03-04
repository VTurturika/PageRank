'use strict';

let network;
let nodes;
let edges;
let nextNodeId;

$(document).ready(() => {

    $("#calc").click(() => {

        let beta = +$("#beta").val();
        let precision = +$("#precision").val();

        if (beta > 0 && beta < 1 && precision > 0 && precision < 1) {

            let generatedData = generateTransitionMatrix();
            let ranks = PageRank.withTaxation(generatedData.matrix, precision, beta);

            console.log(ranks);

            generatedData.ids.forEach((id, i) => {

                let rank = (ranks[i] * 100).toPrecision(5);

                nodes.update({id: id, title: rank + "%", value: rank});
            })
        }
    });

    $("#clear").click(() => {

        nodes.forEach(node => {

            nodes.update({id: node.id, title: node.id, value: 0});
            $("#beta").val("");
            $("#precision").val("");
        })
    });

    initNetwork();
});

function generateNetworkData() {

    nodes = new vis.DataSet();
    nodes.add([
        {id: 0, value: 0, label: '0'},
        {id: 1, value: 0, label: '1'},
        {id: 2, value: 0, label: '2'},
        {id: 3, value: 0, label: '3'},
        {id: 4, value: 0, label: '4'},
    ]);

    edges = new vis.DataSet();
    edges.add([
        {id: "01", from: 0, to: 1, arrows: 'to'},
        {id: "14", from: 1, to: 4, arrows: 'to'},
        {id: "21", from: 2, to: 1, arrows: 'to'},
        {id: "23", from: 2, to: 3, arrows: 'to'},
        {id: "34", from: 3, to: 4, arrows: 'to'},
        {id: "40", from: 4, to: 0, arrows: 'to'},
        {id: "42", from: 4, to: 2, arrows: 'to'},
    ]);

    return {nodes: nodes, edges: edges};
}

function initNetwork() {

    let container = document.getElementById('network');
    let options = {

        manipulation: {
            addNode: function (data, callback) {

                data.id = nextNodeId;
                data.title = nextNodeId;
                data.label = nextNodeId++;
                data.value = 0;
                callback(data);
            },

            addEdge: function (data, callback) {

                data.id = "" + data.from + data.to;
                data.arrows = "to";
                callback(data);
            }
        },

        physics: {solver: 'forceAtlas2Based'},
        nodes: {
            scaling: {
                label: {
                    min: 10,
                    max: 30
                }
            }
        }
    };

    network = new vis.Network(container, generateNetworkData(), options);
    nextNodeId = nodes.length;
}

function generateTransitionMatrix() {

    let maxId = nodes.max("id").id + 1;
    let matrix = [];
    let nodesIds = [];

    nodes.forEach(node => {

        let row = new Array(maxId).fill(0);

        connectedNodesFromNode(node.id).forEach((connectedNode, _, array) => {

            row[connectedNode] = 1 / array.length;
        });

        matrix.push(row);
        nodesIds.push(node.id)
    });

    matrix = matrix[0].map((x, i) => matrix.map(x => x[i])); // transposing matrix
    let resultMatrix = [];

    for (let i = 0; i < maxId; i++) {

        if (nodesIds.indexOf(i) != -1) {

            resultMatrix.push(matrix[i])
        }
    }

    return {matrix: resultMatrix, ids: nodesIds};
}

function connectedNodesFromNode(nodeId) {

    let result = [];

    edges.get().forEach(edge => {

        if (edge.from == nodeId) {
            result.push(edge.to);
        }
    });

    return result;
}

