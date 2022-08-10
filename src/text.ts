import {Source} from "../interfaces";
import gggIcon from "../assets/favicons/ggg.at_redrawn.png"
import meinBezirkIcon from "../assets/favicons/meinbezirk.at.png"
import kurierIcon from "../assets/favicons/kurier.at.png"
import spoeIcon from "../assets/favicons/spoe.png"
import neosIcon from "../assets/favicons/neos.png"
import WienIcon from "../assets/favicons/wien.gv.at.png"

export function displaySources(sources: Source[], content: HTMLElement) {
    sources.forEach(s => {
        if (!s.url) {
            return
        }
        const img = document.createElement("img")
        const a = document.createElement("a")
        a.rel = "noopener"
        a.target = "_blank"
        a.title = s.date
        img.src = ""
        img.width = img.height = 32
        a.appendChild(img)
        a.href = s.url! // TODO: missing url
        switch (a.hostname) {
            case "www.ggg.at":
                img.src = gggIcon
                break
            case "www.meinbezirk.at":
                img.src = meinBezirkIcon
                break
            case "kurier.at":
                img.src = kurierIcon
                break
            case "www.neos.eu":
                img.src = neosIcon
                break
            case "www.wien.gv.at":
                img.src=WienIcon
                break
        }
        if (a.hostname.includes("spoe")) {
            img.src = spoeIcon
        }
        if (img.src === document.URL) {
            a.innerText = a.hostname
        }
        content.appendChild(a)
    })
}
