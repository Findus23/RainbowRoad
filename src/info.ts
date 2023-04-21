import {Control} from "ol/control";
import {Options} from "ol/control/Control";
import {router} from "./router";
import {createElement, createElementWithContent, dlSet} from "./domutils";
import "./stats"
import {addStatsChart} from "./stats";

const overlay = document.getElementById("overlay")!

export class InfoButton extends Control {
    constructor(opt_options: Options) {
        const options = opt_options || {};

        const button = createElement('a');
        button.dataset.navigo = ""
        button.href = "/about"
        button.innerHTML = 'i';

        const element = createElement('div');
        element.className = 'info-button ol-unselectable ol-control';
        element.appendChild(button);
        router.updatePageLinks()

        super({
            element: element,
            target: options.target,
        });

        // button.addEventListener('click', this.handleRotateNorth.bind(this), false);
    }
}

router.on("/about", () => {
    showOverlay()
})

export function hideOverlay(): void {
    overlay.style.display = "none"
}


export function setOverlay(): void {
    overlay.innerHTML = ""
    const content = createElement("div")
    content.className = "content box"
    const h1 = createElementWithContent("h1", "Rainbox Road")
    content.appendChild(h1)

    const p = createElement("p")
    p.innerText = "Eine (noch unvollständige) Sammlung aller Regenbogen-Zebrastreifen in Österreich. " +
        "Hinweise über fehlende Einträge können an rainbowroad@lw1.at geschickt werden!"
    content.appendChild(p)

    content.appendChild(dlSet(
        "Source-Code:",
        "github.com/Findus23/RainbowRoad",
        "https://github.com/Findus23/RainbowRoad"
    ))

    content.appendChild(dlSet(
        "Andere Projekte:",
        "lw1.at",
        "https://lw1.at/de/"
    ))

    content.appendChild(dlSet(
        "Impressum:",
        "lw1.at/de/impressum/",
        "https://lw1.at/de/impressum/"
    ))
    // addStatsChart(content)
    overlay.appendChild(content)

}

export function showOverlay(): void {
    setOverlay()
    overlay.style.display = "flex"
}


if (import.meta.hot) {
    import.meta.hot.accept((newModule) => {
        if (newModule) {
            newModule.setOverlay()
        }
    })
}
