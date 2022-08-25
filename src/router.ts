import Navigo, {Route} from "navigo";
import {areas, viewFromArea, Wien} from "./areaData";
export const router = new Navigo("/")

// router.on("/Wien", () => {
//     map.setView(viewFromArea(Wien))
//
// })
// router.on("/Ober%C3%B6sterreich", () => {
//     map.setView(viewFromArea(areas.OOE))
//
//
// })

// redirect(router, "/", "/Wien")


export function redirect(router:Navigo,from:string,to:string){
    router.on(from, () => {
        router.navigate(to, {
            historyAPIMethod: 'replaceState'
        })
    })

}
