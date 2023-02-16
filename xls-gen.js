const XLSX = require('xlsx') ;
const {readFileSync, writeFileSync, readdirSync} = require('fs');
const filenameJson = './i18n/en.json'
const dirName = './i18n';
start();

async function start() {

  function get(obj, path){
    path = path.replace(/\.$/, "");
    return path.split('.').reduce(function(p,prop) { return p[prop] }, obj);
  }

  const isObject = (obj) => obj != null && obj.constructor.name === "Object"

  function getKeys(obj, keepObjKeys, skipArrays, keys=[], scope=[]) {
    if (Array.isArray(obj)) {
      if (!skipArrays) scope.push('[' + obj.length + ']');
      obj.forEach((o) => getKeys(o, keepObjKeys, skipArrays, keys, scope), keys);
    } else if (isObject(obj)) {
      Object.keys(obj).forEach((k) => {
        if ((!Array.isArray(obj[k]) && !isObject(obj[k])) || keepObjKeys) {
          let path = scope.concat(k).join('.').replace(/\.\[/g, '[');
          if (!keys.includes(path)) keys.push(path);
        }
        getKeys(obj[k], keepObjKeys, skipArrays, keys, scope.concat(k));
      }, keys);
    }
    return keys;
  }
  let dirReader = readdirSync(dirName)
  console.log(dirReader);
  files = dirReader.map(fileName => {

    const pathName = dirName + '/' + fileName
    const lang = fileName.split('.')[0]
    console.log(lang);
    return {
      fileName: fileName,
      pathName: pathName,
      lang: lang,
      json:JSON.parse(readFileSync(pathName))
    }
  });
  console.log('finishedMapping');
  let rawData = readFileSync(filenameJson)
  let json = JSON.parse(rawData)
  let labels = getKeys(json, false, true)

  let jsonPrep = [];

  labels.forEach(label => {
    //console.log(label);
    let column = {}
    column["LabelName (!!!)"] = label
    files.forEach(file => {
      //console.log(file.lang);
      try{
        column[file.lang] = get(file.json, label)
      }catch(err){
        column[file.lang] = ' '
      }

    })
    //console.log(column)
    jsonPrep.push(column)

    /* jsonPrep.push({
      "LabelName (!!!)": label,
      "en": get(json, label)
    }) */

    //console.log(label,':', get(json, label));
  })

  let sheet = XLSX.utils.json_to_sheet(jsonPrep)
  let workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, sheet)

  var bin = XLSX.writeFile(workbook, './test-i18n/translations.xls')

  //writeFileSync('./test-i18n/translations.xls',bin)
}


//read json

//create xls file
