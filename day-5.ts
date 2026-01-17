import { readFileSync } from "fs";

const inputs = readFileSync('./input-day-5').toString().split('\n');


const ranges: string[] = []
const items: number[] = []
const freshItemRanges: {start: number, end: number}[] = []

for (const input of inputs) {
    const sanitized = input.trim()
    if (!sanitized) {
        console.log('skipping ', input)
        continue;
    }
    if (sanitized.includes('-')) {
        ranges.push(sanitized)
    } else {
        items.push(parseInt(sanitized))
    }
}

 ranges.forEach(range => {
    const [start, end] = range.split('-')
    freshItemRanges.push({start: parseInt(start), end: parseInt(end)})
})


console.log(items.filter(item => freshItemRanges.some(range => range.start<= item && range.end>=item)).length)