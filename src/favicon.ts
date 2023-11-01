import gggIcon from "../assets/favicons/ggg.at_redrawn.png"
import meinBezirkIcon from "../assets/favicons/meinbezirk.at.png"
import kurierIcon from "../assets/favicons/kurier.at.png"
import spoeIcon from "../assets/favicons/spoe.png"
import neosIcon from "../assets/favicons/neos.svg"
import grueneIcon from "../assets/favicons/gruene.at.svg"
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
import a1Icon from "../assets/favicons/a1.net.png"
import orfIcon from "../assets/favicons/orf.png"
import apaIcon from "../assets/favicons/apa.png"
import facebookIcon from "../assets/favicons/facebook.svg"
import heuteIcon from "../assets/favicons/heute.at.png"
import gmapsIcon from "../assets/favicons/gmaps.svg"
import salzburgIcon from "../assets/favicons/salzburg.svg"


export function faviconByHostname(hostname: string, pathname: string): string | undefined {

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
        case "newsroom.a1.net":
            return a1Icon
        case "www.ots.at":
            return apaIcon
        case "www.facebook.com":
            return facebookIcon
        case "www.heute.at":
            return heuteIcon
        case "www.stadt-salzburg.at":
            return salzburgIcon
    }

    if (hostname.includes("spoe")) {
        return spoeIcon
    }
    if (hostname.includes("gruene.at")) {
        return grueneIcon
    }
    if (hostname.includes("orf.at")) {
        return orfIcon
    }
    if (hostname == "www.google.com" && pathname.startsWith("/maps/")) {
        return gmapsIcon
    }
}
