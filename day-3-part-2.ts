import { readFileSync } from "fs";

const input = readFileSync('./input-day-3').toString()

const inputs = input.split('\n')
const amountOfDigits = 12;

let result = 0;

for(const row of inputs){
    const highestNumberParts : number [] = []
    let lastUsedIndex = -1
    const parsedRow = [...row].map(val => parseInt(val))


    while(lastUsedIndex < row.length && highestNumberParts.length < amountOfDigits){
        const availableValues = parsedRow.slice(lastUsedIndex + 1 , parsedRow.length - amountOfDigits + highestNumberParts.length + 1)
        console.log("🚀 ~ availableValues:", availableValues)
        const max = Math.max(...availableValues)
        highestNumberParts.push(max)
        lastUsedIndex += availableValues.indexOf(max) +1 
    }

    const mapped = parseInt(highestNumberParts.join(''))
    console.log("🚀 ~ mapped:", mapped)

    result+= mapped
}

console.log(result)