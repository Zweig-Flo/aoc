import { readFileSync } from "fs";

const input = readFileSync('./input-day-4').toString()
const rows = input.split('\n').map(val => [...val])


let amountOfCalls = 0

function removeRolls(totalRemoved?: number) {
    amountOfCalls++
    let removedThisRound = 0;
    for (let y = 0; y < rows.length; y++) {
        for (let x = 0; x < rows[y].length; x++) {
            if (rows[y][x] !== '@') {
                continue;
            }

            let count = 0;
            const startX = Math.max(0, x - 1)
            const startY = Math.max(0, y - 1)

            const endX = Math.min(x + 2, rows[y].length)
            const endY = Math.min(y + 2, rows.length)

            for (let k = startY; k < endY; k++) {
                for (let i = startX; i < endX; i++) {
                    if (k === y && i === x) {
                        continue;
                    }
                    if (rows[k][i] === '@' || rows[k][i] === 'x') {
                        count++
                    }
                }
            }
            if (count < 4) {
                rows[y][x] = 'x'
                removedThisRound += 1
            }
        }


    }
    for (let i = 0; i < rows.length; i++) {
        for (let k = 0; k < rows[i].length; k++) {
            if (rows[i][k] === 'x') {
                rows[i][k] = '.'
            }
        }
    }
    if (removedThisRound) {
        return removeRolls(removedThisRound + (totalRemoved ?? 0))
    } else {
        return totalRemoved
    }

}



const result = removeRolls()

console.log(amountOfCalls)
console.log(result)