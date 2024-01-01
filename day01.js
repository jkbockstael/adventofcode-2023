// Advent of Code 2023 - Day 01
const fs = require('fs');
const STDIN = 0;

// STDIO → [string]
const input = () => fs
    .readFileSync(STDIN, 'UTF-8')
    .split('\n')
    .filter(line => line.length > 0);

// string → boolean
const isDigit = character => '0123456789'.includes(character);

// string → [string]
const takeDigits = line => Array.from(line).filter(isDigit);

// [string] → [string]
const firstAndLast = list => [list[0], list[list.length - 1]];

// [string] → string
const combine = list => list[0] + list[1];

// string → integer
const toInteger = item => parseInt(item, 10);

// (integer, integer) → integer
const add = (a, b) => a + b;

const inputData = input();

const part1 = inputData
    .map(takeDigits)
    .map(firstAndLast)
    .map(combine)
    .map(toInteger)
    .reduce(add, 0);

console.log(part1);


// (string, string) → string
const concatenate = (a,b) => `${a}${b}`;

// string → string
const reverse = word => Array.from(word)
    .reverse()
    .reduce(concatenate, '');

// string → string
const parseNumbers = word => {
    const tokens = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

    const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    const findToken = word => token => ({
        token: token,
        position: word.indexOf(token)
        });

    const found = match => match.position !== -1;

    const matches = tokens => word => tokens
        .map(findToken(word))
        .filter(found)
        .sort((a,b) => a.position - b.position)
    
    const parseFirstNumber = tokens => word => {
        const tokenMatches = matches(tokens)(word);
        if (tokenMatches.length === 0) {
            return word;
        }
        // ignore the matched token if there's a digit before
        const digitMatches = matches(digits)(word);
        if (digitMatches.length > 0
            && digitMatches[0].position < tokenMatches[0].position) {
            return word;
        }
        const firstToken = tokenMatches[0].token;
        return word.replace(firstToken, tokens.indexOf(firstToken));
    };

    const firstParsed = parseFirstNumber(tokens)(word);
    const lastParsed = parseFirstNumber(tokens.map(reverse))(reverse(firstParsed));

    return reverse(lastParsed);
}

const part2 = inputData
    .map(parseNumbers)
    .map(takeDigits)
    .map(firstAndLast)
    .map(combine)
    .map(toInteger)
    .reduce(add, 0);

console.log(part2);
