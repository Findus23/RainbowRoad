import axios from 'axios'
import {URLSearchParams} from "url";

const overpassURL = "https://overpass-api.de/api/interpreter?data="


export async function overpassAPI(query: string) {
    return axios.post(overpassURL, new URLSearchParams({
        data: query
    }))
}

export async function wayData(wayID: number) {
    const query = "[out:json];(way(THEID););(._;>;);out;"
        .replace("THEID", wayID.toString())
    return await overpassAPI(query)
}

export async function nodeData(nodeIDs: number[]) {
    let query = "[out:json];node(id:"
    query += nodeIDs.join(",")
    query += ");out;"
    console.log(query)
    return await overpassAPI(query)
}
