import fs from "fs";

const files = ["Wien", "Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg"]

const now = new Date()
let count = 0
const data = {}
files.forEach(f => {
    // @ts-ignore
    data[f] = JSON.parse(fs.readFileSync(`../data/${f}.json`, 'utf8'))
    // @ts-ignore
    count += data[f].length

})


const exportData = {}
// @ts-ignore
exportData["meta"] = {
    "exported_at": now.toISOString(),
    "license": "CC BY-SA 4.0",
    "source": "https://github.com/Findus23/RainbowRoad/tree/main/data",
    "num_crossings": count
}
// @ts-ignore
exportData["data"] = data


fs.writeFileSync("../dist/data.json", JSON.stringify(exportData, null, 2).concat('\n'))

