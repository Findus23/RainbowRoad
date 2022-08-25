import {Crossing} from "../interfaces";
import {loadData} from "./features";
import VectorSource from "ol/source/Vector";

export function loadAllData(vectorSource: VectorSource): void {
    // @ts-ignore
    import("../data/Wien.json?inline").then((data) => {
        loadData(data.default as unknown as Crossing[], vectorSource)
    })

// import("../data/Wien.json?url").then(importdata => {
//     vectorSource.setAttributions(buildAttribution(importdata.default))
// })

// @ts-ignore
    import("../data/Oberösterreich.json?inline").then((data) => {
        loadData(data.default as unknown as Crossing[], vectorSource)
    })
// import("../data/Oberösterreich.json?url").then(importdata => {
//     vectorSource.setAttributions(buildAttribution(importdata.default))
// })

}
