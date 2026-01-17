import { readFileSync } from "fs";

const input = readFileSync('./input-day-6').toString()

let total = 0;

const numbers = input.split('\n').filter(val => val)
console.log(numbers)
const operatorRow = numbers.pop()!
console.log(operatorRow)
const operatorLocations = []

for (let i = 0; i < operatorRow.length; i++) {
    if (operatorRow[i] !== ' ') {
        operatorLocations.push(i)
    }
}


console.log(operatorLocations)


for (let k = 0; k < operatorLocations.length; k++) {
    let numbersToOperate: number[] = []
    for (let i = operatorLocations[k]; i < (operatorLocations[k + 1] ?? operatorRow.length); i++) {
        const numberString = numbers.reduce((val, curr) => curr[i] !== ' ' ? `${val}${curr[i]}` : val, '')
        if (numberString) {

            numbersToOperate.push(parseInt(numberString))
        }

    }

    const equation = numbersToOperate.join(operatorRow[operatorLocations[k]])
    const result = eval(equation)
    total += result
    console.log(`${equation} = ${result}`)
}

console.log(total)