import {Coordinate} from "ol/coordinate";
import {Extent} from "ol/extent";
import {View} from "ol";
import {fromLonLat, transformExtent} from "ol/proj";

interface Area {
    name: string
    center: Coordinate
    extent: Extent
    zoom: number
}


export const areas: { [name: string]: Area } = {
    Wien: {
        name: "Wien",
        zoom: 13,
        center: [16.3787, 48.2089],
        // https://www.wien.gv.at/statistik/lebensraum/tabellen/stadtgebiet-eckdaten.html
        extent: [16.18278, 48.11833, 16.58, 48.32306]
    },
    OOE: {
        name: "Oberösterreich",
        zoom: 9,
        // https://doris.ooe.gv.at/service/pdf/mittelpunkte/4.pdf
        center: [13.964417, 48.136583],
        // https://www.deine-berge.de/Region/Oesterreich/8/Bundesland-Oberoesterreich.html
        extent: [12.749244, 47.461112, 14.9921682, 48.7725637]
    }
}

export const Wien = areas.Wien

export function viewFromArea(area: Area): View {
    return new View({
        center: fromLonLat(area.center),
        zoom: area.zoom,
        // extent: transformExtent(area.extent, 'EPSG:4326', 'EPSG:3857'),
        constrainOnlyCenter: true
    })
}

export function buildAttribution(dataURL: string) {
    return ["<a target='_blank' href='" + dataURL + "'>Rohdaten</a>"]
}
