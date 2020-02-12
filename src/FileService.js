const electron = window.require('electron');
const path = window.require('path');
const fs = window.require('fs');


export default class FileService {
  constructor(opts) {
    const userDataPath = (electron.app || electron.remote.app).getPath('userData');
    this.path = path.join(userDataPath, opts.fileName + '.json');
    
    this.data = parseDataFile(this.path, opts.defaults);
  }

  get = key => {
    return this.data[key];
  }

  set = (key, val) => {
    if (key) {
      this.data[key] = val;
    }
    fs.writeFileSync(this.path, JSON.stringify(this.data));
  }
}


const parseDataFile = (filePath, defaults) => {
  try {
    // console.log('Succesfully read file');
    return JSON.parse(fs.readFileSync(filePath));
  } catch(e) {
    // console.log('Reverted to defaults');
    fs.writeFileSync(filePath, JSON.stringify(defaults));
    return defaults;
  }
}


//module.exports = FileService;
