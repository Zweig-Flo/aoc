import { readFile, readFileSync } from "fs";

const input = readFileSync('./input-day-2').toString()

const inputs = input.split(',')

let result = 0

for (const range of inputs){
    const [start, end] = range.split('-')
    for(let i = parseInt(start); i<= parseInt(end) ; i++){
        const targetString = i.toString()
        for(let sequenceLength = 1; sequenceLength<= targetString.length /2 ; sequenceLength++){
            let searchString = targetString.slice(0, sequenceLength)
            let isRepeating = true
            let currentIndex = sequenceLength
            while(isRepeating && currentIndex< targetString.length){
                const targetSubString = targetString.slice(currentIndex, currentIndex + sequenceLength)
                currentIndex += sequenceLength 
                if(targetSubString !== searchString){
                    isRepeating = false
                }
            }

            if(isRepeating){
                console.log(i)
                result+= i
                break;
            }
        }


    }

}

console.log(result)