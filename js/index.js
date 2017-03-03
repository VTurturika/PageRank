'use strict';

$(document).ready(() => {

    let nextId = 6;
    let network;

    let data = {
        nodes: [
            {id: 1, label: '1'},
            {id: 2, label: '2'},
            {id: 3, label: '3'},
            {id: 4, label: '4'},
            {id: 5, label: '5'},
        ],
        edges: [
            {from: 1, to: 2, arrows: 'to'},
            {from: 1, to: 3, arrows: 'to'},
            {from: 1, to: 5, arrows: 'to'},
            {from: 2, to: 1, arrows: 'to'},
            {from: 2, to: 4, arrows: 'to'},
            {from: 3, to: 1, arrows: 'to'},
            {from: 3, to: 2, arrows: 'to'},
            {from: 3, to: 4, arrows: 'to'},
            {from: 3, to: 5, arrows: 'to'},
            {from: 4, to: 5, arrows: 'to'},
            {from: 5, to: 1, arrows: 'to'},
        ]
    };

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

