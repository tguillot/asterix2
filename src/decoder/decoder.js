import { parse as parseCat10 } from './cat10/cat10RecordParser.js';
import { parse as parseCat21 } from './cat21/cat21RecordParser.js';
import { int8Toint16 } from './utils/bitUtils.js';
import store from '../store'


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
var empty = false;

export function getRecords10() {
    return records10;
}
export function getRecords21() {
    return records21;
}


function pushRecord10(category, length) {
    records10.push({ category: category, length: length });
}
function pushRecord21(category, length) {
    records21.push({ category: category, length: length });
}

export function pushDataItem10(name, dataItem) {
    records10[records10.length - 1][name] = dataItem;
}
export function pushDataItem21(name, dataItem) {
    records21[records21.length - 1][name] = dataItem;
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
            pushRecord10(CATEGORY_10, length)
            parseCat10(record)
        } else if (category == CATEGORY_21) {
            pushRecord21(CATEGORY_21, length)
            parseCat21(record)
        }
        framesParsed++;
        if (framesParsed % 30000 == 0) {
            console.log("*")
        }
    }

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

