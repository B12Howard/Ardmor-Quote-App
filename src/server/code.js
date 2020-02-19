import * as publicFunctions from "./sheets-utilities.js";

// Expose public functions
global.getSheetsData = publicFunctions.getSheetsData;
global.addSheet = publicFunctions.addSheet;
global.setActiveSheet = publicFunctions.setActiveSheet;
global.doGet = publicFunctions.doGet;
global.getSheetByNameData = publicFunctions.getSheetByNameData;
global.uuid = publicFunctions.uuid;
global.addData = publicFunctions.addData;
global.compareUpdateID = publicFunctions.compareUpdateID;
global.setUpdateID = publicFunctions.setUpdateID;
global.getUpdateID = publicFunctions.getUpdateID;
global.updateDataCell = publicFunctions.updateDataCell;
global.getUserEmail = publicFunctions.getUserEmail;
global.saveAsPDF = publicFunctions.saveAsPDF;
global.getSheetByNameDataNotEditable =
  publicFunctions.getSheetByNameDataNotEditable;
global.getSheetByNameBoxData = publicFunctions.getSheetByNameBoxData;
global.clearData = publicFunctions.clearData;
global.saveAllChanges = publicFunctions.saveAllChanges;
global.getDriveID = publicFunctions.getDriveID;
global.getDriveFolders = publicFunctions.getDriveFolders;
