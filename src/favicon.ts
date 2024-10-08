import gggIcon from "../assets/favicons/ggg.at_redrawn.png"
import meinBezirkIcon from "../assets/favicons/meinbezirk.at.png"
import kurierIcon from "../assets/favicons/kurier.at.png"
import spoeIcon from "../assets/favicons/spoe.png"
import neosIcon from "../assets/favicons/neos.svg"
import grueneIcon from "../assets/favicons/gruene.at.svg"
import WienIcon from "../assets/favicons/wien.gv.at.svg"
import derStandardIcon from "../assets/favicons/derstandard.at.png"
import linzIcon from "../assets/favicons/linz.at.svg"
import noenIcon from "../assets/favicons/noen.png"
import burgenlandIcon from "../assets/favicons/burgenland.svg"
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
import viennaatIcon from "../assets/favicons/vienna_at.png"
import f5minIcon from "../assets/favicons/5min.png"
import kleinezeitungIcon from "../assets/favicons/kleinezeitung.svg"
import instagramIcon from "../assets/favicons/instagram.svg"
import kommunalnetIcon from "../assets/favicons/kommunalnet.png"
import dfz21Icon from "../assets/favicons/dfz21.png"
import mannschaftIcon from "../assets/favicons/mannschaft.svg"
import linksIcon from "../assets/favicons/links.wien.svg"
import linzaIcon from "../assets/favicons/linza.at.png"
import linzNewsIcon from "../assets/favicons/linz.news.png"


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
        case "www.vienna.at":
            return viennaatIcon
        case "www.kleinezeitung.at":
            return kleinezeitungIcon
        case "www.instagram.com":
            return instagramIcon
        case "www.kommunalnet.at":
            return kommunalnetIcon
        case "www.dfz21.at":
            return dfz21Icon
        case "mannschaft.com":
            return mannschaftIcon
        case "links.wien":
            return linksIcon
        case "www.linza.at":
            return linzaIcon
        case "linz.news":
            return linzNewsIcon
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
    if (hostname.endsWith("5min.at")) {
        return f5minIcon
    }
    if (hostname == "www.google.com" && pathname.startsWith("/maps/")) {
        return gmapsIcon
    }
}
