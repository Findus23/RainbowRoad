import {Crossing} from "../interfaces";
import {Vector as VectorSource} from "ol/source";
import {transform} from "ol/proj";
import {Feature} from "ol";
import {LineString, Point} from "ol/geom";
import {averageCoords} from "../utils/geo";

export type MetaData = { [id: number]: Crossing }

export function loadData(data: Crossing[], vectorSource: VectorSource): MetaData {
    const metaData: MetaData = {}
    console.info(data)
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
        vectorSource.addFeature(featureLine);
        vectorSource.addFeature(featureDot);
    })
    return metaData

}
