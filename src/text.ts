import {Source} from "../interfaces";
import {createElement} from "./domutils";
import {faviconByHostname} from "./favicon";

export function prettyDate(isoDate: string): string {
    return new Date(isoDate).toLocaleDateString()
}

export function displaySources(sources: Source[]) {
    const urlSources = sources.filter(s => s.url)
    const sourcesBlock = createElement("div")
    if (urlSources.length === 0) {
        return sourcesBlock
    }
    sourcesBlock.classList.add("sources")
    console.log(sources)
    const heading = createElement("p")
    heading.innerText = "Weitere Infomationen:"
    sourcesBlock.appendChild(heading)
    urlSources.forEach(s => {
        const img = createElement("img")
        const a = createElement("a")
        a.rel = "noopener"
        a.target = "_blank"
        a.classList.add("hint--top")
        img.src = ""
        img.width = img.height = 24
        a.appendChild(img)
        a.href = s.url! // TODO: missing url
        const favicon = faviconByHostname(a.hostname, a.pathname)
        if (favicon) {
            img.src = favicon
        }
        if (img.src === document.URL) {
            a.innerText = a.hostname
        }
        a.title = prettyDate(s.date) + ": " + a.hostname
        if (s.title){
            a.title = a.title + " (" + s.title + ")"
        }
        a.setAttribute("aria-label", a.title)
        sourcesBlock.appendChild(a)
    })
    return sourcesBlock
}

export function createDateWithDisclaimer(sources: Source[]): HTMLDivElement {
    const dateWithDisclaimer = createElement("div")
    const dates = sources.filter(s => s.type != "proposal").map(s => s.date).sort()
    const dateP = createElement("p")
    const disclaimerP = createElement("p")
    disclaimerP.innerText = "Das angezeigte Datum ist der Zeitpunkt der ersten Erwähnung in Medien " +
        "oder des ersten Bild auf Google Streetview."
    disclaimerP.style.display = "none"
    if (dates.length > 0) {
        dateP.innerText = prettyDate(dates[0])
    } else {
        dateP.innerText = "Datum unbekannt"
    }
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
