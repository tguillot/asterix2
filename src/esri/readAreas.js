
import { Point, Polygon } from "@arcgis/core/geometry";

import {  spatialReference } from "./EsriMap";

import { airborn37 } from "../areas/airborne/Airborne37";
import { airborn38 } from "../areas/airborne/Airborne38";
import { airborn39 } from "../areas/airborne/Airborne39";
import { airborn40 } from "../areas/airborne/Airborne40";
import { airborn41 } from "../areas/airborne/Airborne41";
import { airborn42 } from "../areas/airborne/Airborne42";

import { apronTerms } from "../areas/apron/ApronTerm";
import { apronHouses } from "../areas/apron/ApronHouses";
import { apronCones } from "../areas/apron/ApronCones";

import { RWY02 } from "../areas/runways/RWY02.js";
import { RWY25L } from "../areas/runways/RWY25L.js";
import { RWY25R } from "../areas/runways/RWY25R.js";
import { taxiArea } from "../areas/taxi/Taxi";



export let areas = {};



export function loadAreas(){
    const airborne = new Polygon({
        spatialReference: spatialReference,
      });

      addRing(airborn37, airborne);
      addRing(airborn38, airborne);
      addRing(airborn39, airborne);
      addRing(airborn40, airborne);
      addRing(airborn41, airborne);
      addRing(airborn42, airborne);

      const apron = new Polygon({
        spatialReference: spatialReference,
      });

      addRing(apronCones, apron);
      addRing(apronHouses, apron);
      addRing(apronTerms, apron);

      const runways = new Polygon({
        spatialReference: spatialReference,
      });

      addRing(RWY02, runways);
      addRing(RWY25L, runways);
      addRing(RWY25R, runways);

      const taxi = new Polygon({
        spatialReference: spatialReference,
      });

      addRing(taxiArea,taxi);

      areas["airborne"] =airborne;
      areas["apron"] =apron;
      areas["runways"] =runways;
      areas["taxi"] =taxi;
}

function addRing(waypoints, polygon) {

     
      const points = [];
  
      waypoints.forEach((point) => {
        points.push(
          new Point({
            spatialReference: spatialReference,
            latitude: point[0],
            longitude: point[1],
          })
        );
      });
      points.push(
        new Point({
          spatialReference: spatialReference,
          latitude: waypoints[0][0],
          longitude: waypoints[0][1],
        })
      );
  
      polygon.addRing(points);
     
  }
  