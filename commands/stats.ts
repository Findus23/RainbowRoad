import * as fs from "fs";
import type {Crossing} from "../interfaces";

export type Output = { "labels": string[], "values": number[] }

function runstats() {
    const data: Crossing[] = JSON.parse(fs.readFileSync("../data/Wien.json", 'utf8'));

    console.log("total", data.length)

    const bezirke = data.map(c => c.bezirk!)
    const counts: { [key: number]: number } = {};

    for (const num of bezirke) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log(counts)


    const files = ["Wien", "Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg"]
    const dateCounts: { [key: string]: number } = {}
    for (let year = 2019; year <= 2023; year++) {
        for (let month = 1; month <= 12; month++) {
            dateCounts[year + "-" + String(month).padStart(2, "0")] = 0
        }
    }
    console.log(dateCounts)

    files.forEach(f => {
        const data: Crossing[] = JSON.parse(fs.readFileSync(`../data/${f}.json`, 'utf8'));
        data.forEach(cr => {
            const dates = cr.sources.filter(s => s.type != "proposal").map(s => s.date).sort()
            const date = new Date(dates[0])
            if (isNaN(date.getTime())) {
                return
            }
            const dateStr = date.toISOString().slice(0, 7)
            dateCounts[dateStr] = dateCounts[dateStr] ? dateCounts[dateStr] + 1 : 1;
        })

    })
    const dateCountList = []
    for (let dateCountsKey in dateCounts) {
        dateCountList.push({
            key: dateCountsKey,
            value: dateCounts[dateCountsKey]
        })
    }
    dateCountList.sort((a, b) => a.key.localeCompare(b.key))
    const labels: string[] = []
    const values: number[] = []
    dateCountList.forEach(el => {
        labels.push(el.key)
        values.push(el.value)
    })
    console.log(labels)
    console.log(values)
    const output: Output = {labels, values}
    fs.writeFileSync("../stats.json", JSON.stringify(output))
}

runstats()
