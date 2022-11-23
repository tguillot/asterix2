const { contextBridge } = require('electron');
const { createWriteStream } = require('fs');
const { Transform } = require('json2csv');
const { Readable } = require('stream');
const electron = require('electron');
const path = require('path');
const downloadsFolder = require('downloads-folder');

let loading = false;


contextBridge.exposeInMainWorld('electron', {
  save: (headers, records) => {
    loading="a";
    const dialog = electron.remote.dialog;
    dialog.showSaveDialog( 
    {
      defaultPath: path.join(downloadsFolder(), '/', "data.csv"), 

      buttonLabel: 'Save', 
    // Restricting the user to only Text Files. 
      filters: [ 
        { 
            name: 'csv', 
            extensions: ['csv'] 
        }, ], 
    // Specifying the File Selector Property 
      properties: ['openFile'] 
    }).then(file => {
        let fileName = file.filePath; 
        if (fileName === undefined){
            console.log("You didn't save the file");
            return;
        }
        const opts = { fields:headers };    
        const transformOpts = { highWaterMark: 16384, encoding: 'utf-8' ,objectMode: true};
        const input = new Readable({ objectMode: true });
        input._read = () => {};
        records.forEach(element => {
          input.push(element)
      });
      input.push(null);
        const output = createWriteStream(fileName);
        const json2csv = new Transform(opts, transformOpts);
        
        const processor = input.pipe(json2csv).pipe(output);
        json2csv
        .on('end', () => {
          console.log("finished")
          loading = "b";
          
       })
        .on('error', err => console.log(err));
    });
  } ,
  loading: () => {
    return loading;
  }
});