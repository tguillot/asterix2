import { parse as parseCat10 } from './cat10/cat10RecordParser.js';
import { parse as parseCat21 } from './cat21/cat21RecordParser.js';
import { getDate, int8Toint16 } from './utils/bitUtils.js';
import LatLon, { Ned } from 'geodesy/latlon-ellipsoidal-vincenty.js'; // Node.js


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
    MLAT: {}, //CAT 10 needs conversion SAC/SIC = 07
    SMR: {}, //CAT 10 needs conversion, SAC/SIC = 0/7
    ADSB: {},
    others: {},
}

var today = new Date();
var milisToday = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate(), -2, 0, 0, 0);
//layer is under streets

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
function getCoordinates(displacement, referencePoint) {
    const SMR = new LatLon(referencePoint.lat, referencePoint.lon, 0);;

    return SMR.destinationPoint(displacement.rho, displacement.theta);
}

// if (recordPlane.SAC == 0 & recordPlane.SIC == 7 & recordPlane["a042"] != null) {
//     let position = getCoordinates(recordPlane["a042"], POINT_SMR)
//     plane.lat = position.lat;
//     plane.lon = position.lon;
//     plane.planeId = recordPlane["a161"];
//     plane.timestamp = recordPlane["a140"];
//     planes.SMR.push(plane);
// } else if (recordPlane.SAC == 0 & recordPlane.SIC == 107 & recordPlane["a042"] != null) {
//     let position = getCoordinates(recordPlane["a042"], POINT_MLAT)
//     plane.lat = position.lat;
//     plane.lon = position.lon;
//     plane.planeId = recordPlane["a161"];
//     plane.timestamp = recordPlane["a140"];
//     planes.MLAT.push(plane);
// };
function pushPlane10SMR() {
    let recordPlane = records10[records10.length - 1];
    if (recordPlane.SAC == 0 & recordPlane.SIC == 7) {

        let targetId = recordPlane["a161"]; //trackNumber
        if (targetId != null & recordPlane["a042"] != null & recordPlane["a140"] != null) { //Target number, Postion and time

            let plane = {};
            let position = getCoordinates(recordPlane["a040"], POINT_SMR)
            plane.lat = position.lat;
            plane.lon = position.lon;
            plane.targetId = targetId.toString();
            plane.heading = recordPlane["a200"] != null ? recordPlane["a200"]["trackAngle"] : null;
            plane.timestamp1 = Math.floor(recordPlane["a140"]) * 1000 + milisToday;
            plane.timestamp2 = plane.timestamp1;

            if (planes.SMR[targetId] == null) { //Init array
                planes.SMR[targetId] = [];
            }

            if (planes.SMR[targetId].length > 0) { //If first position exists make previouse extent
                planes.SMR[targetId][planes.SMR[targetId].length - 1].timestamp2 = plane.timestamp1 - 1000;
            }

            //Popup info for SMR targets
            // plane.trackNumber = recordPlane["a161"] != null ? recordPlane["a161"].toString() : "Unknown";

            planes.SMR[targetId].push(plane); //add plane
        }
    }
}

function pushPlane21() {
    let recordPlane = records21[records21.length - 1];
    let targetAdress = recordPlane["b080"];
    if (targetAdress != null & recordPlane["b131"] != null & recordPlane["b073"] != null) { //Target address, Postion and time

        let plane = {};
        let position = recordPlane["b131"]
        plane.lat = position.lat;
        plane.lon = position.lon;
        plane.targetId = recordPlane["b170"] != null ? recordPlane["b170"] : "Unknown"
        plane.timestamp1 = Math.floor(recordPlane["b073"]) * 1000 + milisToday;
        plane.timestamp2 = plane.timestamp1;
        plane.heading = recordPlane["b160"] != null ? recordPlane["b160"]["trackAngle"] : null;


        if (plane.heading != null) { //if no heading consider other obejct           
            if (planes.ADSB[targetAdress] == null) { //Init array
                planes.ADSB[targetAdress] = [];
            }

            if (planes.ADSB[targetAdress].length > 0) { //If first position exists make previouse extent
                planes.ADSB[targetAdress][planes.ADSB[targetAdress].length - 1].timestamp2 = plane.timestamp1 - 1000;
            }
            //Popup info for AIR targets
            plane.targetAdress = recordPlane["b080"] != null ? recordPlane["b080"] : "Unknown";
            plane.mode3ACode = recordPlane["b070"] != null ? recordPlane["b070"].toString() : "Unknown";
            plane.flightLevel = recordPlane["b145"] != null ? recordPlane["b145"].toString() : "Unknown";
            plane.category = recordPlane["b020"] != null ? recordPlane["b020"] : "Unknown";


            planes.ADSB[targetAdress].push(plane); //add plane

        } else {
            if (planes.others[targetAdress] == null) { //Init array
                planes.others[targetAdress] = [];
            }

            if (planes.others[targetAdress].length > 0) { //If first position exists make previouse extent
                planes.others[targetAdress][planes.others[targetAdress].length - 1].timestamp2 = plane.timestamp1 - 1000;
            }

            //Popup info for GROUND targets

            planes.others[targetAdress].push(plane); //add plane
        }
    }



}

export function decode(buffer) {
    records10 = [];
    records21 = [];
    planes = {
        MLAT: {},
        SMR: {},
        ADSB: {},
        others: {},
    };

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
            pushPlane10SMR();
            // pushPlane10MLAT();


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

