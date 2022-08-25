import {Control} from "ol/control"
import {Options} from "ol/control/Control"
import Navigo from "navigo";
import {router} from "./map";

interface CustomOptions extends Options {
    router: Navigo
}

export class AreaControl extends Control {
    private textbox: HTMLDivElement

    constructor(opt_options: CustomOptions) {
        const options = opt_options || {}

        const button = document.createElement('button')
        button.innerText = 'c'

        const element = document.createElement('div')
        element.id = "city-selector"
        element.className = 'ol-unselectable ol-control'
        element.appendChild(button)

        const textbox = document.createElement('div')

        textbox.classList.add("textbox")
        textbox.classList.add("ol-control")

        const test = ["Wien", "Oberösterreich"]
        test.forEach(n => {
            const a = document.createElement('a')
            a.href = "/" + encodeURIComponent(n)
            a.innerText = n
            a.dataset.navigo = ""
            textbox.appendChild(a)
        })
        // textbox.style.display = "none"
        element.appendChild(textbox)
        router.updatePageLinks()

        super({
            element: element,
            target: options.target,
        });
        this.textbox = textbox
        button.addEventListener('click', this.handleClick.bind(this), false)
    }

    handleClick() {
        if (this.textbox.style.display === "block") {
            this.textbox.style.display = "none"
        } else {
            this.textbox.style.display = "block"
        }
    }
}
