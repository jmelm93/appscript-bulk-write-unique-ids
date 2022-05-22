// AUTO GENERATE SIMPLE UNIQUE ID'S FOR NON-EMPTY ROWS
//
// Purpose: This Google Sheets script fires when any cell in `column` array is changed
// inserts a random UID into the specified ID_COLUMN if none exists.
// Only works if change occurs on one of the sheets from `SHEETNAME_ARRAY`
//

var SHEETNAME_ARRAY = [ // fucntion only runs if tab name is one of the below
  "Sheet name 1",
  "Sheet name 2",
  "Sheet name 3"
];

var ID_COLUMN = 1;
var column = [2,3,4,5]; // List of Column if those updated then function will call. You can add multiple like [2,3,4]

function onEdit(e) {

  var ActieSheet = e.source.getActiveSheet(); 
  var ActiveSheetName = ActieSheet.getName()
  console.log(ActiveSheetName)
  
  var ss= SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ActiveSheetName);

    // if(ActieSheet.getName() == SHEETNAME){
    if (inArray(ActiveSheetName, SHEETNAME_ARRAY)) {

      var cell = e.range;
      var col = cell.getColumn(); // This is how you get edited col number
      var row = cell.getRow(); // This is how you get edited row number     

      if(column.includes(col)){   

        writeIdToAllRows(sheet=ss) // Checking all rows

      }
  }
  
}

function inArray(value, array) { // if value in array then return true
    return array.indexOf(value) > -1;
}

function writeIdToAllRows(sheet) { // Checking all rows

  var range= sheet.getRange(2,1,sheet.getLastRow()-1,1).getValues();

  var i=2; // row 
  range.map(function r(r){
      if(r[0] == ""){
        var idGenerator = "id" + Math.random().toString(16).slice(2) // generator for the ids
        sheet.getRange(i,ID_COLUMN).setValue(idGenerator)
      }
      i++;
  })
}
