import TimeExtent from "@arcgis/core/TimeExtent";

import { SpatialReference } from "@arcgis/core/geometry";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import { getPlanes } from "../decoder/decoder";
import * as watchUtils from "@arcgis/core/core/watchUtils";
import store from "../store";
import geojson from "geojson";
import tokml from "@maphubs/tokml";
import { isProductionelectron } from "../utils/electron";


const ADSB_PLANE = (isProductionelectron() ? "app://public/" : "") + "plane-yellow.svg"
const MLAT_PLANE = (isProductionelectron() ? "app://public/" : "") + "plane-blue.svg"
const SMR_PLANE = (isProductionelectron() ? "app://public/" : "") + "plane-orange.svg"

const ADSB_KEY = "ADSB";
const MLAT_KEY = "MLAT";
const SMR_KEY = "SMR";

export const spatialReference = new SpatialReference({
  wkid: 102100,
});


//initialize map layers and widgets
export function loadLayers(map, view, timeSlider) {
  //Configuration
  view.popup.visibleElements.featureNavigation = false;


  let allLayers = [];
  let allLayerViews = [];

  createADSBLayer(map, allLayers);
  createSMRLayer(map, allLayers);
  createMLATLayer(map, allLayers);


  console.log("number of layers", allLayers.length)
  if (allLayers.length != 0) {

    let promises = allLayers.map(l => view.whenLayerView(l));
    Promise.all(promises).then((layerViews) => {
      allLayerViews = layerViews;
      let promisesLV = layerViews.map(lv => watchUtils.whenFalseOnce(lv, "updating"));
      return Promise.all(promisesLV);
    }).then(() => {
      console.log("done updating");

      let allTimeExtents = allLayerViews[0].layer.timeInfo.fullTimeExtent;
      for (let i = 1; i < allLayerViews.length; i++) {
        allTimeExtents = allTimeExtents.union(allLayerViews[i].layer.timeInfo.fullTimeExtent)
      }
      timeSlider.fullTimeExtent = allTimeExtents;

      //avoids flash of all planes that then disappears
      setTimeout(() => {
        allLayers.forEach(l => l.visible = true);
      }, 500); //allow for inital filters to apply before showing layers


    });

    timeSlider.watch("timeExtent", () => {
      const showPathsMap = store.getters.getShowPathsMap;

      const timePathFilter = new TimeExtent({
        start: timeSlider.fullTimeExtent.start,
        end: timeSlider.timeExtent.end
      });
      const effect = {
        filter: {
          timeExtent: timeSlider.timeExtent,
          geometry: view.extent
        },
        excludedEffect: "grayscale(20%) opacity(30%)"
      };

      allLayerViews.forEach(lv => {
        lv.filter = {
          timeExtent: showPathsMap[lv.layer.id] ? timePathFilter : timeSlider.timeExtent,
          geometry: view.extent
        };
        lv.featureEffect = effect;
      })
    });
  }

}

const saveToKMLAction = {
  title: "Save path as KML",
  id: "save-kml",
  className: "esri-icon-globe"
}

function createADSBLayer(map, allLayers) {
  let planesADSB = getPlanes()[ADSB_KEY];
  console.log("ADSB planes: ", Object.keys(planesADSB).length)


  if (Object.keys(planesADSB).length != 0) {

    let renderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: ADSB_PLANE,
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
            targetId: plane.targetId,
            trackNumber: plane.trackNumber,
            key: plane.key,
            mode3ACode: plane.mode3ACode,
            flightLevel: plane.flightLevel,
            category: plane.category,
          }
        });

      })
    })


    let layer = new FeatureLayer({
      id: ADSB_KEY,
      title: "ADSB Layer",
      visible: false,
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "ObjectID",
      source: features,
      fields: [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "key",
        type: "string"
      },
      {
        name: "trackNumber",
        type: "string"
      }, {
        name: "mode3ACode",
        type: "string"
      }, {
        name: "flightLevel",
        type: "string"
      }, {
        name: "category",
        type: "string"
      }, {
        name: "targetId",
        type: "string"
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
      popupTemplate: {
        title: "{key}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "heading",
                label: "Heading",
                visible: true,
                format: {
                  places: 2
                }
              },
              {
                fieldName: "key",
                label: "Target Adress",
                visible: true,
              },
              {
                fieldName: "targetId",
                label: "Target Id",
                visible: true,
              },
              {
                fieldName: "trackNumber",
                label: "Track Number",
                visible: true,
              },
              {
                fieldName: "mode3ACode",
                label: "Mode 3A Code",
                visible: true,
              },
              {
                fieldName: "flightLevel",
                label: "Flight Level",
                visible: true,
              },
              {
                fieldName: "category",
                label: "Emitter Category",
                visible: true,
              },
            ]
          }
        ]
      }
    });

    layer.popupTemplate.actions = [saveToKMLAction];

    map.add(layer);
    allLayers.push(layer)
    store.dispatch("setShowPathsMap", { key: ADSB_KEY, value: false })

  }

}

function createMLATLayer(map, allLayers) {
  let planesMLAT = getPlanes()[MLAT_KEY];
  console.log("MLAT planes: ", Object.keys(planesMLAT).length)


  if (Object.keys(planesMLAT).length != 0) {

    let renderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: MLAT_PLANE,
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
    Object.keys(planesMLAT).forEach(function (key) {
      planesMLAT[key].forEach(plane => {
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
            targetId: plane.targetId,
            key: plane.key,
            trackNumber: plane.trackNumber,
          }
        });

      })
    })


    let layer = new FeatureLayer({
      title: "MLAT Layer",
      id: MLAT_KEY,
      visible: false,
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "ObjectID",
      source: features,
      fields: [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "key",
        type: "string"
      },
      {
        name: "trackNumber",
        type: "string"
      }, {
        name: "targetId",
        type: "string"
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
      popupTemplate: {
        title: "{key}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "heading",
                label: "Heading",
                visible: true,
                format: {
                  places: 2
                }
              },
              {
                fieldName: "key",
                label: "Target Adress",
                visible: true,
              },
              {
                fieldName: "targetId",
                label: "Target Id",
                visible: true,
              },
              {
                fieldName: "trackNumber",
                label: "Track Number",
                visible: true,
              },
            ]
          }
        ]
      }
    });

    layer.popupTemplate.actions = [saveToKMLAction];

    map.add(layer);
    allLayers.push(layer)
    store.dispatch("setShowPathsMap", { key: MLAT_KEY, value: false })

  }

}

function createSMRLayer(map, allLayers) {
  let planesSMR = getPlanes()[SMR_KEY];
  console.log("SMR planes: ", Object.keys(planesSMR).length)


  if (Object.keys(planesSMR).length != 0) {

    let renderer = {
      type: "simple",
      symbol: {
        type: "picture-marker",
        url: SMR_PLANE,
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
    Object.keys(planesSMR).forEach(function (key) {
      planesSMR[key].forEach(plane => {
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
            key: plane.key, //save as key for consistency
          }
        });

      })
    })


    let layer = new FeatureLayer({
      id: SMR_KEY,
      title: "SMR Layer",
      visible: false,
      spatialReference: spatialReference,
      renderer: renderer,
      objectIdField: "ObjectID",
      source: features,
      fields: [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid"
      }, {
        name: "key",
        type: "string"
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
          value: 1
        }
      },
      popupTemplate: {
        title: "{key}",
        content: [
          {
            type: "fields",
            fieldInfos: [
              {
                fieldName: "heading",
                label: "Heading",
                visible: true,
                format: {
                  places: 2
                }
              },
              {
                fieldName: "key",
                label: "Track Number",
                visible: true,
              },
            ]
          }
        ],
      }
    });

    layer.popupTemplate.actions = [saveToKMLAction];

    map.add(layer);
    allLayers.push(layer);
    store.dispatch("setShowPathsMap", { key: SMR_KEY, value: false })

  }


}


export function getPathAsKML(selectedFeature) {
  let listKey = selectedFeature.layer.id;
  let linePoints = getPlanes()[listKey][selectedFeature.attributes.key].map(point => [point.lon, point.lat])

  const geojsonObject = geojson.parse({ line: linePoints }, { LineString: "line" });
  const name = getKMLFileName(selectedFeature);

  let response = tokml(geojsonObject, { documentName: name, documentDescription: 'KML Export' });
  const lineStyle = "<Style><LineStyle><color>ff00ffff</color><width>8</width></LineStyle></Style>";
  response = response.replace("<LineString>", lineStyle + "<LineString>");
  return response;

}
export function getKMLFileName(selectedFeature) {
  return (selectedFeature.layer.id + "_" + selectedFeature.attributes.key);
}