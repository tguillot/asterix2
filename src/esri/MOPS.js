import { Point } from "@arcgis/core/geometry";
import { MLAT_KEY } from "../decoder/decoder";
import { spatialReference } from "./EsriMap";
import { areas } from "./readAreas";

let updateRateData = {
    airborne: {
        intervals:[],
        missedUpdates: 0,
    },
    apron: {
        intervals:[],
        missedUpdates: 0,
    },
    runways: {
        intervals:[],
        missedUpdates: 0,
    },
    taxi: {
        intervals:[],
        missedUpdates: 0,
    },
    stand: {
        intervals:[],
        missedUpdates: 0,
    }
};





export function calculateMOPSUpdateRate(){
    
    let planesMLAT = getPlanes()[MLAT_KEY];


    let mopsCompute = store.getters["getMopsCompute"];
    if (mopsCompute) {
        Object.keys(planesMLAT).forEach(function (key) {
            planesMLAT[key].forEach(plane => {
                const point = new Point({
                    spatialReference: spatialReference,
                    latitude: plane.lat,
                    longitude: plane.lon,
                })

                let timeDiff = plane.timestamp2-plane.timestamp1 + 1000;

                if(plane.groundBit == 0){ //in the air
                   if( areas["airborne"].contains(point)){
                        saveData("airborne", timeDiff);
                   }

                }else if (plane.groundBit==1){ //on the ground

                    if(areas["runways"].contains(point)){
                        saveData("runways", timeDiff);
                    }else if(areas["apron"].contains(point)){
                        saveData("apron", timeDiff);
                    }else if(areas["stand"].contains(point)){
                        saveData("stand", timeDiff);
                    }else if (areas["taxi"].contains(point)){
                        saveData("taxi", timeDiff);
                    }         
                }  
      
            })
          })
     
        store.dispatch("setMopsCompute", false);
    }

}

function saveData(areaName, timeDiff){
    updateRateData[areaName].intervals.push(timeDiff);
    if(timeDiff>1000){
        updateRateData[areaName].missedUpdates += 1;
    }
}