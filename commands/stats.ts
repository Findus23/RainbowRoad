import * as fs from "fs";
import type {Crossing} from "../interfaces";

function runstats() {
    const data: Crossing[] = JSON.parse(fs.readFileSync("../data/Wien.json", 'utf8'));

    console.log("total", data.length)

    const bezirke = data.map(c => c.bezirk!)
    const counts: { [key: number]: number } = {};

    for (const num of bezirke) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    console.log(counts)

}

runstats()
