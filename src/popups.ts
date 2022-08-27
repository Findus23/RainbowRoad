import {Feature, Overlay} from "ol";
import {createDateWithDisclaimer, displaySources} from "./text";
import type Map from "ol/Map";
import {Crossing} from "../interfaces";
import {createElement} from "./domutils";
import "hint.css/hint.base.css"
import {router} from "./router";
import VectorSource from "ol/source/Vector";
import {FeatureProperties} from "./features";
import {Point} from "ol/geom";

const container = document.getElementById('popup')!;
const content = document.getElementById('popup-content')!;
const closer = document.getElementById('popup-closer')!;
const overlay = new Overlay({
    element: container,
    autoPan: {
        animation: {
            duration: 250,
        }
    },
});

export function initPopups(map: Map, vectorSource: VectorSource) {

    map.addOverlay(overlay);

    closer.onclick = function () {
        router.navigateReplace("/")
        return false;
    };
    map.on('singleclick', event => {
        map.forEachFeatureAtPixel(event.pixel, feature => {
            const coordinate = event.coordinate;
            const crossing: Crossing = feature.getProperties().crossing
            router.navigateReplace("/flag/" + crossing.id)
        }, {hitTolerance: 5})
        if (!map.hasFeatureAtPixel(event.pixel, {hitTolerance: 5})) {
            router.navigateReplace("/")

        }
    });
    router.on("/flag/:id", (match) => {
        const id = match?.data?.id
        if (!id) {
            return
        }
        console.log("routing")
        console.info(id)

        const feature = vectorSource.getFeatureById(id) as Feature<Point>
        if (!feature) {
            return
        }
        console.log(feature.getProperties())

        const featureProperties = feature.getProperties() as FeatureProperties
        const crossing = featureProperties.crossing

        content.innerHTML = "";
        const p = createElement("p")
        p.innerText = crossing.name
        p.classList.add("name")
        content.appendChild(p)

        const dateWithDisclaimer = createDateWithDisclaimer(crossing.sources)
        content.appendChild(dateWithDisclaimer)

        if (crossing.comment) {
            const p = createElement("p")
            const small = createElement("small")
            small.innerText = crossing.comment
            p.appendChild(small)
            content.appendChild(p)
        }
        const sourcesBlock = displaySources(crossing.sources)
        content.appendChild(createElement("hr"))
        content.appendChild(sourcesBlock)
        overlay.setPosition(feature.getGeometry()?.getCoordinates());

    })
    router.on("/", () => {
        overlay.setPosition(undefined);
        closer.blur();
    })
    router.resolve()

}
