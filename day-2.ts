import { readFile, readFileSync } from "fs";

const input = readFileSync('./input-day-2').toString()

const inputs = input.split(',')

let result = 0

for (const range of inputs){
    const [start, end] = range.split('-')
    for(let i = parseInt(start); i<= parseInt(end) ; i++){
        const targetString = i.toString()

        if(targetString.length % 2 != 0){
            continue;
        }

        const firstPart = targetString.slice(0, targetString.length / 2)
        const secondPart = targetString.slice(targetString.length/ 2)

        if(secondPart === firstPart){
            result += i
        }
    }

}

console.log(result)