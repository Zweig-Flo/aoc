import { readFileSync } from "fs";

const input = readFileSync('./input-day-6').toString()

const rows = input.split('\n').map(row => row.trim())

let result = 0;

const inputs = rows.map((val, i , array) => val.split(/\s+/).map((value) => array.length > i + 1 ? parseInt(value) : value))
const operators = inputs.pop()!
console.log("🚀 ~ operators:", operators)


operators.forEach((operator, i) => {

    const values = inputs.map(val =>
        val[i]
    )

    const equation = values.join(`${operator}`);
    const solvedEquation = eval(equation)

    result += solvedEquation;
    console.log(`${equation} = ${solvedEquation}`)

})


console.log(result)