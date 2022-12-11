export const createElement = document.createElement.bind(document)

export function createElementWithContent(tagName: string, innerText: string): HTMLElement {
    const el = createElement(tagName)
    el.innerText = innerText
    return el
}

export function createAElement(innerText: string, href: string): HTMLAnchorElement {
    const el: HTMLAnchorElement = createElement("a")
    el.innerText = innerText
    el.href = href
    return el
}

export function dlSet(dt:string,urlText:string,url:string) {
    const dl = createElement("dl")
    dl.appendChild(createElementWithContent("dt", dt))
    const dd = createElement("dd")
    dd.appendChild(createAElement(urlText, url))
    dl.appendChild(dd)
    return dl

}
