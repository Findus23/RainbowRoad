import {MatomoLiteTracker} from "matomo-lite-tracker/src/tracker"
import {enableLinkTracking} from "matomo-lite-tracker/src/linktracking"
import {isDoNotTrackEnabled} from "matomo-lite-tracker/src/util"

export let matomo: MatomoLiteTracker | undefined

export function initMatomo(): void {
    if (isDoNotTrackEnabled()) {
        return
    }
    const m = new MatomoLiteTracker("https://matomo.lw1.at", 32)


    enableLinkTracking(m, [])
    matomo = m
}

