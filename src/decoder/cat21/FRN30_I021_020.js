// Emitter Category
// Definition : Characteristics of the originating ADS-B unit.
// Format :
// One-Octet fixed length data item.


import { pushDataItem } from "../decoder";

const name = "emitter_category";
const byteLength = 1;
const item = ["No ADS-B Emitter Category Information", "light aircraft <= 15500 lbs", "15500 lbs < small aircraft <75000 lbs",
    "75000 lbs < medium a/c < 300000 lbs", "High Vortex Large",
    "300000 lbs <= heavy aircraft", "highly manoeuvrable (5g acceleration capability) and high speed (>400 knots cruise)",
    "reserved", "reserved", "reserved", "rotocraft", "glider or sailplane", "lighter-than-air",
    "unmanned aerial vehicle", "space or transatmospheric vehicle", "ultralight or handglider or paraglider",
    "parachutist or skydiver", "reserved", "reserved", "reserved", "surface emergency vehicle", "surface service vehicle", "fixed ground or tethered obstruction",
    "cluster obstacle", "line obstacle"]
export function parse(record) {

    let indexECAT = record[0];

    pushDataItem(name, item[indexECAT]);

    return record.subarray(byteLength);
}



