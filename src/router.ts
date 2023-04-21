import Navigo, {NavigateOptions} from "navigo";
import {matomo} from "./matomo";
import {locationAlias} from "matomo-lite-tracker/src/aliases";

class CustomNavigo extends Navigo {
    navigateReplace(to: string, options?: NavigateOptions) {
        if (typeof options === "undefined") {
            options = {}
        }
        options.historyAPIMethod = "replaceState"
        this.navigate(to, options);
    }
}

export const router = new CustomNavigo("/")

router.hooks({
    after(m) {
        if (matomo) {
            matomo.customURL = locationAlias.protocol + '//' +
                locationAlias.hostname + "/" + m.url
            matomo?.trackPageview()
        }
    }
})

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


export function redirect(router: CustomNavigo, from: string, to: string) {
    router.on(from, () => {
        router.navigateReplace(to)
    })

}
