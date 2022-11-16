import { Point } from "@arcgis/core/geometry";
import { getPlanes, MLAT_KEY } from "../decoder/decoder";
import store from "../store";
import { spatialReference } from "./EsriMap";
import { areas } from "./readAreas";

let updateRateData = {
    airborne: {
    },
    apron: {
    },
    runways: {
    },
    taxi: {
    },
    stand: {
    },
};

let idProbabilityData = {

}

export function getMopsUpdateRate() {
    let formatedItems = [];
    Object.keys(updateRateData).forEach(function (key) {
        formatedItems.push({
            area: key.charAt(0).toUpperCase() + key.slice(1),
            updates: updateRateData[key].updates,
            expected: updateRateData[key].expected,
            percentage: roundPercentage(updateRateData[key].percentage),
        })

    });
    return formatedItems;
}

export function getMopsProbabilitId() {
    let formatedItems = [];
    formatedItems.push({
        correct: idProbabilityData.correct,
        incorrect: idProbabilityData.incorrect,
        incorrectOnlyUnknowns: idProbabilityData.incorrect - idProbabilityData.incorrectWithOutUnkown,

        percentage: roundPercentage(idProbabilityData.percentage),
        percentageOnlyUnkowns: roundPercentage(idProbabilityData.percentageOnlyUnkowns),
    })
    if (!formatedItems[0].incorrectOnlyUnknowns && formatedItems[0].incorrectOnlyUnknowns != 0) {
        formatedItems[0].incorrectOnlyUnknowns = undefined;
    } //to avoid showing Nan in the table
    return formatedItems;
}

function roundPercentage(num) {
    if (!num) {
        return undefined
    }
    return Math.round(num * 100) / 100
}

const AIRBORNE = "airborne";
const APRON = "apron";
const RUNWAYS = "runways";
const TAXI = "taxi";
const STAND = "stand";
const UNKNOWN = "unkown";

const NO_ID = "Unknown";

export function calculateMOPS() {
    updateRate();
    idProbability();
}

//should be more than 99.9%
function idProbability() {
    idProbabilityData.correct = 0;
    idProbabilityData.incorrect = 0;
    idProbabilityData.incorrectWithOutUnkown = 0;
    idProbabilityData.percentage = 0;
    idProbabilityData.percentageOnlyUnkowns = 0;

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

            const asArray = Object.entries(allIds); //[[key,value], [key,value]...]
            const filtered = asArray.filter(([key, value]) => value !== max); //removed correct

            filtered.forEach(([key, value]) => {
                if (key != NO_ID) {
                    idProbabilityData.incorrectWithOutUnkown += value;
                }
                idProbabilityData.incorrect += value;

            });

            // console.log("plane:", key, allIds)
        } else {
            if (Object.values(allIds)[0] == NO_ID) { //All ids are incorrect
                idProbabilityData.incorrect += Object.values(allIds)[0];
            } else {
                idProbabilityData.correct += Object.values(allIds)[0];
            }
            // console.log("plane:", key)
        }

    })
    idProbabilityData.percentage = idProbabilityData.correct / (idProbabilityData.correct + idProbabilityData.incorrect) * 100;

    let diffIds = idProbabilityData.incorrectWithOutUnkown;

    idProbabilityData.percentageOnlyUnkowns =
        (idProbabilityData.correct + diffIds) / (idProbabilityData.correct + idProbabilityData.incorrect) * 100;

    console.log("PROBABILITY ID ", idProbabilityData);
}

const threshold = 5 * 1000;
function updateRate() {
    Object.keys(updateRateData).forEach(function (area) { // calculate each percentage 
        updateRateData[area].updates = 0;
        updateRateData[area].expected = 0;
    });


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
                    if (plane.timestamp1 - timeStampsInArea[timeStampsInArea.length - 2] > threshold) { //case where dissaperance is in area change
                        timeStampsInArea.pop(); //remove last timestamp that is too far away  
                    }
                    updateRateData[previousArea]["updates"] += timeStampsInArea.length;
                    let expected = Math.ceil((timeStampsInArea[timeStampsInArea.length - 1] - timeStampsInArea[0]) / 1000) + 1;
                    updateRateData[previousArea]["expected"] += expected;

                    // updateRateData[previousArea]["history"].push(timeStampsInArea);

                    //    if (expected > timeStampsInArea.length){
                    //         console.log(key, " ERROR AREA expected: ", expected, " updates: ", timeStampsInArea.length)
                    //         console.log(timeStampsInArea)
                    //         console.log("from: ", previousArea, "to: ", newArea)
                    //     }
                }

                previousArea = newArea;
                timeStampsInArea = [];
                timeStampsInArea.push(plane.timestamp1);
            }
            else if (plane.timestamp1 - timeStampsInArea[timeStampsInArea.length - 2] > threshold) {
                if (newArea != UNKNOWN) {
                    timeStampsInArea.pop(); //remove last timestamp that is too far away
                    updateRateData[previousArea]["updates"] += timeStampsInArea.length;
                    let expected = Math.ceil((timeStampsInArea[timeStampsInArea.length - 1] - timeStampsInArea[0]) / 1000) + 1;
                    updateRateData[previousArea]["expected"] += expected;
                }

                timeStampsInArea = [];
                timeStampsInArea.push(plane.timestamp1);
            }
        })
    })

    Object.keys(updateRateData).forEach(function (area) { // calculate each percentage 
        updateRateData[area].percentage = updateRateData[area].updates * 100 / updateRateData[area].expected
    });
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