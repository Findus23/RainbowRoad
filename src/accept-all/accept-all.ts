/*!

 */
import "./accept-all.css"
import MicroModal, {MicroModalConfig} from "micromodal";

interface Translation {
    language: string,
    buttonText: string,
    buttonSpan: string,
    linkText: string,
    title: string,
    text: string
}

const colors = ["#ec1d23", "#f59121", "#fddb0f", "#029246", "#242262", "#804194", "#60cdf5", "#fff", "#f7a9b8", "#000", "#785121"]
const translations: Translation[] = [{
    language: "de",
    buttonText: "Alle Akzeptieren",
    buttonSpan: " und Fenster schliessen",
    linkText: "Hier geht's zur Aktionsseite",
    title: "Das sind <strong>KEINE Cookie-Einstellungen.</strong>",
    text: "Das ist unsere Einstellung zu Menschenrechten, Vielfalt und Respekt."
}, {
    language: "bg",
    buttonText: "Приемане на всички",
    buttonSpan: "и затваряне на прозореца.",
    linkText: "Към страницата на акцията",
    title: "Това <strong>НЕ са настройки на бисквитките.</strong>",
    text: "Това е нашата позиция спрямо човешките права, многообразието и уважението."
}, {
    language: "bs",
    buttonText: "Prihvatite sve",
    buttonSpan: "i zatvorite prozor.",
    linkText: "Ovuda se ide do stranice s kampanjom",
    title: "To <strong>NISU postavke kolačića.</strong>",
    text: "To je naš stav o ljudskim pravima, raznolikosti i poštovanju."
}, {
    language: "da",
    buttonText: "Accepter alle",
    buttonSpan: "og luk vinduet.",
    linkText: "Her kommer du til kampagne-webstedet",
    title: "Dette er <strong>IKKE cookie-indstillinger.</strong>",
    text: "Dette er vores holdning til menneskerettigheder, diversitet og respekt."
}, {
    language: "el",
    buttonText: "Αποδοχή όλων",
    buttonSpan: "και κλείσιμο παραθύρου.",
    linkText: "Κάντε κλικ εδώ για τη σελίδα της εκστρατείας",
    title: "Αυτές <strong>ΔΕΝ είναι ρυθμίσεις για τα cookies.</strong>",
    text: "Είναι η θέση μας για τα ανθρώπινα δικαιώματα, τη διαφορετικότητα και το σεβασμό."
}, {
    language: "en",
    buttonText: "Accept all",
    buttonSpan: "and close the window.",
    linkText: "Click here to go to the campaign page",
    title: "These are <strong>NO cookie settings.</strong>",
    text: "This is our attitude towards human rights, diversity and respect."
}, {
    language: "es",
    buttonText: "Aceptar todo",
    buttonSpan: "y cerrar la ventana.",
    linkText: "Ir a la página de la iniciativa",
    title: "Esto <strong>NO es una declaración sobre cookies.</strong>",
    text: "Esta es nuestra declaración sobre los derechos humanos, la diversidad y el respeto."
}, {
    language: "et",
    buttonText: "Aktsepteeri kõiki",
    buttonSpan: "ja sulge aken.",
    linkText: "Ava kampaania leht",
    title: "Tegu <strong>EI OLE küpsiste seadistustega.</strong>",
    text: "See on meie hoiak inimõiguste, mitmekesisuse ja austuse suhtes."
}, {
    language: "fi",
    buttonText: "Hyväksy kaikki",
    buttonSpan: "ja sulje ikkuna.",
    linkText: "Siirry kampanjasivulle tästä",
    title: "Nämä <strong>EIVÄT OLE evästeasetuksia.</strong>",
    text: "Nämä asetukset koskevat ihmisoikeuksia, moniarvoisuutta ja kunnioitusta."
}, {
    language: "fr",
    buttonText: "Tout accepter",
    buttonSpan: "et fermer les fenêtres.",
    linkText: "Cliquez ici pour accéder à la page de l'action",
    title: "Ce ne sont <strong>PAS des paramètres de cookies.</strong>",
    text: "C'est notre approche des droits de l'homme, de la diversité et du respect."
}, {
    language: "hr",
    buttonText: "Prihvati sve",
    buttonSpan: "i zatvori prozorčiće.",
    linkText: "Kliknite ovdje kako biste otišli na stranicu kampanje",
    title: "Ovo <strong>NISU postavke kolačića.</strong>",
    text: "Ovo je naš stav prema ljudskim pravima, različitosti i poštovanju."
}, {
    language: "hu",
    buttonText: "Az összes elfogadása",
    buttonSpan: "és az ablak bezárása.",
    linkText: "Kattintson ide a kampány oldalának megnyitásához",
    title: '"Ezek <strong>NEM sütibeállítások.</strong>"',
    text: "Ez a mi hozzáállásunk az emberi jogokhoz, a sokszínűséghez és a tisztelethez."
}, {
    language: "it",
    buttonText: "Accettare tutto",
    buttonSpan: "e chiudere la finestra.",
    linkText: "Cliccare qui per aprire la pagina della campagna",
    title: "<strong>NON sono impostazioni dei cookie.</strong>",
    text: "È il nostro atteggiamento nei confronti dei diritti umani, della diversità e del rispetto."
}, {
    language: "lt",
    buttonText: "Priimkite visus",
    buttonSpan: "ir uždarykite langą.",
    linkText: "Spustelėkite čia, kad peržiūrėtumėte kampanijos puslapį",
    title: "Tai <strong>NE slapukų nustatymai.</strong>",
    text: "Tai mūsų pozicija dėl žmogaus teisių, įvairovės ir pagarbos."
}, {
    language: "lv",
    buttonText: "Piekrist visam",
    buttonSpan: "un aizvērt logu.",
    linkText: "Uz akcijas lapu",
    title: "Tie <strong>NAV sīkfailu iestatījumi.</strong>",
    text: "Tā ir mūsu attieksme pret cilvēktiesībām, dažādību un cieņu."
}, {
    language: "nl",
    buttonText: "Alles accepteren",
    buttonSpan: "en venster sluiten.",
    linkText: "Naar de actiepagina",
    title: "Dat zijn <strong>GEEN cookie-instellingen.</strong>",
    text: "Dit is onze houding ten opzichte van mensenrechten, diversiteit en respect."
}, {
    language: "no",
    buttonText: "Godta alle",
    buttonSpan: "og lukk vinduet.",
    linkText: "Her kommer du til kampanjesiden",
    title: "Dette er <strong>IKKE cookie-innstillinger.</strong>",
    text: "Det er vår innstilling til menneskerettigheter, mangfold og respekt."
}, {
    language: "pl",
    buttonText: "Zaakceptuj wszystko",
    buttonSpan: "i zamknij okno.",
    linkText: "Kliknij tutaj, aby przejść na stronę kampanii",
    title: "To <strong>NIE są ustawienia plików cookie.</strong>",
    text: "To jest nasze nastawienie do różnorodności, praw człowieka i ich poszanowania."
}, {
    language: "pt",
    buttonText: "Aceitar tudo",
    buttonSpan: "e fechar a janela.",
    linkText: "Clique aqui para aceder à página da campanha",
    title: "Estas <strong>NÃO são definições de cookies.</strong>",
    text: "Esta é a nossa posição sobre direitos humanos, diversidade e respeito."
}, {
    language: "ro",
    buttonText: "Acceptă-le pe toate",
    buttonSpan: "și închide fereastra.",
    linkText: "Descoperă aici pagina campaniei",
    title: "Acestea <strong>NU sunt setări cookie.</strong>",
    text: "Aceasta este viziunea noastră cu privire la drepturile omului, diversitate și respect."
}, {
    language: "ru",
    buttonText: "Принять всех",
    buttonSpan: "и закрыть окно.",
    linkText: "Перейти на страницу акции",
    title: "Это <strong>НЕ настройки файлов Cookie.</strong>",
    text: "Это наше отношение к правам человека, разнообразию и уважению."
}, {
    language: "sk",
    buttonText: "Akceptovať všetky",
    buttonSpan: "a zatvoriť okno.",
    linkText: "Tadeto sa dostanete na stránku s akciami",
    title: "Toto <strong>NIE SÚ ŽIADNE nastavenia cookies.</strong>",
    text: "To je náš postoj týkajúci sa ľudských práv, rôznorodosti, rozmanitosti a rešpektu."
}, {
    language: "sl",
    buttonText: "Sprejmi vse",
    buttonSpan: "in zapri okno.",
    linkText: "Tukaj greš na kampanjsko stran",
    title: "To <strong>NISO nastavitve piškotkov.</strong>",
    text: "To je naše stališče do človekovih pravic, raznolikosti in spoštovanja."
}, {
    language: "sr",
    buttonText: "Prihvatiti sve",
    buttonSpan: "i zatvoriti prozor.",
    linkText: "Ovde možete da pristupite stranici kampanje",
    title: "Ovo <strong>NIJE PODEŠAVANJE KOLAČIĆA.</strong>",
    text: "Ovo je naš stav o ljudskim pravima, raznolikosti i poštovanju."
}, {
    language: "sv",
    buttonText: "Tillåt alla",
    buttonSpan: "och stäng fönstret.",
    linkText: "Här kommer du till webbsidan för initiativet",
    title: "Det är <strong>INGA cookie-inställningar.</strong>",
    text: "Det är vår inställning till mänskliga rättigheter, mångfald och respekt."
}, {
    language: "tr",
    buttonText: "Tümünü kabul et",
    buttonSpan: "ve pencereyi kapat.",
    linkText: "İşlem sayfasına buradan ulaşabilirsiniz",
    title: "Bunlar <strong>çerez ayarları DEĞİLDİR.</strong>",
    text: "İnsan hakları, çeşitlilik ve saygı konusundaki tutumumuz budur."
}, {
    language: "uk",
    buttonText: "Прийняти всіх",
    buttonSpan: "і закрити вікно.",
    linkText: "Перейти на сторінку акції",
    title: "Це <strong>НЕ налаштування файлів Cookie.</strong>",
    text: "Це наше ставлення до прав людини, різноманіття та поваги."
}];

function createBgImageBar(color: string, index: number): SVGSVGElement {
    const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgEl.setAttribute("aria-hidden", "true")
    svgEl.setAttribute("class", `kwAcceptAllColumn kwAcceptAllColumn-${index}`)
    svgEl.setAttributeNS(null, "viewbox", "0 0 173 2221")
    svgEl.setAttributeNS(null, "width", "173")
    svgEl.setAttributeNS(null, "height", "2221")
    svgEl.setAttributeNS(null, "preserveAspectRatio", "none")
    const rectEl = document.createElementNS("http://www.w3.org/2000/svg", "rect")
    rectEl.setAttributeNS(null, "rx", "50%")
    rectEl.setAttributeNS(null, "width", "100%")
    rectEl.setAttributeNS(null, "height", "100%")
    rectEl.setAttributeNS(null, "fill", color)
    svgEl.appendChild(rectEl)
    return svgEl
}

export class AcceptAll {
    private cookiePopup: HTMLDivElement | undefined
    private cookieBackground: HTMLDivElement | undefined;
    private cookieContent: HTMLDivElement | undefined;
    private cookiePopupId: string = "kwAcceptAllcookiePopup";
    private readonly showOnlyOnce: boolean;
    private modalOptions: MicroModalConfig = {
        onShow: t => this.showModalEvent(t),
        onClose: t => this.closeModalEvent(t),
        disableScroll: true,
        disableFocus: true,
        awaitOpenAnimation: true,
        awaitCloseAnimation: true,
        debugMode: false
    };
    private language = "en"
    private translations: Translation | undefined

    constructor(showOnlyOnce: boolean = false) {
        this.showOnlyOnce = showOnlyOnce
        this.checkLanguage()
        this.initModal()
        this.createModal()
    }

    checkLanguage() {
        const languages: string[] = [];
        if (navigator.languages) {
            navigator.languages.forEach(lang => {
                languages.push(lang.split("-")[0])
            });
        }
        let foundFittingTranslation = false;
        for (let i = 0; i < languages.length; i++) {
            this.translations = translations.find(t => t.language === languages[i])
            if (this.translations) {
                foundFittingTranslation = true
                this.language = languages[i];
                break
            }
        }
        if (!foundFittingTranslation) {
            this.translations = translations.find(t => t.language === this.language)
        }
    }

    createBackground() {
        this.cookieBackground = document.createElement("div")
        this.cookieBackground.id = "kwAcceptAllcookieBackground";
        const bgImageDiv = document.createElement("div");
        bgImageDiv.id = "kwAcceptAllbgImage"
        colors.forEach((color, index) => {
            const bgImageBar = createBgImageBar(color, index);
            bgImageDiv.appendChild(bgImageBar)
        })
        this.cookieBackground.appendChild(bgImageDiv)
        this.cookieBackground.addEventListener("click", () => this.close())
    }

    createContent() {
        this.cookieContent = document.createElement("div")
        this.cookieContent.id = "kwAcceptAllcookieContent"
        this.cookieContent.setAttribute("role", "dialog")
        this.cookieContent.setAttribute("aria-modal", "true")
        this.cookieContent.setAttribute("aria-labelledby", "kwAcceptAllModalTitle")
    }

    createText() {
        if (!this.translations || !this.cookieContent) {
            return
        }
        const h2El = document.createElement("h2");
        h2El.id = "kwAcceptAllModalTitle"
        h2El.innerHTML = this.translations.title;
        const pEl = document.createElement("p");
        pEl.textContent = this.translations.text
        this.cookieContent.appendChild(h2El)
        this.cookieContent.appendChild(pEl)
        this.createButton()
        this.createLink()
    }

    createButton() {
        if (!this.translations || !this.cookieContent) {
            return
        }

        const e = document.createElement("div");
        e.id = "kwAcceptAllButtonWrapper";
        const buttonEl = document.createElement("button");
        buttonEl.id = "kwAcceptAllacceptCookie"
        buttonEl.innerHTML = `<span class="kwAcceptAll__buttonText">${this.translations.buttonText}<span class="sr-only"> ${this.translations.buttonSpan}</span>.</span>`
        buttonEl.setAttribute("data-micromodal-close", "")
        e.appendChild(buttonEl)
        this.cookieContent.appendChild(e)
    }

    createLink() {
        if (!this.translations || !this.cookieContent) {
            return
        }

        const e = document.createElement("a");
        e.id = "kwAcceptAlllink"
        e.textContent = this.translations.linkText
        e.target = "_blank"
        e.rel = "noopener"
        e.href = "https://www.accept.lgbt/"
        this.cookieContent.appendChild(e)
    }

    createWrapper() {
        if (!this.translations || !this.cookieContent || !this.cookieBackground || !this.cookiePopup) {
            return
        }
        const e = document.createElement("div");
        e.id = "kwAcceptAllcookieWrapper"
        e.setAttribute("tabindex", "-1")
        e.appendChild(this.cookieBackground)
        e.appendChild(this.cookieContent)
        this.cookiePopup.appendChild(e)
    }

    createModal() {
        this.cookiePopup = document.createElement("div")
        this.cookiePopup.id = "kwAcceptAllcookiePopup"
        this.cookiePopup.setAttribute("aria-hidden", "")
        this.cookiePopup.setAttribute("lang", this.language)
        this.createBackground()
        this.createContent()
        this.createText()
        this.createWrapper()
        document.body.appendChild(this.cookiePopup)
    }

    initModal() {
        MicroModal.init(this.modalOptions)
    }

    showModalEvent(modal?: HTMLElement) {
        setTimeout(() => {
            if (!modal || !this.cookieBackground) {
                return
            }
            modal.classList.add("kwAcceptAllshow")
            this.cookieBackground.classList.add("kwAcceptAllTranslateIn")
        }, 200)
    }

    closeModalEvent(modal?: HTMLElement) {
        if (!this.cookieBackground) {
            return
        }

        const o = this.showOnlyOnce ? 24 * 60 * 60 * 1000 : 1
        const t = Date.now();
        localStorage.setItem("kwAcceptAll_popup", `${t + o}`)
        this.cookieBackground.classList.remove("kwAcceptAllTranslateIn")
        this.cookieBackground.classList.add("kwAcceptAllTranslateOut");

        function delay(ms: number) {
            return new Promise(resolve => {
                setTimeout(resolve, ms)
            });
        }

        async function close() {
            if (!modal) {
                return
            }
            await delay(900)
            modal.classList.remove("kwAcceptAllshow")
            await delay(600)
            document.getElementById("kwAcceptAllcookiePopup")!.style.display = "none"
        }

        close()
    }

    show() {
        MicroModal.show(this.cookiePopupId, this.modalOptions)
    }

    close() {
        MicroModal.close(this.cookiePopupId)
    }
}

export function immediateInit() {
    const i = localStorage.getItem("kwAcceptAll_popup")
    const e = Date.now();
    if (i === null || Number(i) < e) {
        new AcceptAll().show()
    }
}

export function init() {
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", immediateInit);
    } else {
        immediateInit();
    }
}

