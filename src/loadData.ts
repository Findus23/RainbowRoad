import VectorSource from "ol/source/Vector";
import {loadData} from "./features";
import {Crossing} from "../interfaces";

export function loadAllData(vectorSource: VectorSource): void {
    const imports = [
        import("../data/Wien.json"),
        import("../data/Oberösterreich.json"),
        import("../data/Niederösterreich.json"),
        import("../data/Steiermark.json"),
        import("../data/Tirol.json"),
        import("../data/Burgenland.json"),
        import("../data/Salzburg.json"),
        import("../data/Vorarlberg.json"),
        import("../data/Kärnten.json")
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
