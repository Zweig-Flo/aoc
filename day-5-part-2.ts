import { readFileSync } from "fs";

const inputs = readFileSync('./input-day-5').toString().split('\n');


const ranges: string[] = []
const items: number[] = []
const freshItemRanges: { start: number, end: number }[] = []

for (const input of inputs) {
    const sanitized = input.trim()
    if (!sanitized) {
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
    freshItemRanges.push({ start: parseInt(start), end: parseInt(end) })
})

function isBetween(value: number, start: number, end: number): boolean {
    return value >= start && value <= end
}
const sortedRanages = freshItemRanges.sort((a, b) => {
    const start = a.start - b.start;
    return start === 0 ? a.end - b.end : start
})

const normalizedRanges = sortedRanages.reduce((combinedRanges, curr) => {

    const matchingRange = combinedRanges.find(range => isBetween(curr.start, range.start, range.end) || isBetween(curr.end, range.start, range.end))

    if (matchingRange) {
        matchingRange.start = Math.min(matchingRange.start, curr.start)
        matchingRange.end = Math.max(curr.end, matchingRange.end)
    } else {
        combinedRanges.push(curr)
    }
    console.log(combinedRanges)
    return combinedRanges
}, [] as { start: number, end: number }[])

console.log(normalizedRanges)

console.log(normalizedRanges.reduce((total, range) => total + range.end - range.start + 1, 0))