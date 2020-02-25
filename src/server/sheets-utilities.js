// Use ES6/7 code
const doGet = () => {
  const html = HtmlService.createTemplateFromFile("main");
  return html.evaluate().setTitle("ARDMOR INC");
};

const getUserEmail = () => {
  var user = Session.getEffectiveUser().getEmail();
  return user;
};

const getDriveID = () => {
  let driveId = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName("Settings")
    .getRange("B1")
    .getValue();

  return driveId;
};

const getDriveFolders = () => {
  // Log the name of every folder in the user's Drive.
  let folders = DriveApp.getFolders();
  let data = [];
  while (folders.hasNext()) {
    let folder = folders.next();
    //Logger.log(folder.getName() + " " + folder.getId());
    data.push([folder.getName(), folder.getId()]);
  }

  data.sort();
  data.sort(function(a, b) {
    return a[0] - b[0];
  });

  return data;
};

/**
 * Extracts the columns we want displayed on the pdf, saves them to a temporary sheet, creates pdf from temp sheet, destroy temp sheet
 * @param {tabName} tabname name of the current sheet tab
 * @param {folderId} folderId id of folder chosen to save ot in Drive
 * @param {fileName} fileName to save as
 */
const saveAsPDF = (tabname, folderId, filename) => {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabname);
  //let id = ss.getSheetId();
  let finalData = [];

  //Take only the columns we want to show on the PDF: A-E,,G,I-J,M P,Q
  let sourceValues = ss.getRange(1, 1, ss.getLastRow(), 17).getDisplayValues();
  for (let h = 0; h < sourceValues.length; h++) {
    let tempData = [];

    // Loop through the rows taking the columns we want creating a new array
    for (let i = 0; i < sourceValues[0].length; i++) {
      if (i == 5 || i == 7 || i == 9 || i == 10 || i == 11) {
        continue;
      } else if (
        i == 0 ||
        i == 1 ||
        i == 2 ||
        i == 3 ||
        i == 4 ||
        i == 6 ||
        i == 8 ||
        i == 12 ||
        i == 15 ||
        i == 16
      ) {
        tempData.push(sourceValues[h][i]);
      } else {
        tempData.push("");
      } // insert blanks
    }
    finalData.push(tempData);
  }

  // No data
  if (finalData[0].length < 1) return -1;

  const numRows = finalData.length;
  const numCols = finalData[0].length;
  const thisUuid = uuid();
  let newSpreadsheet = SpreadsheetApp.create(thisUuid, numRows, numCols);
  SpreadsheetApp.flush();
  let newSpreadsheetId = newSpreadsheet.getId();
  let url = newSpreadsheet.getUrl();

  let tempSpreadsheet = SpreadsheetApp.openById(newSpreadsheetId);
  let activeTempSheet = tempSpreadsheet.getSheetByName("Sheet1");

  // Set values
  tempSpreadsheet
    .getSheetByName("Sheet1")
    .getRange(1, 1, numRows, numCols)
    .setValues(finalData);
  SpreadsheetApp.flush();

  let fullURL = url; // + url_ext;

  let blob = SpreadsheetApp.openByUrl(fullURL)
    .getBlob()
    .setName(filename + ".pdf")
    .getAs("application/pdf");

  let folder = DriveApp.getFolderById(folderId);
  let pdfFile = folder.createFile(blob);
  let downloadURL = pdfFile.getDownloadUrl();

  DriveApp.getFileById(newSpreadsheetId).setTrashed(true);

  let res = { downloadURL: downloadURL, folderURL: folder.getUrl() };

  //return folder.getUrl();
  return res;
};

const uuid = () => {
  return Utilities.getUuid();
};

const setUpdateID = key => {
  let lock = LockService.getScriptLock();
  lock.waitLock(15000);

  const newID = Utilities.getUuid();
  PropertiesService.getDocumentProperties().setProperty(key, newID);

  lock.releaseLock();
};

const getUpdateID = key => {
  let p = PropertiesService.getDocumentProperties().getProperty(key);
  // Init if no property for the key
  console.log(" P " + p);
  if (!p) {
    setUpdateID(key);
  }
  return p;
};

const compareUpdateID = (key, currentStateUpdateID) => {
  if (currentStateUpdateID === currentSheetUpdateID) {
    return;
  }
  // Get new data and set currentStateUpdateID to currentSheetUpdateID
  else {
    setUpdateID(key);
    return getUpdateID(key);
  }
};

const getSheets = () => SpreadsheetApp.getActiveSpreadsheet().getSheets();

const getActiveSheetName = () =>
  SpreadsheetApp.getActiveSpreadsheet().getSheetName();

const getSheetsData = () => {
  const activeSheetName = getActiveSheetName();
  return getSheets().map((sheet, index) => {
    const sheetName = sheet.getName();
    return {
      text: sheetName,
      sheetIndex: index,
      isActive: sheetName === activeSheetName
    };
  });
};

/**
 * Gets the cells that the user can edit
 * @param {sheetName} sheetName tab to get data from
 */
const getSheetByNameData = sheetName => {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let editableValues = ss
    .getRange(1, 1, ss.getLastRow() - 1, 9)
    .getDisplayValues();

  return editableValues;
};

const getSheetByNameDataNotEditable = sheetName => {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let sheetData = ss.getRange(1, 10, ss.getLastRow() - 1, 4).getDisplayValues();
  let data = [];

  for (let i = 0; i < sheetData.length; i++) {
    data.push([sheetData[i][3]]); // get  M
  }
  console.log(data);
  return data;
};

const getSheetByNameBoxData = sheetName => {
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let sheetData = ss.getRange(2, 16, 7, 2).getDisplayValues();
  let data = [];

  for (let i = 0; i < sheetData.length; i++) {
    // Strip percentage sign off
    if (i == 1) {
      sheetData[i][1] = sheetData[i][1].toString().replace(/\%/, "");
      data.push(sheetData[i]);
    } else {
      data.push(sheetData[i]); // get col J and M
    }
  }

  console.log(sheetData);
  return sheetData;
};

const addSheet = sheetTitle => {
  SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetTitle);
  return getSheetsData();
};

const setActiveSheet = sheetName => {
  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(sheetName)
    .activate();
  return getSheetsData();
};

const addData = (data, tabName) => {
  let lock = LockService.getScriptLock();
  lock.waitLock(10000);

  const uuid = Utilities.getUuid();
  const lastrow = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(tabName)
    .getLastRow();
  const dataRow = [uuid].concat(data);

  SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName(tabName)
    .getRange(lastrow + 1, 1, 1, dataRow.length)
    .setValues([dataRow]);

  lock.releaseLock();
};

const updateDataCell = (rowIdx, updateVal, col, tabName) => {
  let lock = LockService.getUserLock();
  lock.waitLock(10000);
  if (rowIdx != 0) {
    console.log("inside updatedatacell");
    let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName);
    ss.getRange(rowIdx + 1, col + 1).setValue(updateVal);
  }
  lock.releaseLock();
};

const clearData = sheetName => {
  //let lock = LockService.getUserLock();
  //lock.waitLock(10000);
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  let numRows = ss.getLastRow() - 3;
  let C = [];
  let D = [];
  // Populate dropdowns with defaults
  for (var i = 0; i < numRows; i++) {
    C.push([1]);
    D.push(["0 - 1 HR"]);
  }
  ss.getRange("A2:B").clearContent();
  ss.getRange(2, 3, C.length, 1).setValues(C);
  ss.getRange(2, 4, D.length, 1).setValues(D);
  ss.getRange("E2:E").clearContent();
  ss.getRange("G2:G").clearContent();
  ss.getRange("I2:I").clearContent();

  ss.getRange("Q2").setValue("NO");
  ss.getRange("Q3").setValue(0.0);
  SpreadsheetApp.flush();
  //lock.releaseLock();
};

const saveAllChanges = (sheetName, state, boxValues) => {
  //let lock = LockService.getUserLock();
  //lock.waitLock(10000);
  // state is columns A-M
  // Split into columns
  let AE = [];
  let G = [];
  let I = [];
  let tempAE = [];
  let Q2 = boxValues[0][1];
  let Q3 = boxValues[1][1];

  // Start at 1 to skip headers
  for (let i = 1; i < state.length; i++) {
    tempAE = [];
    for (let j = 0; j < state[i].length; j++) {
      if (j == 0 || j == 1 || j == 2 || j == 3 || j == 4) {
        tempAE.push(state[i][j]);
        if (j == 4) {
          AE.push(tempAE);
        }
      } else if (j == 6) {
        G.push([state[i][j]]);
      } else if (j == 8) {
        I.push([state[i][j]]);
      }
    }
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  ss.getRange(2, 1, AE.length, 5).setValues(AE);
  ss.getRange(2, 7, G.length, 1).setValues(G);
  ss.getRange(2, 9, I.length, 1).setValues(I);
  ss.getRange(2, 17, 1, 1).setValue(Q2);
  ss.getRange(3, 17, 1, 1).setValue(Q3);
  //lock.releaseLock();
};

export {
  getSheetsData,
  addSheet,
  setActiveSheet,
  doGet,
  getSheetByNameData,
  getSheetByNameDataNotEditable,
  getSheetByNameBoxData,
  uuid,
  addData,
  compareUpdateID,
  setUpdateID,
  getUpdateID,
  updateDataCell,
  getUserEmail,
  saveAsPDF,
  clearData,
  saveAllChanges,
  getDriveID,
  getDriveFolders
};
