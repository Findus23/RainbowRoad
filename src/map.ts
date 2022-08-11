import Map from "ol/Map";
import {OSM, Vector as VectorSource} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Feature, View} from "ol";
import {fromLonLat, transform, transformExtent} from "ol/proj";

import {LineString, Point} from "ol/geom";
import {Vector as VectorLayer} from "ol/layer";
import {Circle, Fill, Icon, Stroke, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";
import {State} from "ol/render";
import {Line, Vector2d} from "./vectorUtils";
import {drawZebraCrossing, zebraPatterns} from "./zebraUtils";
// @ts-ignore
import importdata from "../data/data.json?inline"
// @ts-ignore
import dataURL from "../data/data.json?url"
import {Crossing} from "../interfaces";
import prideFlag from "../assets/prideflag.svg"
import transFlag from "../assets/transflag.svg"
import {averageCoords} from "../utils/geo";

import "./style.scss"
import "hint.css/hint.base.css"




const data = importdata as Crossing[]
const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM({url: "https://maps.lw1.at/tiles/1.0.0/osm/GLOBAL_MERCATOR/{z}/{x}/{y}.png"})
        }),
    ],
    view: new View({
        center: fromLonLat([16.3787, 48.2089]),
        zoom: 13,
        // https://www.wien.gv.at/statistik/lebensraum/tabellen/stadtgebiet-eckdaten.html
        extent: transformExtent([16.18278, 48.11833, 16.58, 48.32306], 'EPSG:4326', 'EPSG:3857'),
        constrainOnlyCenter: true
    })
});
const vectorLine = new VectorSource({
    attributions: ["<a target='_blank' href='" + dataURL + "'>Rohdaten</a>"]
});
const metaData: { [id: number]: Crossing } = {}
data.sort((a, b) => {
    /*
    put trans flag on top (so they are not covered,
    but apart from that keep the drawing order random
     */
    if (a.type == "transFlag") {
        return 1
    }
    if (b.type == "transFlag") {
        return -1
    }
    return Math.random() - 0.5;
})
data.forEach(c => {
    if (typeof c.geo === "undefined") {
        return
    }
    const points = c.geo.coords.map(coord => transform(coord, 'EPSG:4326', 'EPSG:3857'));

    const featureLine = new Feature({
        geometry: new LineString(points)
    });
    const featureDot = new Feature({
        geometry: new Point(averageCoords(points))
    });
    featureLine.setId(c.id)
    featureDot.setId(c.id + 10000)
    metaData[c.id] = c
    vectorLine.addFeature(featureLine);
    vectorLine.addFeature(featureDot);
})


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
    source: vectorLine,
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
        switch (crossing.type) {
            case "prideFlag":
                return prideFlagStyle;
            case "transFlag":
                return transFlagStyle;
        }
    }
});
map.addLayer(vectorLineLayer);


import("./popups").then(popups => {
    popups.initPopups(map, metaData);
})
