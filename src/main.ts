import Map from "ol/Map";
import {OSM, Vector as VectorSource} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Feature, Overlay, View} from "ol";
import {fromLonLat, transform, transformExtent} from "ol/proj";

import {LineString, Point} from "ol/geom";
import {Vector as VectorLayer} from "ol/layer";
import "./style.css"
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


function averageCoords(coords: number[][]): number[] {
    return [
        (coords[0][0] + coords[1][0]) / 2,
        (coords[0][1] + coords[1][1]) / 2
    ]
}


const data = importdata as Crossing[]
const map = new Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new OSM({url: "https://maps.lw1.at/tiles/1.0.0/osm/GLOBAL_MERCATOR/{z}/{x}/{y}.png"})
        }),
    ],
    // view: new View({
    //     center: fromLonLat([16.3787, 48.2089]),
    //     zoom: 12,
    //     extent: transformExtent([16.2988, 48.1353, 16.4986, 48.2974], 'EPSG:4326', 'EPSG:3857'),
    //     constrainOnlyCenter: true
    // })
    view: new View({
        center: fromLonLat([16.3787, 48.2089]),
        zoom: 13,
        extent: transformExtent([16.2988, 48.1353, 16.4986, 48.2974], 'EPSG:4326', 'EPSG:3857'),
        constrainOnlyCenter: true
    })
});
var vectorLine = new VectorSource({
    attributions: ["<a target='_blank' href='" + dataURL + "'>Rohdaten</a>"]
});
const metaData: { [id: number]: Crossing } = {}
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
var vectorLineLayer = new VectorLayer({
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


// popups

const container = document.getElementById('popup')!;
const content = document.getElementById('popup-content')!;
const closer = document.getElementById('popup-closer')!;

var overlay = new Overlay({
    element: container,
    autoPan: true,
    autoPanAnimation: {
        duration: 250
    }
});
map.addOverlay(overlay);

closer.onclick = function () {
    overlay.setPosition(undefined);
    closer.blur();
    return false;
};
map.on('singleclick', function (event) {
    map.forEachFeatureAtPixel(event.pixel, feature => {
        var coordinate = event.coordinate;
        let id = Number(feature.getId())
        if (!id) {
            return
        }
        if (id > 10000) {
            id -= 10000
        }
        console.info(id)
        const crossing = metaData[id]

        content.innerHTML = "";
        const p = document.createElement("p")
        p.innerText = crossing.name
        content.appendChild(p)

        overlay.setPosition(coordinate);

    }, {hitTolerance: 20})
    if (!map.hasFeatureAtPixel(event.pixel, {hitTolerance: 2})) {
        overlay.setPosition(undefined);
        closer.blur();
    }
});
console.log(dataURL)
