// AUTO GENERATE SIMPLE UNIQUE ID'S FOR NON-EMPTY ROWS
//
// Purpose: This Google Sheets script fires when any cell is edited and
// inserts a random (reasonably unique) UID of ID_LENGTH length
// into the specified ID_COLUMN. For instance if the first column in the
// sheet specified by SHEETNAME is the column where you would like the
// UID injected, then ID_COLUMN should be 1.
//
// SETTINGS
// SHEETNAME = Name of spreadsheet to monitor
// ID_COLUMN = The column where you want your UID injected. Injection corresponds to the row that triggered this script.
// 
// REFERENCES:
// https://developers.google.com/apps-script/guides/triggers/events
// https://www.fiznool.com/blog/2014/11/16/short-id-generation-in-javascript/

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
    
    var idGenerator = "id" + Math.random().toString(16).slice(2)

    console.log(idGenerator)

    var sheet = SpreadsheetApp.getActive().getSheetByName(SHEETNAME)
    
    var lookup_val = sheet.getRange(i, LOOKUP_COLUMN).getValue(); // get value from specified column

    var id_col = sheet.getRange(i, ID_COLUMN); // create var for unique id column
    var get_id = id_col.getValue(); // get id col

    console.log(get_id)
    
    if(lookup_val != "" && get_id == ""){ // if empty, return current date as id
      sheet.getRange(i, 1).setValue( idGenerator ); // if everything above checks out. use the ID of Date.now()
    }
  }
}

