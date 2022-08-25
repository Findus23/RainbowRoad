import Map from "ol/Map";
import {OSM, Vector as VectorSource} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Vector as VectorLayer} from "ol/layer";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";
import {State} from "ol/render";
import {Line, Vector2d} from "./vectorUtils";
import {drawZebraCrossing, zebraPatterns} from "./zebraUtils";
import prideFlag from "../assets/prideflag.svg"
import transFlag from "../assets/transflag.svg"
import {loadData, MetaData} from "./features";
import Navigo from "navigo";
import {redirect} from "./router";
import {areas, buildAttribution, viewFromArea, Wien} from "./areaData";
import {Crossing} from "../interfaces";
import {defaults as defaultControls} from 'ol/control';
import {AreaControl} from "./controls";

export const router = new Navigo("/")
const map = new Map({
    controls: defaultControls().extend([new AreaControl({router: router})]),
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM({url: "https://maps.lw1.at/tiles/1.0.0/osm/GLOBAL_MERCATOR/{z}/{x}/{y}.png"})
        }),
    ],
    view: viewFromArea(Wien)
});
const vectorSource = new VectorSource();
let metaData: MetaData
router.on("/Wien", () => {
    map.setView(viewFromArea(Wien))
    // @ts-ignore
    import("../data/Wien.json?inline").then((data) => {
        metaData = loadData(data.default as unknown as Crossing[], vectorSource)
    })

    import("../data/Wien.json?url").then(importdata => {
        vectorSource.setAttributions(buildAttribution(importdata.default))
    })

})
router.on("/Ober%C3%B6sterreich", () => {
    map.setView(viewFromArea(areas.OOE))

    // @ts-ignore
    import("../data/Oberösterreich.json?inline").then((data) => {
        metaData = loadData(data.default as unknown as Crossing[], vectorSource)
    })
    import("../data/Oberösterreich.json?url").then(importdata => {
        vectorSource.setAttributions(buildAttribution(importdata.default))
    })

})
redirect(router, "/", "/Wien")
router.resolve()
const greenLine = new Style({
    fill: new Fill({color: '#00FF00'}),
    stroke: new Stroke({color: '#00FF00', width: 2})
})

function renderer(coordinates: Coordinate | Coordinate[] | Coordinate[][], state: State): void {
    const start = Vector2d.fromCoordList(coordinates[0] as Coordinate)
    const end = Vector2d.fromCoordList(coordinates[1] as Coordinate)
    const line = new Line(start, end)
    // console.log(line.vec.length())
    const ctx = state.context;
    const featureID = Number(state.feature.getId())
    if (!featureID || featureID > 10000) {
        return
    }
    const crossing = metaData[featureID]
    let numStripes = crossing.geo!.length / 0.5
    if (state.resolution > 0.3) {
        numStripes /= 2
    }
    if (state.resolution > 0.1) {
        numStripes /= 2
    }
    numStripes = Math.floor(numStripes)

    drawZebraCrossing(ctx, line, line.vec.length() / 2, zebraPatterns[crossing.type], numStripes)
}

const crossingsStyle = new Style({renderer: renderer})
const prideFlagStyle = new Style({
    image: new Icon({
        src: prideFlag,
        scale: 0.05
    })
})
const transFlagStyle = new Style({
    image: new Icon({
        src: transFlag,
        scale: 0.05
    })
})
const circleStyle = new Style({
    image: new Circle({
        fill: new Fill({color: "red"}),
        stroke: new Stroke({color: "green"}),
        radius: 10,
    }),
})
const vectorLineLayer = new VectorLayer({
    source: vectorSource,
    style: function (feature, resolution) {
        const zoom = map.getView().getZoomForResolution(resolution);
        if (!zoom) {
            return
        }
        if (zoom > 17) {
            return crossingsStyle
        }
        const featureID = Number(feature.getId()) - 10000
        if (!featureID || featureID < 0) {
            return
        }
        const crossing = metaData[featureID]
        if (typeof crossing==="undefined") {
            return
        }
        switch (crossing.type) {
            case "prideFlag":
                return prideFlagStyle;
            case "transFlag":
                return transFlagStyle;
        }
    }
});
map.addLayer(vectorLineLayer);


// window.bla = function () {
//     const view = map.getView()
//     map.setView(
//         new View({
//             center: fromLonLat([15.3787, 47.2089]),
//             zoom: 13,
//             // https://www.wien.gv.at/statistik/lebensraum/tabellen/stadtgebiet-eckdaten.html
//             extent: transformExtent([15.18278, 47.11833, 15.58, 47.32306], 'EPSG:4326', 'EPSG:3857'),
//             constrainOnlyCenter: true
//         }))
// }

import("./popups").then(popups => {
    popups.initPopups(map, metaData);
})
