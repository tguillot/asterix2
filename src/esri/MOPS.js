import { Point } from "@arcgis/core/geometry";
import { getPlanes, MLAT_KEY } from "../decoder/decoder";
import store from "../store";
import { spatialReference } from "./EsriMap";
import { areas } from "./readAreas";

let updateRateData = {
    airborne: {
        updates: 0,
        expected: 0,
    },
    apron: {
        updates: 0,
        expected: 0,
    },
    runways: {
        updates: 0,
        expected: 0,
    },
    taxi: {
        updates: 0,
        expected: 0,
    },
    stand: {
        updates: 0,
        expected: 0,
    },
};

let idProbabilityData = {
    correct: 0,
    incorrect: 0,
    
    incorrectWithOutUnkown:0,
}

const AIRBORNE = "airborne";
const APRON = "apron";
const RUNWAYS = "runways";
const TAXI = "taxi";
const STAND = "stand";
const UNKNOWN = "unkown";

const NO_ID="Unknown";

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

            const asArray = Object.entries(allIds); //[[key,value], [key,value]...]
            const filtered = asArray.filter(([key, value]) => value !== max); //removed correct

            filtered.forEach(([key, value]) => {
                if(key!=NO_ID){
                    idProbabilityData.incorrectWithOutUnkown += value;
                }
                idProbabilityData.incorrect += value;
                
            });

            // console.log("plane:", key, allIds)
        } else {
            if(Object.values(allIds)[0]==NO_ID){ //All ids are incorrect
                idProbabilityData.incorrect += Object.values(allIds)[0];
            }else{
                idProbabilityData.correct += Object.values(allIds)[0];
            }
            // console.log("plane:", key)
        }

    })
    idProbabilityData.percetage = idProbabilityData.correct / (idProbabilityData.correct + idProbabilityData.incorrect) * 100;
    idProbabilityData.percentageWithoutUnkowns = 
    idProbabilityData.correct / (idProbabilityData.correct + idProbabilityData.incorrectWithOutUnkown) * 100;
    idProbabilityData.percentageOnlyUnkowns=
    idProbabilityData.correct / (idProbabilityData.correct +idProbabilityData.incorrect - idProbabilityData.incorrectWithOutUnkown) * 100;

    console.log("PROBABILITY ID ", idProbabilityData);
}

const threshold =10*1000;
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
                    if(plane.timestamp1-timeStampsInArea[timeStampsInArea.length-2]>threshold){ //case where dissaperance is in area change
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
             else if(plane.timestamp1-timeStampsInArea[timeStampsInArea.length-2]>threshold){
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
        updateRateData[area].percentage = updateRateData[area].updates *100 / updateRateData[area].expected
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