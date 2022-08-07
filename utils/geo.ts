const earthRadius = 6371; // km

function toRad(val: number) {
    return val * Math.PI / 180;
}

export function lineLengthInM(start: number[], end: number[]) {
    let lat1 = start[0]
    let lat2 = end[0]
    const lon1 = start[1]
    const lon2 = end[1]

    let dLat = toRad(lat2 - lat1)
    let dLon = toRad(lon2 - lon1)
    lat1 = toRad(lat1);
    lat2 = toRad(lat2);

    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const value = earthRadius * c * 1000
    return Math.round(value * 100) / 100
}
