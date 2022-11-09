import { Point } from "@arcgis/core/geometry";
import { getPlanes, MLAT_KEY } from "../decoder/decoder";
import store from "../store";
import { spatialReference } from "./EsriMap";
import { areas } from "./readAreas";

let updateRateData = {
    airborne: {
        updates: 0,
        expected: 0,
        history: [],
    },
    apron: {
        updates: 0,
        expected: 0,
        history: [],
    },
    runways: {
        updates: 0,
        expected: 0,
        history: [],
    },
    taxi: {
        updates: 0,
        expected: 0,
        history: [],
    },
    stand: {
        updates: 0,
        expected: 0,
        history: [],
    },
};

const AIRBORNE = "airborne";
const APRON = "apron";
const RUNWAYS = "runways";
const TAXI = "taxi";
const STAND = "stand";
const UNKNOWN = "unkown";



export function calculateMOPSUpdateRate() {

    let planesMLAT = getPlanes()[MLAT_KEY];

    console.log("START CALCULATING");

    let mopsCompute = store.getters["getMopsCompute"];
    // if (mopsCompute) {
    Object.keys(planesMLAT).forEach(function (key) { // each plane
        // let key = "34560D"

        let previousArea = UNKNOWN;
        let timeStampsInArea = [];

        // console.log("plane: ", key)
        planesMLAT[key].forEach(plane => { //time increases
            const point = new Point({
                spatialReference: spatialReference,
                latitude: plane.lat,
                longitude: plane.lon,
            })

            let newArea = getArea(plane, point);

            timeStampsInArea.push(plane.timestamp1);

            if (previousArea != newArea) {
                // console.log("prev: ", previousArea, " new: ", newArea)
                if (previousArea != UNKNOWN) {
                    updateRateData[previousArea]["updates"] += timeStampsInArea.length;
                    updateRateData[previousArea]["expected"] +=
                        (timeStampsInArea[timeStampsInArea.length - 1] - timeStampsInArea[0]) / 1000;
                    // updateRateData[previousArea]["history"].push(timeStampsInArea);
                }

                previousArea = newArea;
                timeStampsInArea = [];
                timeStampsInArea.push(plane.timestamp1);
            }
        })
    })

    console.log("DONE CALCULATING");
    console.log(updateRateData);

    store.dispatch("setMopsCompute", false);
    // }

}

function getArea(plane, point) {
    if (plane.groundBit == 0) { //in the air
        if (areas["airborne"].contains(point)) {
            return AIRBORNE
        }
    } else if (plane.groundBit == 1) { //on the ground
        if (areas["runways"].contains(point)) {
            return RUNWAYS;
        } else if (areas["stand"].contains(point)) {
            return STAND;
        } else if (areas["apron"].contains(point)) {
            return APRON;
        } else if (areas["taxi"].contains(point)) {
            return TAXI;
        }
    }
    return UNKNOWN;
}