import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TimeExtent from "@arcgis/core/TimeExtent";

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

  createPlaneLayers(map, view)

}




function createPlaneLayers(map, view) {
  let planesADSB = getPlanes()["ADSB"];


  if (planesADSB.length > 0) {
    console.log("planes found")

    let renderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "plane.svg",
        width: 20,
        height: 20,
        angle: 90,
      },
      visualVariables: [{
        type: "rotation",
        field: "heading",
        rotationType: "geographic"
      }]
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
        attributes: {
          planeId: plane.planeId,
          heading: plane.heading,
          timestamp: plane.timestamp,
        }
      });

    })


    let layer = new FeatureLayer({
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "planeId",
      source: features,
      title: "PLANES LAYER",
      fields: [{
        name: "planeId",
        type: "oid"
      }, {
        name: "heading",
        type: "double"
      }, {
        name: "timestamp",
        type: "double"
      },
      ],
      timeInfo: {
        startField: "timestamp", // name of the date field
        endField: "timestamp", // name of the date field
      },
    });

    map.add(layer);
    console.log(features[2])




    // const timeSlider = new TimeSlider({
    //   container: "timeSlider",
    //   mode: "instant",
    //   timeVisible: true,
    //   stops: {
    //     interval: {
    //       value: 1,
    //       unit: "seconds"
    //     }
    //   }
    // });
    // view.ui.add(timeSlider, "bottom-left");

    // view.whenLayerView(layer).then(function (lv) {
    //   const fullTimeExtent = layer.timeInfo.fullTimeExtent;
    //   timeSlider.fullTimeExtent = fullTimeExtent;
    // });
  }

}
