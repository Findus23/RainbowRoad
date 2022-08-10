import * as fs from "fs";
import type {Crossing, OSMNodeSource, OSMWaySource, OverPassNode, OverPassResponse, OverpassWay} from "../interfaces";
import {nodeData, wayData} from "./overpass";
import {lineLengthInM} from "../utils/geo";

async function runfetch() {
    const data: Crossing[] = JSON.parse(fs.readFileSync("../data/data.json", 'utf8'));

    function firstLastNodeCoords(nodeMap: { [id: number]: OverPassNode }, nodeList: number[]) {
        const coords: number[][] = []
        const firstNode = nodeMap[nodeList[0]]
        const lastNode = nodeMap[nodeList[nodeList.length - 1]]
        coords.push([firstNode.lon, firstNode.lat])
        coords.push([lastNode.lon, lastNode.lat])
        return coords;
    }

    async function fetchWayData(geosource: OSMWaySource) {
        const coords: number[][] = []
        const response = await wayData(geosource.wayID)
        const data: OverPassResponse = response.data
        const nodes: { [key: number]: OverPassNode } = {}
        data.elements.forEach(e => {
            if (e.type != "node") {
                return
            }
            nodes[e.id] = e
        })
        const way = data.elements.find(e => e.type == "way") as OverpassWay
        return firstLastNodeCoords(nodes, way.nodes)
    }


    async function fetchNodeData(geosource: OSMNodeSource) {
        const response = await nodeData(geosource.nodes)
        const data: OverPassResponse = response.data
        console.log("data.elements")
        console.log(data.elements)
        const nodes: { [key: number]: OverPassNode } = {}
        data.elements.forEach(e => {
            if (e.type != "node") {
                return
            }
            nodes[e.id] = e
        })
        console.log(geosource.nodes)
        return firstLastNodeCoords(nodes, geosource.nodes);


    }

    for (const d of data) {

        if (typeof d.geo !== "undefined") {
            d.geo.length = lineLengthInM(d.geo.coords[0], d.geo.coords[1])
            continue
        }
        const geosource = d.geosource
        console.log("fetching")
        let coords: number[][];
        switch (geosource.type) {
            case "OSMway":
                coords = await fetchWayData(geosource);
                break
            case "OSMnodes":
                coords = await fetchNodeData(geosource);
                break
            case "RawCoords":
                coords = geosource.coords
                console.info(geosource.coords)
                break
        }
        d.geo = {
            coords: coords,
            length: lineLengthInM(coords[0], coords[1])
        }
        // crossings[i] = d
        fs.writeFileSync("../data/data.json", JSON.stringify(data, null, 2))
    }
}

runfetch()
