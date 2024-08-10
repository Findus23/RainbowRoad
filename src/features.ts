import {Crossing} from "../interfaces";
import {Vector as VectorSource} from "ol/source";
import {transform} from "ol/proj";
import {Feature} from "ol";
import {LineString, Point} from "ol/geom";
import {averageCoords} from "../utils/geo";

export type FeatureType = "line" | "dot"

export interface FeatureProperties {
    crossing: Crossing
    type: FeatureType
}

export function loadData(data: Crossing[], vectorSource: VectorSource): void {
    console.info(data)
    data = data.filter(c => typeof c.hidden === "undefined" || !c.hidden)
    data.sort((a, b) => {
        /*
        put trans flag on top (so they are not covered,
        but apart from that keep the drawing order random
         */
        if (a.type == "transFlag" || a.type == "nonbinaryFlag") {
            return 1
        }
        if (b.type == "transFlag" || b.type == "nonbinaryFlag") {
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

        featureLine.setProperties({"crossing": c, "type": "line"} as FeatureProperties)
        featureDot.setProperties({"crossing": c, "type": "dot"} as FeatureProperties)
        featureDot.setId(c.id)
        vectorSource.addFeature(featureLine);
        vectorSource.addFeature(featureDot);
    })
}
