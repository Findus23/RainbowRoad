export type FlagType = "prideFlag" | "transFlag"


export interface OSMWaySource {
    type: "OSMway",
    wayID: number
}

export interface OSMNodeSource {
    type: "OSMnodes",
    nodes: number[]
}

export interface GeoData {
    coords: number[][],
    length: number // in meter
}

export interface Crossing {
    id: number
    name: string
    bezirk: number
    type: FlagType
    geosource: OSMWaySource | OSMNodeSource,
    geo: GeoData
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
