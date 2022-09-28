import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { SpatialReference } from "@arcgis/core/geometry";

export let map;
export let view;
export let droneLayer;
export let droneModelLayer;
export let dronePathsLayer;
export let layerFP;
export let layerFP2;
export let areaLayer;
export let footprintLayer;
export let radLayer;

export const spatialReference = new SpatialReference({
  wkid: 102100,
});


//initialize map layers and widgets
export function initializeMap() {
  map = new ArcGISMap({
    basemap: "hybrid",
  });


  //  "streets" , "satellite" , "hybrid", "topo", "gray", "dark-gray", "oceans", "national-geographic",
  // "terrain", "osm", "dark-gray-vector", gray-vector", "streets-vector", "streets-night-vector", 
  //"streets-relief-vector", "streets-navigation-vector" and "topo-vector".

  view = new MapView({
    container: "viewDiv",
    map: map,
    // spatialReference: spatialReference,
    center: [2.09511400, 41.29561800],
    zoom: 15
  });



}
