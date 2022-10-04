import TimeSlider from "@arcgis/core/widgets/TimeSlider";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";


// export function initializeTimeSlider() {
//   const layer = new FeatureLayer({
//     url:
//       "https://services9.arcgis.com/RHVPKKiFTONKtxq3/arcgis/rest/services/NDFD_Precipitation_v1/FeatureServer/0"
//   });

//   map.addMany([layer])

//   const timeSlider = new TimeSlider({
//     container: "timeSlider",
//     view: view,
//     timeVisible: true, // show the time stamps on the timeslider
//     mode: "instant",
//     layout: "auto"
//   });


//   view.whenLayerView(layer).then((lv) => {
//     timeSlider.fullTimeExtent = layer.timeInfo.fullTimeExtent.expandTo("hours");
//     timeSlider.stops = {
//       interval: layer.timeInfo.interval
//     };
//   });

// timeSlider.watch("timeExtent", () => {
//   // gray out earthquakes that are outside of the current timeExtent
//   layerView.featureEffect = {
//     filter: {
//       timeExtent: timeSlider.timeExtent,
//       geometry: view.extent
//     },
//     excludedEffect: "grayscale(20%) opacity(12%)"
//   };
// });




// }


//https://developers.arcgis.com/javascript/latest/sample-code/timeslider-filter/