import { readFileSync } from "fs";

const input = readFileSync('./input-day-1').toString()
const inputs = input.split('\n')


let value = 50

let result = 0

for (const rotation of inputs) {
const appliedValue = parseInt(rotation.slice(1))
    console.log('rotating ', rotation, ' from ', value)
    if (rotation.startsWith('R')) {
        value += appliedValue
    } else {
        value -= appliedValue
    }

    value = value % 100
    console.log('to ', value)
    if(!value){
        result++
    }
}

console.log( result)