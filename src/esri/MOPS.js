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

let idProbabilityData = {
    correct: 0,
    incorrect: 0,
}

const AIRBORNE = "airborne";
const APRON = "apron";
const RUNWAYS = "runways";
const TAXI = "taxi";
const STAND = "stand";
const UNKNOWN = "unkown";

export function calculateMOPS() {

    let mopsCompute = store.getters["getMopsCompute"];
    // if (mopsCompute) {

    updateRate();
    idProbability();


    store.dispatch("setMopsCompute", false);
    // }
}

//should be more than 99.9%
function idProbability() {
    let planesMLAT = getPlanes()[MLAT_KEY];

    Object.keys(planesMLAT).forEach(function (key) { // each plane

        let allIds = {}

        planesMLAT[key].forEach(plane => { //time increases

            //Key = target Address
            if (allIds[plane.targetId]) {
                allIds[plane.targetId] += 1;
            } else {
                allIds[plane.targetId] = 1;
            }
        })

        if (Object.keys(allIds).length != 1) {

            const max = Math.max(...Object.values(allIds));
            idProbabilityData.correct += max;
            let wrongIds = Object.values(allIds).filter(number => number !== max); //removed correct

            wrongIds.forEach(count => {
                idProbabilityData.incorrect += count;
            });

            console.log("plane:", key, allIds)
        } else {
            idProbabilityData.correct += Object.values(allIds)[0];
            // console.log("plane:", key)
        }

    })
    console.log("PROBABILITY ID ", idProbabilityData);
    console.log(idProbabilityData.correct / (idProbabilityData.correct + idProbabilityData.incorrect) * 100);
}

function updateRate() {

    let planesMLAT = getPlanes()[MLAT_KEY];

    Object.keys(planesMLAT).forEach(function (key) { // each plane
        let previousArea = UNKNOWN;
        let timeStampsInArea = [];
        planesMLAT[key].forEach(plane => { //time increases
            const point = new Point({
                spatialReference: spatialReference,
                latitude: plane.lat,
                longitude: plane.lon,
            })

            let newArea = getArea(plane, point);
            timeStampsInArea.push(plane.timestamp1);

            if (previousArea != newArea) {
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
    console.log("UPDATE RATE ", updateRateData);
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