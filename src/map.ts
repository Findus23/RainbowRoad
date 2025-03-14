import Map from "ol/Map";
import {OSM, Vector as VectorSource, XYZ} from "ol/source";
import TileLayer from "ol/layer/Tile";
import {Vector as VectorLayer} from "ol/layer";
import {Icon, Style} from "ol/style";
import {Coordinate} from "ol/coordinate";
import {State} from "ol/render";
import {Line, Vector2d} from "./vectorUtils";
import {drawZebraCrossing, zebraPatterns} from "./zebraUtils";
import prideFlag from "../assets/prideflag.svg"
import transFlag from "../assets/transflag.svg"
import nonbinaryFlag from "../assets/nonbinaryflag.svg"
import {FeatureProperties} from "./features";
import {areas, viewFromArea, Wien} from "./areaData";
import {Crossing} from "../interfaces";
import {loadAllData} from "./loadData";
import "./router"
import {router} from "./router";
import {transform, transformExtent} from "ol/proj";
import {defaults as defaultControls} from 'ol/control';
import {InfoButton} from "./info";
import {AcceptAllControl, BasemapControl, OrthophotoControl} from "./toggle";
import {retina} from "./utils";


const basemap_lq_url = "https://maps.lw1.at/tiles/1.0.0/basemap/GLOBAL_MERCATOR/{z}/{x}/{y}.png"
const basemap_hq_url = "https://maps.lw1.at/tiles/1.0.0/basemap_hq/webmercator_hq/{z}/{x}/{y}.png"
const basemap_attribution = "Datenquelle: <a href=\"https://www.basemap.at\">basemap.at</a>,"


const basemap_url = retina ? basemap_hq_url : basemap_lq_url

const map = new Map({
    target: 'map',
    layers: [
        // new TileLayer({
        //     source: new OSM({url: "https://maps.lw1.at/tiles/1.0.0/osm/GLOBAL_MERCATOR/{z}/{x}/{y}.png"}),
        // }),
        new TileLayer({
            source: new XYZ({
                url: "https://maps.lw1.at/tiles/1.0.0/tracestack/webmercator_hq/{z}/{x}/{y}.png",
                tilePixelRatio: 5,
                attributions: ['Data: © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>, <a href="http://viewfinderpanoramas.org/">SRTM</a>, <a href="https://portal.opentopography.org/datasetMetadata?otCollectionID=OT.032021.4326.2">NASADEM</a>, <a href="https://worldcover2021.esa.int">ESA WorldCover</a>; Maps © <a href="https://www.tracestrack.com/">Tracestrack</a>'],
                crossOrigin: null
            }),
        }),
        new TileLayer({
            source: new XYZ({
                url: basemap_url,
                tilePixelRatio: retina ? 2 : 1,
                attributions: [basemap_attribution]
            }),
            visible: false
        }),
        new TileLayer({
            source: new OSM({
                url: "https://maps.lw1.at/tiles/1.0.0/basemap_orthofoto/GLOBAL_MERCATOR/{z}/{x}/{y}.jpeg",
                attributions: [basemap_attribution]
            }),
            visible: false
        }),
    ],
    view: viewFromArea(Wien),
    controls: defaultControls().extend([
        new InfoButton({}),
        new OrthophotoControl(),
        new BasemapControl(),
        new AcceptAllControl()
    ])
});

const vectorSource = new VectorSource({
    attributions: [
        '<a href="https://lw1.at/i" target="_blank">Impressum</a>'
    ]
});

loadAllData(vectorSource)

function renderer(coordinates: Coordinate | Coordinate[] | Coordinate[][] | Coordinate[][][], state: State): void {
    const start = Vector2d.fromCoordList(coordinates[0] as Coordinate)
    const end = Vector2d.fromCoordList(coordinates[1] as Coordinate)
    const line = new Line(start, end)
    // console.log(line.vec.length())
    const ctx = state.context;
    const featureProperties = state.feature.getProperties() as FeatureProperties
    if (featureProperties.type != "line") {
        return
    }
    const crossing: Crossing = featureProperties.crossing
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
const nonbinaryFlagStyle = new Style({
    image: new Icon({
        src: nonbinaryFlag,
        scale: 0.05 * 800 / 300
    })
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
        const featureProperties = feature.getProperties() as FeatureProperties
        const crossing = featureProperties.crossing
        if (featureProperties.type != "dot") {
            return
        }

        if (typeof crossing === "undefined") {
            return
        }
        switch (crossing.type) {
            case "prideFlag":
            case "portschachRainbow":
                return prideFlagStyle
            case "transFlag":
                return transFlagStyle
            case "nonbinaryFlag":
                return nonbinaryFlagStyle
        }
    }
});
map.addLayer(vectorLineLayer);

Object.entries(areas).forEach(([name, area]) => {
    router.on("/" + encodeURIComponent(area.name), () => {
        const extent = transformExtent(area.extent, 'EPSG:4326', 'EPSG:3857')
        map.getView().fit(extent, {
            size: map.getSize(),
            // duration:1000
        })
        // map.setView(viewFromArea(area))
    })
})

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
    popups.initPopups(map, vectorSource);
})

map.on('click', function (evt) {
    console.log(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'));
});
