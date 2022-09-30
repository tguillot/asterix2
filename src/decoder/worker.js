import { decode } from "./decoder.js";

addEventListener("message", (event) => {
  postMessage({ key: "working", value: true });//begin

  
  decode(...event.data.args);
//   postMessage({
//     key: "data",
//     value: ,
//   });

  postMessage({ key: "working", value: false });
});
