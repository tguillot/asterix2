
import { Point, Polygon } from "@arcgis/core/geometry";

import { spatialReference } from "./EsriMap";

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

import { stand6 } from "../areas/stand/stand6";
import { stand10 } from "../areas/stand/stand10";
import { stand8 } from "../areas/stand/stand8";
import { stand12 } from "../areas/stand/stand12";
import { stand9 } from "../areas/stand/stand9";



export let areas = {};



export function loadAreas() {
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

  addRing(taxiArea, taxi);

  const stand = new Polygon({
    spatialReference: spatialReference,
  });

  addRing(stand6, stand);
  addRing(stand8, stand);
  addRing(stand9, stand);
  addRing(stand10, stand);
  addRing(stand12, stand);

  areas["airborne"] = airborne;
  areas["apron"] = apron;
  areas["runways"] = runways;
  areas["taxi"] = taxi;
  areas["stand"] = stand;
}

function addRing(waypoints, polygon) {


  const points = [];

  waypoints.forEach((point) => {
    points.push(
      new Point({
        spatialReference: spatialReference,
        latitude: point[1],
        longitude: point[0],
      })
    );
  });
  points.push(
    new Point({
      spatialReference: spatialReference,
      latitude: waypoints[0][1],
      longitude: waypoints[0][0],
    })
  );

  polygon.addRing(points);

}
