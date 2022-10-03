import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";

import { SpatialReference } from "@arcgis/core/geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { getPlanes } from "../decoder/decoder";


export const spatialReference = new SpatialReference({
  wkid: 102100,
});

export function resetMap() {
  console.log("reset")

  if (map) {
    console.log("reset")

    let featureLayer = map.getLayers().getArray()[0];
    if (featureLayer) {
      console.log("removed feature layer")
      map.removeLayer(oldLayer);

      // featureLayer.getSource().clear()
      // featureLayer.setSource(undefined);

    }
  }


}

//initialize map layers and widgets
export function loadLayers(map, view) {
  console.log("load layers")

  // resetMap();
  createPlaneLayers(map, view);

}

function createPlaneLayers(map, view) {
  let planesADSB = getPlanes()["ADSB"];


  if (planesADSB.length > 0) {
    console.log("planes found")

    let renderer = {
      type: "simple", // autocasts as new SimpleRenderer()
      symbol: {
        type: "picture-marker", // autocasts as new SimpleMarkerSymbol()
        url: "plane.svg",
        width: 14,
        height: 14
      },
    };

    let features = [];

    planesADSB.forEach(plane => {
      features.push({
        geometry: {
          type: "point",
          spatialReference: spatialReference,
          latitude: plane.lat,
          longitude: plane.lon,
        },
        attributes: plane,
      })
    })

    let featureLayer = new FeatureLayer({
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "planeId",
      source: features,
      title: "PLANES LAYER"
    });

    console.log("added layer to map")
    map.add(featureLayer);
  }


}
