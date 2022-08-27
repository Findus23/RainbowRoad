import gggIcon from "../assets/favicons/ggg.at_redrawn.png"
import meinBezirkIcon from "../assets/favicons/meinbezirk.at.png"
import kurierIcon from "../assets/favicons/kurier.at.png"
import spoeIcon from "../assets/favicons/spoe.png"
import neosIcon from "../assets/favicons/neos.svg"
import WienIcon from "../assets/favicons/wien.gv.at.svg"
import derStandardIcon from "../assets/favicons/derstandard.at.png"
import linzIcon from "../assets/favicons/linz.at.png"
import noenIcon from "../assets/favicons/noen.png"
import burgenlandIcon from "../assets/favicons/burgenland.png"
import oe3Icon from "../assets/favicons/oe3.png"
import ttIcon from "../assets/favicons/tt.png"
import salzburg24Icon from "../assets/favicons/salzburg24.png"
import fmtIcon from "../assets/favicons/fmt.png"
import tipsIcon from "../assets/favicons/tips.png"

export function faviconByHostname(hostname: string): string | undefined {

    switch (hostname) {
        case "www.ggg.at":
            return gggIcon
        case "www.meinbezirk.at":
            return meinBezirkIcon
        case "kurier.at":
            return kurierIcon
        case "www.neos.eu":
            return neosIcon
        case "www.wien.gv.at":
            return WienIcon
        case "www.derstandard.at":
            return derStandardIcon
        case "www.linz.at":
            return linzIcon
        case "www.noen.at":
            return noenIcon
        case "www.burgenland.at":
            return burgenlandIcon
        case "oe3.orf.at":
            return oe3Icon
        case "www.tt.com":
            return ttIcon
        case "www.salzburg24.at":
            return salzburg24Icon
        case "www.fmt-pictures.at":
            return fmtIcon
        case "www.tips.at":
            return tipsIcon
    }

    if (hostname.includes("spoe")) {
        return spoeIcon
    }
}