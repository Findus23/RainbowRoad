export type FlagType = "prideFlag" | "transFlag"

export type Coord = number[]
export type Coords = Coord[]

export interface OSMWaySource {
    type: "OSMway",
    wayID: number
}

export interface RawCoordSource {
    type: "RawCoords",
    coords: Coords,
}

export interface OSMNodeSource {
    type: "OSMnodes",
    nodes: number[]
}

export interface Source {
    type: "news" | "official" | "proposal" | "photo" | "streetview" | "in person"
    date: string
    url?: string
}

export interface GeoData {
    coords: Coords,
    length: number // in meter
}

export interface Crossing {
    id: number
    name: string
    bezirk?: number
    comment?: string
    set?: string
    type: FlagType
    sources: Source[]
    geosource: OSMWaySource | OSMNodeSource | RawCoordSource,
    geo?: GeoData
}

export interface Tags {
    [key: string]: string;
}

export interface OverpassElement {
    id: number
    tags: Tags
}

export interface OverPassNode extends OverpassElement {
    type: "node"
    lat: number
    lon: number
}

export interface OverpassWay extends OverpassElement {
    type: "way"
    nodes: number[] // corresponding to OverPassNode.id
}

export interface OverPassResponse {
    version: number
    generator: string
    elements: (OverPassNode | OverpassWay)[]
}
