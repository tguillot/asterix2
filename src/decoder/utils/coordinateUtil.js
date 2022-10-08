import LatLon, { Ned } from 'geodesy/latlon-nvector-ellipsoidal.js'; // Node.js



export function nedToGeodetic(latLocal, lonLocal, x, y) {
    const local = new LatLon(lat, lon, 0);
    const ned = new Ned(x, y, 0);

    const result = local.destinationPoint(ned);

    return {
        lat: result.lat,
        lon: result.lon,
    };
}

