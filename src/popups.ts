import {Overlay} from "ol";
import {createDateWithDisclaimer, displaySources} from "./text";
import type Map from "ol/Map";
import {Crossing} from "../interfaces";
import {createElement} from "./domutils";

export function initPopups(map: Map, metaData: { [id: number]: Crossing }) {
    const container = document.getElementById('popup')!;
    const content = document.getElementById('popup-content')!;
    const closer = document.getElementById('popup-closer')!;

    const overlay = new Overlay({
        element: container,
        autoPan: {
            animation:{
                duration:250,
            }
        },
    });
    map.addOverlay(overlay);

    closer.onclick = function () {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    map.on('singleclick', function (event) {
        map.forEachFeatureAtPixel(event.pixel, feature => {
            const coordinate = event.coordinate;
            let id = Number(feature.getId())
            if (!id) {
                return
            }
            if (id > 10000) {
                id -= 10000
            }
            const crossing = metaData[id]

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
            overlay.setPosition(coordinate);

        }, {hitTolerance: 5})
        if (!map.hasFeatureAtPixel(event.pixel, {hitTolerance: 5})) {
            overlay.setPosition(undefined);
            closer.blur();
        }
    });
}
