var xlsx = require("xlsx");
var fs = require('fs');

var wb = xlsx.readFile("ExcelSheets/ShootingGameData.xlsx");
console.log(wb.SheetNames);

wb.SheetNames.forEach(sheet => {
    var ws = wb.Sheets[sheet];
    var dataInJson = xlsx.utils.sheet_to_json(ws);
    var fileName = "./BuiltFiles/"+sheet+".json";
    fs.writeFile(fileName, JSON.stringify(dataInJson), function(err){
        if(err) throw err;
    });
});
