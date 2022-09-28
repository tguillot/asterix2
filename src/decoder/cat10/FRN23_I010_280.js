// Presence
// Definition:
// Positions of all elementary presences constituting a plot.
// Format:
// Repetitive Data Item, starting with a one octet Field
// Repetition Indicator (REP) indicating the number of
// presences associated to the plot, followed by series of two
// octets (co-ordinates differences) as necessary.

import { intArrayToCharsAIS, maskAndShift } from "../utils/bitUtils.js";

import { pushDataItem } from "../decoder";

const name = "pressence";
let byteLength = 0;
const multiple = 2;

export function parse(record) {

    let rep = record[0];
    byteLength = 1 + rep * multiple

    let pressenceArray = [];
    for (let i = 0; i < rep; i++) {
        let DRHO = record[1 + i * multiple];
        let DTHETA = record[2 + i * multiple];
        let pressence = {
            DRHO: DRHO,
            DTHETA: DTHETA
        };
        pressenceArray.push(pressence);
    }

    pushDataItem(name, {
        pressenceArray: [pressenceArray]
    });

    return record.subarray(byteLength);
}



