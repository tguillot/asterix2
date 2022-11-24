const { AsyncParser } = require('json2csv');

self.addEventListener('message', (event) => {
    const opts = { fields:event.data.headers };    
    const asyncParser = new AsyncParser(opts,{ objectMode: true });
    let csv = "";
    asyncParser.processor
    .on('data', chunk => {
        csv += chunk.toString()
    })
    .on('end', () => {
         // Sending `null` to a stream signal that no more data is expected and ends it.
        let fileName = "data" + event.data.records[0]["category"];
        self.postMessage({result: csv,fileName:fileName});
    })
    .on('error', err => console.error(err));
    event.data.records.forEach(element => {
        asyncParser.input.push(element)
    });
    asyncParser.input.push(null);
    
})