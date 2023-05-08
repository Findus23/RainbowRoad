import {Crossing} from "../interfaces";
import fs from "fs";
import axios, {AxiosResponse} from "axios";

interface WBMSnapshot {
    available: boolean
    url: string
    timestamp: string
    status: string
}

interface WBMResponse {
    url: string
    archived_snapshots: { closest: WBMSnapshot }
}

const files = ["Wien", "Burgenland", "Kärnten", "Niederösterreich", "Oberösterreich", "Salzburg", "Steiermark", "Tirol", "Vorarlberg"]

let urls: string[] = []

function checkURLs() {
    files.forEach(f => {
        const data: Crossing[] = JSON.parse(fs.readFileSync(`../data/${f}.json`, 'utf8'));
        data.forEach(cr => {
            cr.sources.forEach(s => {
                if (typeof s.url === "undefined") {
                    return
                }
                urls.push(s.url)
            })
        })
    })


    // urls = [urls[0]]
    let requests: Promise<AxiosResponse<any, any>>[] = []

    urls.forEach(url => {
        console.log("https://web.archive.org/save/"+url)
        // requests.push(axios.get("https://archive.org/wayback/available", {params: {url}}))
    })
    process.exit()

    axios.all(requests).then(responses => {
        responses.forEach(r => {
            let archived: boolean = false
            const data: WBMResponse = r.data
            console.info(data)
            if (Object.keys(data.archived_snapshots).length === 0) {
                archived = false;
                console.log(data.url)
                return
            }
            const snapshot = data.archived_snapshots.closest
            if (snapshot.status != "200" || !snapshot.available) {
                archived = false;
                console.log(data.url)
                return

            }
            // console.warn(data.url)


        })
    })
}

checkURLs()
