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

var records = [];

function pushRecord(category, length) {
    records.push({ category: category, length: length });
}

export function pushDataItem(name, dataItem) {
    records[records.length - 1][name] = dataItem;
}


export function decode(buffer) {
    console.log("decode")
    startTimer();
    let arrayInts = new Uint8Array(buffer);
    let i = 0;
    let framesParsed = 1;
    while (i < arrayInts.length) {
        let category = arrayInts[i];
        let length = int8Toint16(arrayInts[i + 1], arrayInts[i + 2]);
        let record = arrayInts.subarray(i + 3, i + length);
        i += length;

        if (category == CATEGORY_10) {
            pushRecord(CATEGORY_10, length)
            parseCat10(record)
        } else if (category == CATEGORY_21) {
            pushRecord(CATEGORY_21, length)
            parseCat21(record)
        }
        // else {
        //     console.log("Warning: category not supported ", category, "framesParsed", framesParsed)
        // }
        framesParsed++;
        if (framesParsed % 30000 == 0) {
            console.log("*")
        }
    }

    endTimer();
    console.log("framesParsed", framesParsed - 1)
    console.log(records[0])

    store.dispatch("setData", records);

    // for (let j = 0; j < 3; j++)
    //     console.log(global.data.records[j])
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

