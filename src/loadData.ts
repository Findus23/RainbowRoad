import VectorSource from "ol/source/Vector";
import {loadData} from "./features";
import {Crossing} from "../interfaces";

export function loadAllData(vectorSource: VectorSource): void {
    const imports = [
        import("../data/Wien.json?inline"),
        import("../data/Oberösterreich.json?inline"),
        import("../data/Niederösterreich.json?inline"),
        import("../data/Steiermark.json?inline"),
        import("../data/Tirol.json?inline"),
        import("../data/Burgenland.json?inline"),
        import("../data/Salzburg.json?inline"),
        import("../data/Vorarlberg.json?inline"),
        import("../data/Kärnten.json?inline")
    ]
    imports.forEach(imp => {
        imp.then(data => {
            loadData(data.default as unknown as Crossing[], vectorSource)
        })
    })
}


// import("../data/Wien.json?url").then(importdata => {
//     vectorSource.setAttributions(buildAttribution(importdata.default))
// })
