// Advent of Code 2023 - Day 02
const fs = require('fs');
const STDIN = 0;

// STDIO → [string]
const input = () => fs
    .readFileSync(STDIN, 'UTF-8')
    .split('\n')
    .filter(line => line.length > 0);

// string → integer
const toInteger = item => parseInt(item, 10);

// string → set
// set := {red: integer, green: integer, blue: integer}
const parseSet = set => {
    const hands = set
        .split(', ')
        .map(hand => hand.trim().split(' '));
    const parsed = {
        red: 0,
        green: 0,
        blue: 0
    }
    let color, count;
    for (hand of hands) {
        [count, color] = hand;
        parsed[color] = toInteger(count);
    }
    return parsed;
};

// string → game
// game := {id: integer, sets: [{red: integer, green: integer, blue: integer}]
const parseGameLine = line => {
    const [idPart, setsPart] = line.split(': ');
    return {
        id: toInteger(idPart.slice(5)),
        sets: setsPart.split(';').map(parseSet)
    };
};

// constraint → set → boolean
// constraint := {red: integer, green: integer, blue: integer}
// set := {red: integer, green: integer, blue: integer}
const isSetPossibleUsing = constraint => set => 
    set.red <= constraint.red
    && set.green <= constraint.green
    && set.blue <= constraint.blue;

// constraint → game → boolean
// constraint := {red: integer, green: integer, blue: integer}
// game := {id: integer, sets: [{red: integer, green: integer, blue: integer}]
const isGamePossibleUsing = constraint => game => 
    game.sets.every(isSetPossibleUsing(constraint));

// string → object → any
const property = name => object => object.hasOwnProperty(name)
    ? object[name]
    : undefined;

// (integer, integer) → integer
const add = (a, b) => a + b;

const inputData = input();

const constraint = {
    red: 12,
    green: 13,
    blue: 14
};

// Part 1
const part1 = inputData
    .map(parseGameLine)
    .filter(isGamePossibleUsing(constraint))
    .map(property('id'))
    .reduce(add, 0);

console.log(part1);


// ---

// [integer] → integer
const max = list => list.reduce((a,b) => a > b ? a : b, 0);

// game → constraint
// game := {id: integer, sets: [{red: integer, green: integer, blue: integer}]
// constraint := {red: integer, green: integer, blue: integer}
const getMinimalConstraint = game => ({
    red: max(game.sets.map(property('red'))),
    green: max(game.sets.map(property('green'))),
    blue: max(game.sets.map(property('blue'))),
});

// constraint → integer
// constraint := {red: integer, green: integer, blue: integer}
const constraintPower = constraint => 
    constraint.red * constraint.green * constraint.blue;

// Part 2
const part2 = inputData
    .map(parseGameLine)
    .map(getMinimalConstraint)
    .map(constraintPower)
    .reduce(add, 0);

console.log(part2);

