// Emitter Category
// Definition : Characteristics of the originating ADS-B unit.
// Format :
// One-Octet fixed length data item.


import { pushDataItem21 } from "../decoder";

const name = "b020";
const byteLength = 1;
const item = ["No Information", "light aircraft", "small aircraft",
    "medium aircraft", "High Vortex Large",
    "heavy aircraft", "highly manoeuvrable high speed",
    "reserved", "reserved", "reserved", "rotocraft", "glider/sailplane", "lighter-than-air",
    "unmanned aerial vehicle", "space or transatmospheric vehicle", "ultralight/handglider/paraglider",
    "parachutist or skydiver", "reserved", "reserved", "reserved", "surface emergency vehicle", "surface service vehicle", "fixed ground or tethered obstruction",
    "cluster obstacle", "line obstacle"]
export function parse(record) {

    let indexECAT = record[0];

    pushDataItem21(name, item[indexECAT]);

    return record.subarray(byteLength);
}



