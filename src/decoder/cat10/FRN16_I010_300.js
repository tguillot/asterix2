// Vehicle Fleet Identification
// Definition:
// Vehicle fleet identification number.
// Format:
// One octet fixed length Data Item.

import { pushDataItem10 } from "../decoder";

const name = "a300";
const byteLength = 1;
const item = ["Unknown", "ATC equipment maintenance", "Airport maintenance", "Fire", "Bird scarer", "Snow plough", "Runway sweeper",
    "Emergency", "Police", "Bus", "Tug (push/tow)", "Grass cutter", "Fuel", "Baggage", "Catering", "Aircraft maintenance", "Flyco (follow me)"]
export function parse(record) {

    let indexVFI = record[0];

    pushDataItem10(name, item[indexVFI])

    return record.subarray(byteLength);
}



