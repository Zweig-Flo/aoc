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

let particles: { index: number, count: number }[] = []
const start = rows[0].indexOf('|')
particles = [{ index: start, count: 1 }]


const splitersByLevel = [...splittersUsed].map(val => {
    const [row, index] = val.split('-').map(val => parseInt(val))
    return { rowIndex: row, index }
})

console.log(splitersByLevel)
for (let i = 1; i < rows.length; i++) {
    let modified: typeof particles = []
    for (let k = 0; k < rows[i].length; k++) {
        const matchingSplitter = splitersByLevel.find(splitter => splitter.rowIndex === i && splitter.index === k)
        const matchingParticles = particles.find(val => val.index === k)

        if (!matchingParticles) {
            continue;
        }
        function addToTarget(index: number, count: number) {

            const target = modified.find(value => value.index === index)
            if (target) {
                target.count += count
            } else {

                modified.push({ index, count })
            }
        }
        if (!matchingSplitter) {
            addToTarget(matchingParticles.index, matchingParticles.count)
            continue;

        }

        if (k > 0) {
            addToTarget(matchingParticles.index - 1, matchingParticles.count)
        }
        if (k < rows[i].length - 1) {
            addToTarget(matchingParticles.index + 1, matchingParticles.count)
        }
    }
    particles = modified
    console.log(`as of row ${i} there are ${modified.reduce((total, curr) => total + curr.count, 0)} ways`)
}

