import { readFileSync } from "fs";

const input = readFileSync('./input-day-3').toString()

const inputs = input.split('\n')

let result = 0;

for(const row of inputs){
    const parsedRow = [...row].map(val => parseInt(val))

    const max = Math.max(...parsedRow.slice(undefined,parsedRow.length -1))
    const indexOfMax = parsedRow.indexOf(max) + 1

    const secondMax = Math.max(...parsedRow.slice(indexOfMax))
    const mapped = parseInt(`${max}${secondMax}`)

    result+= mapped
}

console.log(result)