
const homeworkWeb = [
    [1/3, 1/2, 0  ],
    [1/3, 0,   1/2],
    [1/3, 1/2, 1/2]
];

const webFromBook = [
    [0, 1/2, 0, 0  ],
    [1/3, 0, 0, 1/2],
    [1/3, 0, 1, 1/2],
    [1/3, 1/2, 0, 0]
];

console.log("Simple PageRank:\n\t"  + PageRank.simple(homeworkWeb, 0.001));
console.log("PageRank with taxation:\n\t"  + PageRank.withTaxation(homeworkWeb, 0.001, 0.8));
