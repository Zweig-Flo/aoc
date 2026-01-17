import { readFileSync } from "fs";

const input = readFileSync('./input-day-7').toString()
const rows = input.split('\n')
let splittersUsed: Set<string> = new Set()
// let beamsNextToSplitters: Set<string> = new Set()
function replaceStringAt(original: string, char: string, index: number): string {
    return original.substring(0, index) + char + original.substring(index + 1)
}

for (let row_index = 0; row_index < rows.length; row_index++) {
    for (let i = 0; i < rows[row_index].length; i++) {
        if (row_index === 0) {
            if (rows[row_index][i] === 'S') {
                rows[row_index] = replaceStringAt(rows[row_index], '|', i)
            }
            continue;
        }
        const isReplaceable = rows[row_index][i] === '.'
        const isBeamAbove = rows[row_index - 1][i] === '|'
        const isSplitterToTheLeft = rows[row_index][i - 1] === '^'
        const isSplitterToTheRight = rows[row_index][i + 1] === '^'
        const isBeamSplittedFromTheLeft = isSplitterToTheLeft && rows[row_index - 1][i - 1] === '|'
        const isBeamSplittedFromTheRight = isSplitterToTheRight && rows[row_index - 1][i + 1] === '|'

        if (isReplaceable
            && (isBeamAbove || isBeamSplittedFromTheLeft || isBeamSplittedFromTheRight)) {
            if (isBeamSplittedFromTheLeft) {
                splittersUsed.add(`${row_index}-${i - 1}`)
                // beamsNextToSplitters.add(`${row_index}-${i}`)
            }
            if (isBeamSplittedFromTheRight) {
                splittersUsed.add(`${row_index}-${i + 1}`)
                // beamsNextToSplitters.add(`${row_index}-${i}`)
            }
            rows[row_index] = replaceStringAt(rows[row_index], '|', i)
        }
    }
}

const art = rows.join('\n')

console.log(art)


console.log(`There were ${splittersUsed.size} splitters used`)