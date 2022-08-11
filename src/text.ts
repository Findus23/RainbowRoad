import {Source} from "../interfaces";
import gggIcon from "../assets/favicons/ggg.at_redrawn.png"
import meinBezirkIcon from "../assets/favicons/meinbezirk.at.png"
import kurierIcon from "../assets/favicons/kurier.at.png"
import spoeIcon from "../assets/favicons/spoe.png"
import neosIcon from "../assets/favicons/neos.png"
import WienIcon from "../assets/favicons/wien.gv.at.png"
import derStandardIcon from "../assets/favicons/derstandard.at.png"
import {createElement} from "./domutils";

export function prettyDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString()
}

export function displaySources(sources: Source[]) {
    const sourcesBlock = createElement("div")
    sourcesBlock.classList.add("sources")
    const heading = createElement("p")
    heading.innerText = "Weitere Infomationen:"
    sourcesBlock.appendChild(heading)
    sources.forEach(s => {
        if (!s.url) {
            return
        }
        const img = createElement("img")
        const a = createElement("a")
        a.rel = "noopener"
        a.target = "_blank"
        a.classList.add("hint--top")
        img.src = ""
        img.width = img.height = 24
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
                img.src = WienIcon
                break
            case "www.derstandard.at":
                img.src=derStandardIcon
                break
        }

        if (a.hostname.includes("spoe")) {
            img.src = spoeIcon
        }
        if (img.src === document.URL) {
            a.innerText = a.hostname
        }
        a.title = prettyDate(s.date) + ": " + a.hostname
        a.setAttribute("aria-label", a.title)
        sourcesBlock.appendChild(a)
    })
    return sourcesBlock
}

export function createDateWithDisclaimer(sources: Source[]): HTMLDivElement {
    const dateWithDisclaimer = createElement("div")
    const earliestDate = sources.map(s => s.date).sort()[0]
    const dateP = createElement("p")
    const disclaimerP = createElement("p")
    disclaimerP.innerText = "Das angezeigte Datum ist der Zeitpunkt der ersten Erwähnung in Medien " +
        "oder des ersten Bild auf Google Streetview."
    disclaimerP.style.display = "none"
    dateP.innerText = prettyDate(earliestDate)
    const starLink = createElement("a")
    starLink.href = "#"
    starLink.innerText = "*"
    starLink.classList.add("star")
    starLink.addEventListener("click", function (e) {
        disclaimerP.style.display = "block"
        e.preventDefault()
        return false
    })

    dateP.appendChild(starLink)
    dateWithDisclaimer.appendChild(dateP)
    dateWithDisclaimer.appendChild(disclaimerP)
    return dateWithDisclaimer
}
