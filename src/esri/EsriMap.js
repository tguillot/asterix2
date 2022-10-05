import ArcGISMap from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import TimeExtent from "@arcgis/core/TimeExtent";

import { SpatialReference } from "@arcgis/core/geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { getPlanes } from "../decoder/decoder";
import FeatureFilter from "@arcgis/core/layers/support/FeatureFilter";


export const spatialReference = new SpatialReference({
  wkid: 102100,
});


//initialize map layers and widgets
export function loadLayers(map, view, timeSlider) {

  createPlaneLayers(map, view, timeSlider)

}


function createPlaneLayers(map, view, timeSlider) {
  let planesADSB = getPlanes()["ADSB"];


  if (Object.keys(planesADSB).length != 0) {
    console.log("planes found")

    let renderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: "plane.svg",
        width: 20,
        height: 20,
        angle: 270,
      },
      visualVariables: [{
        type: "rotation",
        field: "heading",
        rotationType: "geographic"
      }]
    };


    let features = [];
    Object.keys(planesADSB).forEach(function (key) {
      planesADSB[key].forEach(plane => {
        features.push({
          geometry: {
            type: "point",
            spatialReference: spatialReference,
            latitude: plane.lat,
            longitude: plane.lon,
          },
          attributes: {
            heading: plane.heading,
            timestamp1: plane.timestamp1,
            timestamp2: plane.timestamp2,
          }
        });

      })
    })


    let layer = new FeatureLayer({
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "ObjectID",
      source: features,
      title: "PLANES LAYER",
      fields: [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "heading",
        type: "double"
      }, {
        name: "timestamp1",
        type: "date"
      },
      {
        name: "timestamp2",
        type: "date"
      },
      ],
      timeInfo: {
        startField: "timestamp1",
        endField: "timestamp2",
        interval: {
          unit: "seconds",
          value: 1 //want to be able to swauch planes in this inteval so no dupes
        }
      },
    });
    map.add(layer);


    console.log(features[1])
    console.log(features[2])



    let layerView;

    view.whenLayerView(layer).then(function (lv) {
      layerView = lv;
      const fullTimeExtent = layer.timeInfo.fullTimeExtent;
      timeSlider.fullTimeExtent = fullTimeExtent;
      timeSlider.stops = {
        interval: layer.timeInfo.interval
      };
    });

    timeSlider.watch("timeExtent", () => {

      const timePathFilter = new TimeExtent({
        start: timeSlider.fullTimeExtent.start,
        end: timeSlider.timeExtent.end
      });


      layerView.filter = {
        timeExtent: timePathFilter,
        geometry: view.extent
      };


      // gray out earthquakes that are outside of the current timeExtent
      layerView.featureEffect = {
        filter: {
          timeExtent: timeSlider.timeExtent,
          geometry: view.extent
        },
        excludedEffect: "grayscale(20%) opacity(30%)"
      };
    });
  }

}

 //https://developers.arcgis.com/javascript/latest/sample-code/timeslider-filter/

    //Feature filter https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureFilter.html

//feature filter https://developers.arcgis.com/javascript/latest/api-reference/esri-views-layers-support-FeatureFilter.html

//POPUP and no endtime https://developers.arcgis.com/javascript/latest/sample-code/timeslider-filter/

//feasture effect to exclude stuff https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-support-FeatureEffect.html