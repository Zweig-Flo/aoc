import { readFileSync } from "fs";

const input = readFileSync('./input-day-1').toString()
const inputs = input.split('\n')

const STEP = 100



let value = 50

let result = 0

for (const rotation of inputs) {
    let parsedValue = parseInt(rotation.slice(1))
    const isAddition = rotation.startsWith('R')
    let rotated = 0

    while (parsedValue) {

        const currentMod = (100 + value) % 100
        const valuesToApply = [parsedValue, 100]

        if (currentMod) {
            valuesToApply.push(isAddition ? 100 - currentMod : currentMod)
        }

        const valueToApply = Math.min(...valuesToApply)
        console.log("🚀 ~ valueToApply:", valueToApply, parsedValue)

        value = isAddition ? value + valueToApply : value - valueToApply

        value = value % 100

        if (!value) {
            rotated++
        }

        parsedValue -= valueToApply
    }
    console.log(rotation, ' to ', value, ' clicked ', rotated, ' times. ')
    result += rotated
}
console.log(result)