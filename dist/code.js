function getSheetsData() {
}
function addSheet() {
}
function setActiveSheet() {
}
function doGet() {
}
function getSheetByNameData() {
}
function uuid() {
}
function addData() {
}
function compareUpdateID() {
}
function setUpdateID() {
}
function getUpdateID() {
}
function updateDataCell() {
}
function getUserEmail() {
}
function saveAsPDF() {
}
function getSheetByNameDataNotEditable() {
}
function getSheetByNameBoxData() {
}
function clearData() {
}
function saveAllChanges() {
}
function getDriveID() {
}
function getDriveFolders() {
}!function(e, a) {
    for (var i in a) e[i] = a[i];
}(this, function(modules) {
    var installedModules = {};
    function __webpack_require__(moduleId) {
        if (installedModules[moduleId]) return installedModules[moduleId].exports;
        var module = installedModules[moduleId] = {
            i: moduleId,
            l: !1,
            exports: {}
        };
        return modules[moduleId].call(module.exports, module, module.exports, __webpack_require__), 
        module.l = !0, module.exports;
    }
    return __webpack_require__.m = modules, __webpack_require__.c = installedModules, 
    __webpack_require__.d = function(exports, name, getter) {
        __webpack_require__.o(exports, name) || Object.defineProperty(exports, name, {
            enumerable: !0,
            get: getter
        });
    }, __webpack_require__.r = function(exports) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(exports, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(exports, "__esModule", {
            value: !0
        });
    }, __webpack_require__.t = function(value, mode) {
        if (1 & mode && (value = __webpack_require__(value)), 8 & mode) return value;
        if (4 & mode && "object" == typeof value && value && value.__esModule) return value;
        var ns = Object.create(null);
        if (__webpack_require__.r(ns), Object.defineProperty(ns, "default", {
            enumerable: !0,
            value: value
        }), 2 & mode && "string" != typeof value) for (var key in value) __webpack_require__.d(ns, key, function(key) {
            return value[key];
        }.bind(null, key));
        return ns;
    }, __webpack_require__.n = function(module) {
        var getter = module && module.__esModule ? function() {
            return module["default"];
        } : function() {
            return module;
        };
        return __webpack_require__.d(getter, "a", getter), getter;
    }, __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property);
    }, __webpack_require__.p = "", __webpack_require__(__webpack_require__.s = 1);
}([ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "k", function() {
        return getSheetsData;
    }), __webpack_require__.d(__webpack_exports__, "b", function() {
        return addSheet;
    }), __webpack_require__.d(__webpack_exports__, "p", function() {
        return setActiveSheet;
    }), __webpack_require__.d(__webpack_exports__, "e", function() {
        return doGet;
    }), __webpack_require__.d(__webpack_exports__, "i", function() {
        return getSheetByNameData;
    }), __webpack_require__.d(__webpack_exports__, "j", function() {
        return getSheetByNameDataNotEditable;
    }), __webpack_require__.d(__webpack_exports__, "h", function() {
        return getSheetByNameBoxData;
    }), __webpack_require__.d(__webpack_exports__, "s", function() {
        return uuid;
    }), __webpack_require__.d(__webpack_exports__, "a", function() {
        return addData;
    }), __webpack_require__.d(__webpack_exports__, "d", function() {
        return compareUpdateID;
    }), __webpack_require__.d(__webpack_exports__, "q", function() {
        return setUpdateID;
    }), __webpack_require__.d(__webpack_exports__, "l", function() {
        return getUpdateID;
    }), __webpack_require__.d(__webpack_exports__, "r", function() {
        return updateDataCell;
    }), __webpack_require__.d(__webpack_exports__, "m", function() {
        return getUserEmail;
    }), __webpack_require__.d(__webpack_exports__, "o", function() {
        return saveAsPDF;
    }), __webpack_require__.d(__webpack_exports__, "c", function() {
        return clearData;
    }), __webpack_require__.d(__webpack_exports__, "n", function() {
        return saveAllChanges;
    }), __webpack_require__.d(__webpack_exports__, "g", function() {
        return getDriveID;
    }), __webpack_require__.d(__webpack_exports__, "f", function() {
        return getDriveFolders;
    });
    var doGet = function() {
        return HtmlService.createTemplateFromFile("main").evaluate().setTitle("ARDMOR INC");
    }, getUserEmail = function() {
        return Session.getEffectiveUser().getEmail();
    }, getDriveID = function() {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Settings").getRange("B1").getValue();
    }, getDriveFolders = function() {
        for (var folders = DriveApp.getFolders(), data = []; folders.hasNext(); ) {
            var folder = folders.next();
            data.push([ folder.getName(), folder.getId() ]);
        }
        return data.sort(), data.sort(function(a, b) {
            return a[0] - b[0];
        }), data;
    }, saveAsPDF = function(tabname, folderId, filename) {
        for (var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabname), finalData = [], sourceValues = ss.getRange(1, 1, ss.getLastRow(), 17).getDisplayValues(), h = 0; h < sourceValues.length; h++) {
            for (var tempData = [], i = 0; i < sourceValues[0].length; i++) 5 != i && 7 != i && 9 != i && 10 != i && 11 != i && (0 == i || 1 == i || 2 == i || 3 == i || 4 == i || 6 == i || 8 == i || 12 == i || 15 == i || 16 == i ? tempData.push(sourceValues[h][i]) : tempData.push(""));
            finalData.push(tempData);
        }
        if (finalData[0].length < 1) return -1;
        var numRows = finalData.length, numCols = finalData[0].length, thisUuid = uuid(), newSpreadsheet = SpreadsheetApp.create(thisUuid, numRows, numCols);
        SpreadsheetApp.flush();
        var newSpreadsheetId = newSpreadsheet.getId(), url = newSpreadsheet.getUrl(), tempSpreadsheet = SpreadsheetApp.openById(newSpreadsheetId);
        tempSpreadsheet.getSheetByName("Sheet1");
        tempSpreadsheet.getSheetByName("Sheet1").getRange(1, 1, numRows, numCols).setValues(finalData), 
        SpreadsheetApp.flush();
        var fullURL = url, blob = SpreadsheetApp.openByUrl(fullURL).getBlob().setName(filename + ".pdf").getAs("application/pdf"), folder = DriveApp.getFolderById(folderId), downloadURL = folder.createFile(blob).getDownloadUrl();
        return DriveApp.getFileById(newSpreadsheetId).setTrashed(!0), {
            downloadURL: downloadURL,
            folderURL: folder.getUrl()
        };
    }, uuid = function() {
        return Utilities.getUuid();
    }, setUpdateID = function(key) {
        var lock = LockService.getScriptLock();
        lock.waitLock(15e3);
        var newID = Utilities.getUuid();
        PropertiesService.getDocumentProperties().setProperty(key, newID), lock.releaseLock();
    }, getUpdateID = function(key) {
        var p = PropertiesService.getDocumentProperties().getProperty(key);
        return console.log(" P " + p), p || setUpdateID(key), p;
    }, compareUpdateID = function(key, currentStateUpdateID) {
        return currentStateUpdateID === currentSheetUpdateID ? void 0 : (setUpdateID(key), 
        getUpdateID(key));
    }, getSheetsData = function() {
        var activeSheetName = SpreadsheetApp.getActiveSpreadsheet().getSheetName();
        return SpreadsheetApp.getActiveSpreadsheet().getSheets().map(function(sheet, index) {
            var sheetName = sheet.getName();
            return {
                text: sheetName,
                sheetIndex: index,
                isActive: sheetName === activeSheetName
            };
        });
    }, getSheetByNameData = function(sheetName) {
        var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        return ss.getRange(1, 1, ss.getLastRow() - 1, 9).getDisplayValues();
    }, getSheetByNameDataNotEditable = function(sheetName) {
        for (var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName), sheetData = ss.getRange(1, 10, ss.getLastRow() - 1, 4).getDisplayValues(), data = [], i = 0; i < sheetData.length; i++) data.push([ sheetData[i][3] ]);
        return console.log(data), data;
    }, getSheetByNameBoxData = function(sheetName) {
        for (var sheetData = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).getRange(2, 16, 7, 2).getDisplayValues(), data = [], i = 0; i < sheetData.length; i++) 1 == i ? (sheetData[i][1] = sheetData[i][1].toString().replace(/\%/, ""), 
        data.push(sheetData[i])) : data.push(sheetData[i]);
        return console.log(sheetData), sheetData;
    }, addSheet = function(sheetTitle) {
        return SpreadsheetApp.getActiveSpreadsheet().insertSheet(sheetTitle), getSheetsData();
    }, setActiveSheet = function(sheetName) {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName).activate(), 
        getSheetsData();
    }, addData = function(data, tabName) {
        var lock = LockService.getScriptLock();
        lock.waitLock(1e4);
        var uuid = Utilities.getUuid(), lastrow = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName).getLastRow(), dataRow = [ uuid ].concat(data);
        SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName).getRange(lastrow + 1, 1, 1, dataRow.length).setValues([ dataRow ]), 
        lock.releaseLock();
    }, updateDataCell = function(rowIdx, updateVal, col, tabName) {
        var lock = LockService.getUserLock();
        (lock.waitLock(1e4), 0 != rowIdx) && (console.log("inside updatedatacell"), SpreadsheetApp.getActiveSpreadsheet().getSheetByName(tabName).getRange(rowIdx + 1, col + 1).setValue(updateVal));
        lock.releaseLock();
    }, clearData = function(sheetName) {
        for (var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName), numRows = ss.getLastRow() - 3, C = [], D = [], i = 0; i < numRows; i++) C.push([ 1 ]), 
        D.push([ "0 - 1 HR" ]);
        ss.getRange("A2:B").clearContent(), ss.getRange(2, 3, C.length, 1).setValues(C), 
        ss.getRange(2, 4, D.length, 1).setValues(D), ss.getRange("E2:E").clearContent(), 
        ss.getRange("G2:G").clearContent(), ss.getRange("I2:I").clearContent(), ss.getRange("Q2").setValue("NO"), 
        ss.getRange("Q3").setValue(0), SpreadsheetApp.flush();
    }, saveAllChanges = function(sheetName, state, boxValues) {
        for (var AE = [], G = [], I = [], tempAE = [], Q2 = boxValues[0][1], Q3 = boxValues[1][1], i = 1; i < state.length; i++) {
            tempAE = [];
            for (var j = 0; j < state[i].length; j++) 0 == j || 1 == j || 2 == j || 3 == j || 4 == j ? (tempAE.push(state[i][j]), 
            4 == j && AE.push(tempAE)) : 6 == j ? G.push([ state[i][j] ]) : 8 == j && I.push([ state[i][j] ]);
        }
        var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
        ss.getRange(2, 1, AE.length, 5).setValues(AE), ss.getRange(2, 7, G.length, 1).setValues(G), 
        ss.getRange(2, 9, I.length, 1).setValues(I), ss.getRange(2, 17, 1, 1).setValue(Q2), 
        ss.getRange(3, 17, 1, 1).setValue(Q3);
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__), function(global) {
        var _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
        global.getSheetsData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["k"], global.addSheet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["b"], 
        global.setActiveSheet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["p"], 
        global.doGet = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["e"], global.getSheetByNameData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["i"], 
        global.uuid = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["s"], global.addData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["a"], 
        global.compareUpdateID = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["d"], 
        global.setUpdateID = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["q"], global.getUpdateID = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["l"], 
        global.updateDataCell = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["r"], 
        global.getUserEmail = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["m"], global.saveAsPDF = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["o"], 
        global.getSheetByNameDataNotEditable = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["j"], 
        global.getSheetByNameBoxData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["h"], 
        global.clearData = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["c"], global.saveAllChanges = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["n"], 
        global.getDriveID = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["g"], global.getDriveFolders = _sheets_utilities_js__WEBPACK_IMPORTED_MODULE_0__["f"];
    }.call(this, __webpack_require__(2));
}, function(module, exports) {
    var g;
    g = function() {
        return this;
    }();
    try {
        g = g || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (g = window);
    }
    module.exports = g;
} ]));