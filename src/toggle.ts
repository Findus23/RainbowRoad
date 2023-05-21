import {Control} from "ol/control";
import {Options} from "ol/control/Control";
import {createElement} from "./domutils";
import {router} from "./router";

interface CustomOptions extends Options {
    buttonLetter: string
    buttonClass: string
}

abstract class MapButton extends Control {

    constructor(opt_options: CustomOptions) {
        const options = opt_options || {buttonLetter: "o", buttonClass: "placeholder"};
        const button = createElement('button');
        button.innerHTML = options.buttonLetter;

        const element = createElement('div');
        element.className = 'ol-unselectable ol-control';
        element.classList.add(options.buttonClass)
        element.appendChild(button);
        router.updatePageLinks()

        super({
            element: element,
            target: options.target,
        });

        button.addEventListener('click', this.handleToggle.bind(this), false);
    }

    abstract handleToggle(): void

    protected mapLayers() {
        const osmLayer = this.getMap()!.getLayers().getArray()[0]
        const basemapLayer = this.getMap()!.getLayers().getArray()[1]
        const orthoLayer = this.getMap()!.getLayers().getArray()[2]
        const zebraLayer = this.getMap()!.getLayers().getArray()[3]

        return {osmLayer, basemapLayer, orthoLayer, zebraLayer};
    }

}

export class OrthophotoControl extends MapButton {
    showingOrtho = false
    constructor() {
        super({
            buttonLetter: "o",
            buttonClass: "ortho-button"
        });
    }

    handleToggle() {
        const {osmLayer, basemapLayer, orthoLayer, zebraLayer} = this.mapLayers();

        this.showingOrtho = !this.showingOrtho
        osmLayer.setVisible(!this.showingOrtho)
        basemapLayer.setVisible(false)
        orthoLayer.setVisible(this.showingOrtho)
        zebraLayer.setOpacity(this.showingOrtho ? 0.2 : 1)
    }

}

export class BasemapControl extends MapButton {
    showingBasemap = false

    constructor() {
        super({
            buttonLetter: "b",
            buttonClass: "basemap-button"
        });
    }
    handleToggle() {
        const {osmLayer, basemapLayer, orthoLayer, zebraLayer} = this.mapLayers();

        this.showingBasemap = !this.showingBasemap
        osmLayer.setVisible(!this.showingBasemap)
        orthoLayer.setVisible(false)
        basemapLayer.setVisible(this.showingBasemap)
        zebraLayer.setOpacity( 1)
    }

}
