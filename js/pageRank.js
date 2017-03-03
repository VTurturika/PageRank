class PageRank {

    static accuracyAchieved(a, b, precision) {
        a = a._data;
        b = b._data;
        return a.every((elem, i) => Math.abs(elem - b[i]) < precision);
    }

    static simple(nodes, precision) {

        let nodesMatrix = math.matrix(nodes);
        let rank = math.matrix(new Array(nodes.length).fill(1 / nodes.length));
        let oldRank;

        do {
            oldRank = math.clone(rank);
            rank = math.multiply(nodesMatrix, rank);
        }
        while (!this.accuracyAchieved(rank, oldRank, precision));

        return rank._data;
    }

    static withTaxation(nodes, precision, beta) {

        let nodesMatrix = math.multiply(math.matrix(nodes), beta);
        let rank = math.matrix(new Array(nodes.length).fill(1 / nodes.length));
        let eVector = math.matrix(new Array(nodes.length).fill((1 - beta) / nodes.length));
        let oldRank;

        do {
            oldRank = math.clone(rank);
            rank = math.add(math.multiply(nodesMatrix, rank), eVector)
        }
        while (!this.accuracyAchieved(rank, oldRank, precision));

        return rank._data;
    }
}




