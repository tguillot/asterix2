const { Parser } = require('json2csv');

self.addEventListener('message', (event) => {

    const json2csvParser = new Parser({ fields:event.data.headers });
    const csv = json2csvParser.parse(event.data.records);
    let fileName = "data" + event.data.records[0]["category"];
    console.log("downloaded");
    self.postMessage({result: csv,fileName:fileName});
})