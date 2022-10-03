import { parse as parseCat10 } from './cat10/cat10RecordParser.js';
import { parse as parseCat21 } from './cat21/cat21RecordParser.js';
import { int8Toint16 } from './utils/bitUtils.js';
import LatLon, { Ned } from 'geodesy/latlon-nvector-ellipsoidal.js'; // Node.js


const CATEGORY_10 = 10;
const CATEGORY_21 = 21;

const POINT_SMR = {
    lat: 41.29561800,
    lon: 2.09511400
}
const POINT_MLAT = {
    lat: 41.29706300,
    lon: 2.07844700
}

var records10 = [];
var records21 = [];
var progress = 0;

var planes = {
    MLAT: [], //CAT 10 needs conversion SAC/SIC = 07
    SMR: [], //CAT 10 needs conversion, SAC/SIC = 0/7
    ADSB: [],
}

export function getPlanes() {
    return planes;
}

export function getRecords10() {
    return records10;
}
export function getRecords21() {
    return records21;
}


export function pushDataItem10(name, dataItem) {
    records10[records10.length - 1][name] = dataItem;
}
export function pushDataItem21(name, dataItem) {
    records21[records21.length - 1][name] = dataItem;
}
function getCoordinates(cartesianCoordinates, referencePoint) {
    const SMR = new LatLon(referencePoint.lat, referencePoint.lon, 0);
    const ned = new Ned(cartesianCoordinates.x, cartesianCoordinates.y, 0);

    return SMR.destinationPoint(ned);
}

function pushPlane10() {
    let recordPlane = records10[records10.length - 1];
    let plane = {};


    if (recordPlane.SAC == 0 & recordPlane.SIC == 7 & recordPlane["a042"] != null) {
        let position = getCoordinates(recordPlane["a042"], POINT_SMR)
        plane.lat = position.lat;
        plane.lon = position.lon;
        plane.planeId = recordPlane["a161"];
        plane.timestamp = recordPlane["a140"];
        planes.SMR.push(plane);
    } else if (recordPlane.SAC == 0 & recordPlane.SIC == 107 & recordPlane["a042"] != null) {
        let position = getCoordinates(recordPlane["a042"], POINT_MLAT)
        plane.lat = position.lat;
        plane.lon = position.lon;
        plane.planeId = recordPlane["a161"];
        plane.timestamp = recordPlane["a140"];
        planes.MLAT.push(plane);
    };
}

function pushPlane21() {
    let recordPlane = records21[records21.length - 1];
    let plane = {};
    if (recordPlane["b131"] != null & recordPlane["b170"] != null & recordPlane["b160"] != null) {
        let position = recordPlane["b131"]
        plane.lat = position.lat;
        plane.lon = position.lon;
        plane.planeId = recordPlane["b170"]
        plane.timestamp = Math.floor(recordPlane["b073"]);
        plane.heading = recordPlane["b160"]["trackAngle"];
        planes.ADSB.push(plane);
    }
}

export function decode(buffer) {
    records10 = [];
    records21 = [];

    // startTimer();
    let arrayInts = new Uint8Array(buffer);
    let i = 0;
    let framesParsed = 1;
    while (i < arrayInts.length) {
        let category = arrayInts[i];
        let length = int8Toint16(arrayInts[i + 1], arrayInts[i + 2]);
        let record = arrayInts.subarray(i + 3, i + length);
        i += length;

        if (category == CATEGORY_10) {
            records10.push({ category: CATEGORY_10, length: length });
            parseCat10(record);
            pushPlane10();

        } else if (category == CATEGORY_21) {
            records21.push({ category: CATEGORY_21, length: length });
            parseCat21(record)
            pushPlane21();
        }
        framesParsed++;
        if (framesParsed % 30000 == 0) {
            progress = Math.floor(100 * i / arrayInts.length);
            console.log("*", progress);
        }
    }

    progress = 0;
    // endTimer();
}



var a;
var b;
function startTimer() {
    a = new Date();
}
function endTimer() {
    b = new Date();
    var difference = (b - a);
    console.log("You waited: " + difference + " miliseconds");
}

