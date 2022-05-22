// AUTO GENERATE SIMPLE UNIQUE ID'S FOR NON-EMPTY ROWS
//
// SETTINGS
// SHEETNAME = Name of spreadsheet to monitor
// ID_COLUMN = The column where you want your UID injected. Injection corresponds to the row that triggered this script.
// LOOKUP_COLUMN = The column where you verify value exists in order to only write IDs to valid rows that need it
// 
// REFERENCES:
// https://developers.google.com/apps-script/guides/triggers/events

var SHEETNAME = "Budgets";
var ID_COLUMN = 1;
var LOOKUP_COLUMN = 3;

function onEdit(edit) {
  var range = edit.range;
  var sheet = range.getSheet();
  if(sheet.getSheetName() !== SHEETNAME) return;
  checkEmptyRows()
}

// loop through 1000 rows to check if row is empty
function checkEmptyRows() {
  for(var i =1; i < 1000; i++) {
    
    var idGenerator = "id" + Math.random().toString(16).slice(2) // generator for the ids
    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEETNAME)
    var lookup_val = sheet.getRange(i, LOOKUP_COLUMN).getValue(); // get value from specified column
    var id_col = sheet.getRange(i, ID_COLUMN); // create var for unique id column
    var get_id = id_col.getValue(); // get id col
    
    if(lookup_val != "" && get_id == ""){ // if all conditions are met, insert value
      sheet.getRange(i, 1).setValue( idGenerator );
    }
  }
}

