import {Coordinate} from "ol/coordinate";
import {Extent} from "ol/extent";
import {View} from "ol";
import {fromLonLat} from "ol/proj";

interface Area {
    name: string
    center?: Coordinate
    extent: Extent
    zoom: number
}


export const areas: { [name: string]: Area } = {
    AT: {
        name: "Österreich",
        zoom: 8,
        // https://de.wikipedia.org/wiki/Geographie_%C3%96sterreichs
        extent: [9.530768, 46.372132, 17.160749, 49.020703]
    },
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
    },
    NOE: {
        name: "Niederösterreich",
        zoom: 9,
        // https://www.deine-berge.de/Region/Oesterreich/7/Bundesland-Nieder%C3%B6sterreich.html
        extent: [14.4526384, 47.4222062, 17.068839, 49.0205306]
    }
}

export const Wien = areas.Wien

export function viewFromArea(area: Area): View {
    let center;
    const extent = area.extent
    if (area.center) {
        center = area.center
    } else {
        center = [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2]
    }
    return new View({
        center: fromLonLat(center),
        zoom: area.zoom,
        // extent: transformExtent(area.extent, 'EPSG:4326', 'EPSG:3857'),
        constrainOnlyCenter: true
    })
}

export function buildAttribution(dataURL: string) {
    return ["<a target='_blank' href='" + dataURL + "'>Rohdaten</a>"]
}
