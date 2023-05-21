import {Control} from "ol/control";
import {Options} from "ol/control/Control";
import {createElement} from "./domutils";
import {router} from "./router";

export class MapButton extends Control {
    showingOrtho = false

    constructor(opt_options: Options) {
        const options = opt_options || {};

        const button = createElement('button');
        button.innerHTML = 'm';

        const element = createElement('div');
        element.className = 'map-button ol-unselectable ol-control';
        element.appendChild(button);
        router.updatePageLinks()

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleToggle.bind(this), false);
    }

    handleToggle() {
        const firstLayer = this.getMap()!.getLayers().getArray()[0]
        const secondLayer = this.getMap()!.getLayers().getArray()[1]
        const thirdLayer = this.getMap()!.getLayers().getArray()[2]

        this.showingOrtho = !this.showingOrtho
        firstLayer.setVisible(!this.showingOrtho)
        secondLayer.setVisible(this.showingOrtho)
        thirdLayer.setOpacity(this.showingOrtho ? 0.2 : 1)
    }
}
