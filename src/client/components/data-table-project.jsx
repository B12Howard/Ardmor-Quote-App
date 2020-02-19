import React, { useEffect, useState, useRef } from "react";
import "../styles.css";
import server from "../server";
import DataHead from "./data-head";
import Table from "react-bootstrap/Table";
import useDebounce from "../js/debounce";
import Delete from "./delete-modal";
import PDF from "./pdf-modal";

const ProjectTable = () => {
  const {
    updateDataCell,
    saveAllChanges,
    clearData,
    getSheetByNameData,
    getSheetByNameBoxData,
    getSheetByNameDataNotEditable,
    getUserEmail,
    saveAsPDF,
    getDriveFolders
  } = server;

  const [tableValues, setTableValues] = useState([]);
  const [tabNameState, setTabNameState] = useState();
  const [remeasureVal, setRemeasureVal] = useState("");
  const [dValueState, setDValueState] = useState("");
  const [allFolders, setFoldersState] = useState([]);
  const [clickable, setClickable] = useState(true);
  const [saving, setSaving] = useState("✅");
  const [uneditableValsState, setUneditableValsState] = useState([]);
  let idxRef = useRef(null);
  let indexRef = useRef(null);
  let errorValue = "";
  const [inputVal, setInputVal] = useState(null);
  const [inputVal2, setInputVal2] = useState(null);
  const [boxValues, setBoxValues] = useState([]);
  const [showPdfAlert, setShowPdfAlert] = useState({
    status: false,
    message: ""
  });
  const [show, setShow] = useState(false);
  const debouncedInputTerm = useDebounce(inputVal, 1000);
  const [folderURL, setFolderURL] = useState("");

  useEffect(() => {
    let user = "";
    getUserEmail()
      .then(res => {
        user = res;
        setTabNameState(user);

        getSheetByNameData(user)
          .then(x => {
            console.log("set sheet data");
            setTableValues(x);
          })
          .catch(error => {
            errorValue = "Error loading data. Refresh to try again";
            "getApiData error " + error;
          });

        getSheetByNameDataNotEditable(user)
          .then(y => {
            setUneditableValsState(y);
          })
          .catch(error =>
            console.error("getSheetByNameDataNotEditable " + error)
          );

        getSheetByNameBoxData(user)
          .then(z => {
            console.log("getting box data");
            setBoxValues(z);
            setDValueState(z[1][1] * 100);
          })
          .catch(error => console.error("getSheetByNameBoxData " + error));
      })
      .catch(error => console.error("tabPromise " + error));
  }, []);

  // Effect for user changes to values
  useEffect(() => {
    if (tableValues.length) {
      // if (idxRef !== null && indexRef !== null && inputVal !== null) {
      setSaving("☑️");
      saveAllChanges(tabNameState, tableValues, boxValues)
        .then(x => {
          idxRef.current = "";
          indexRef.current = "";

          let handler = setTimeout(() => {
            getSheetByNameBoxData(tabNameState)
              .then(x => {
                setBoxValues(x);
                setRemeasureVal(x[0][1]);
                setDValueState(x[1][1] * 100);
                getSheetByNameDataNotEditable(tabNameState)
                  .then(z => {
                    setUneditableValsState(z);
                    console.log(" debouncedInputTerm ✅");
                    setSaving("✅");
                  })
                  .catch(error =>
                    console.error("getSheetByNameDataNotEditable " + error)
                  );
              })
              .catch(error =>
                console.error(
                  "getSheetByNameBoxData debouncedInputTerm " + error
                )
              );
          }, 3000);
        })
        .catch(error => console.error(error));
      // }
    }
  }, [debouncedInputTerm]);

  // Effect for user changes to values of reameasure and D%
  useEffect(() => {
    if (tableValues.length) {
      if (idxRef !== null && indexRef !== null && inputVal2 !== null) {
        setSaving("☑️");
        let value;
        // check if inputVal2 is number
        if (!isNaN(inputVal2)) {
          value = inputVal2 / 100;
        } else value = inputVal2;

        updateDataCell(idxRef.current, value, indexRef.current, tabNameState)
          .then(x => {
            idxRef.current = "";
            indexRef.current = "";
          })
          .catch(error => console.error(error));
      }

      // Delay to allow spreadsheet to change values before fetching
      let handler = setTimeout(() => {
        getSheetByNameBoxData(tabNameState)
          .then(y => {
            setBoxValues(y);
            setRemeasureVal(y[0][1]);
            setDValueState(y[1][1] * 100);

            getSheetByNameDataNotEditable(tabNameState)
              .then(z => {
                setUneditableValsState(z);
                console.log("✅");
                setSaving("✅");
              })
              .catch(error =>
                console.error("getSheetByNameDataNotEditable " + error)
              );
          })
          .catch(error =>
            console.error("getSheetByNameBoxData inputVal2 " + error)
          );
      }, 3000);
    }
  }, [inputVal2]);

  const saveValues = () => {
    setSaving("☑️");
    // Send the whole state to a server function that will loop through A-J and set the values of non-hidden columns
    saveAllChanges(tabNameState, tableValues, boxValues)
      .then(x => {
        getSheetByNameDataNotEditable(tabNameState)
          .then(z => {
            setUneditableValsState(z);

            getSheetByNameBoxData(tabNameState)
              .then(y => {
                console.log("✅");
                setRemeasureVal(y[0][1]);
                setDValueState(y[1][1] * 100);
                setBoxValues(y);
                setSaving("✅");
              })
              .catch(error => console.log("getSheetByNameBoxData " + error));
          })
          .catch(error =>
            console.error("getSheetByNameDataNotEditable " + error)
          );
      })
      .catch(error => console.error(error));

    console.log("udpate totals");
  };

  const onCellChange = (row, col, e) => {
    let val = e;
    let currentVals = [...tableValues];
    try {
      currentVals[row][col] = val;
      setTableValues(currentVals);
    } catch (e) {
      console.log(e);
    }
  };

  // Close of deletedata modal
  const handleShow = () => setShow(true);

  // Delete all values on spreadsheet, update states to show user
  const handleShowClose = val => {
    if (val === true) {
      // Delete values
      clearData(tabNameState)
        .then(() => {
          // Delay to allow spreadsheet to change values before fetching
          let handler = setTimeout(() => {
            getSheetByNameData(tabNameState)
              .then(y => {
                console.log("set sheet data");
                setTableValues(y);
              })
              .catch(error => {
                errorValue = "Error loading data. Refresh to try again";
                "getApiData error " + error;
              });

            getSheetByNameBoxData(tabNameState)
              .then(z => {
                setBoxValues(z);
                setRemeasureVal(z[0][1]);
                setDValueState(z[1][1] * 100);
                getSheetByNameDataNotEditable(tabNameState)
                  .then(x => {
                    setUneditableValsState(x);
                    console.log("✅");
                    setSaving("✅");
                  })
                  .catch(error =>
                    console.error("getSheetByNameDataNotEditable " + error)
                  );
              })
              .catch(error =>
                console.error("getSheetByNameBoxData handleShowClose " + error)
              );
          }, 3000);
        })
        .catch(error => console.error(error));
      console.log("Deleted values");
    }
    setShow(false);
  };

  // Handle show close of pdf
  const handleShowClosePdf = () => {
    setShowPdfAlert({ status: false, message: "" });
    setFolderURL("");
  };

  const savePdf = (id, filename) => {
    saveAsPDF(tabNameState, id, filename)
      .then(x => {
        setFolderURL(x);
        console.log("Saved PDF with url " + x);
        setShowPdfAlert({ status: true, message: "PDF Created" });
        setClickable(true);
      })
      .catch(error => {
        console.error(error);
        setShowPdfAlert({ status: true, message: "Error PDF Not Created" });
      });
  };

  return (
    <div>
      <PDF
        status={showPdfAlert.status}
        message={showPdfAlert.message}
        folders={allFolders}
        folderURL={folderURL}
        resetClick={clickable}
        pdfSaveCallback={(id, filename) => {
          setClickable(false);
          setFolderURL("");
          setShowPdfAlert({ status: true, message: "Saving..." });
          savePdf(id, filename);
        }}
        pdfModalCallback={() => handleShowClosePdf()}
      />
      <Delete value={show} modalCallback={val => handleShowClose(val)} />
      {errorValue}
      <div className="mt-2 mb-2 d-inline-flex align-items-center ">
        <button
          className="btn btn-success mr-3 mt-2 mb-2"
          onClick={e => {
            if (!allFolders.length) {
              setShowPdfAlert({ status: true, message: "Loading Folders..." });
            }
            getDriveFolders()
              .then(folders => {
                setFoldersState(folders);

                setShowPdfAlert({
                  status: true,
                  message: "Select a folder and enter a file name"
                });
                console.log("finishd getting folders");
              })
              .catch(error => console.error("getDriveFolders() " + error));
          }}
        >
          {" "}
          Make PDF!
        </button>

        <button
          className="btn btn-success mr-3"
          onClick={e => {
            saveValues();
          }}
        >
          Save Changes
        </button>
        <button
          className="btn btn-danger mr-4"
          onClick={e => {
            handleShow();
          }}
        >
          Clear Data
        </button>
        <div className=" mr-5">{saving}</div>
        {boxValues.length
          ? boxValues.map((item, idx) => {
              if (idx == 0) {
                // This is the Remeasure box
                return (
                  <div className="mr-4">
                    <div className="mr-1">{item[0]}</div>
                    {"  "}
                    <select
                      className=""
                      value={remeasureVal}
                      onChange={e => {
                        idxRef.current = 1;
                        indexRef.current = 16;
                        setRemeasureVal(e.target.value);
                        setInputVal2(e.target.value);
                      }}
                    >
                      <option>YES</option>
                      <option>NO</option>
                    </select>
                  </div>
                );
              } else if (idx == 1) {
                // This is the D% box
                return (
                  <div className="mr-5">
                    <div className=" mr-2">{item[0]} %</div>
                    <div className="percent-input-box">
                      <input
                        className="d-input-box"
                        value={dValueState}
                        onChange={e => {
                          idxRef.current = 2;
                          indexRef.current = 16;
                          setDValueState(e.target.value);
                          setInputVal2(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className=" mr-4">
                    <div className=" mr-2">{item[0]}</div>
                    <div className="">{item[1]}</div>
                  </div>
                );
              }
            })
          : "Loading Totals..."}
      </div>
      <div className="table-container">
        <div className="d-inline-flex">
          <div className="">
            <Table className="table" striped hover size="sm">
              <thead className="table-success">
                {tableValues.length
                  ? tableValues.map((item, idx) => {
                      if (idx === 0) return <DataHead data={item} />;
                    })
                  : ""}
              </thead>
              <tbody>
                {tableValues.length
                  ? tableValues.map((item, idx) => {
                      if (idx !== 0) {
                        // Skip headers
                        return (
                          <tr>
                            {item.map((d, i) => {
                              if (i == 2) {
                                // This is the People selector
                                return (
                                  <td className="text-wrap small ">
                                    <select
                                      className="w-100"
                                      value={tableValues[idx][i]}
                                      onChange={e => {
                                        idxRef.current = idx;
                                        indexRef.current = i;
                                        onCellChange(
                                          idxRef.current,
                                          indexRef.current,
                                          e.target.value
                                        );
                                        setInputVal(e.target.value);
                                      }}
                                    >
                                      <option>1</option>
                                      <option>2</option>
                                      <option>3</option>
                                      <option>4</option>
                                      <option>5</option>
                                      <option>6</option>
                                    </select>
                                  </td>
                                );
                              } else if (i == 3) {
                                // This is the Time selector
                                return (
                                  <td className="text-wrap small ">
                                    <select
                                      value={tableValues[idx][i]}
                                      onChange={e => {
                                        idxRef.current = idx;
                                        indexRef.current = i;
                                        onCellChange(
                                          idxRef.current,
                                          indexRef.current,
                                          e.target.value
                                        );
                                        setInputVal(e.target.value);
                                      }}
                                    >
                                      <option>0 - 1 HR</option>
                                      <option>1 HR - 2 HR</option>
                                      <option>2 HR - 3 HR</option>
                                      <option>3 HR - 8 HR</option>
                                      <option>8 HOURS +</option>
                                    </select>
                                  </td>
                                );
                              } else if (
                                i != 5 &&
                                i != 7 &&
                                i != 10 &&
                                i != 11
                              ) {
                                if (i == 1) {
                                  // This is the Description
                                  return (
                                    <td className="text-wrap small d-input-box">
                                      <input
                                        className="d-input-box-lg"
                                        value={tableValues[idx][i]}
                                        onChange={e => {
                                          idxRef.current = idx;
                                          indexRef.current = i;
                                          onCellChange(
                                            idxRef.current,
                                            indexRef.current,
                                            e.target.value
                                          );
                                          setInputVal(e.target.value);
                                        }}
                                      />
                                    </td>
                                  );
                                } else if (i == 0) {
                                  // This is the Q-T column
                                  return (
                                    <td className="text-wrap small">
                                      <input
                                        className="percent-input-box"
                                        value={tableValues[idx][i]}
                                        onChange={e => {
                                          idxRef.current = idx;
                                          indexRef.current = i;
                                          onCellChange(
                                            idxRef.current,
                                            indexRef.current,
                                            e.target.value
                                          );
                                          setInputVal(e.target.value);
                                        }}
                                      />
                                    </td>
                                  );
                                } else {
                                  return (
                                    <td className="text-wrap small">
                                      <input
                                        className="d-input-box-md"
                                        value={tableValues[idx][i]}
                                        onChange={e => {
                                          idxRef.current = idx;
                                          indexRef.current = i;
                                          onCellChange(
                                            idxRef.current,
                                            indexRef.current,
                                            e.target.value
                                          );
                                          setInputVal(e.target.value);
                                        }}
                                      />
                                      <div className="d-inline-block table-add-col-space"></div>
                                    </td>
                                  );
                                }
                              } else return;
                            })}
                          </tr>
                        );
                      }
                    })
                  : "Loading..."}
              </tbody>
            </Table>
          </div>
          <div className="">
            <Table className="table " striped hover size="sm">
              <thead className="table-success">
                {// This table is to show non-editable values. State updates when values are entered into editable cells
                uneditableValsState.length
                  ? uneditableValsState.map((item, idx) => {
                      if (idx === 0) return <DataHead data={item} />;
                    })
                  : ""}
              </thead>
              <tbody>
                {uneditableValsState.length
                  ? uneditableValsState.map((item, idx) => {
                      if (idx !== 0) {
                        return (
                          <tr>
                            {item.map((d, i) => {
                              return (
                                <td className="text-wrap small">
                                  <input value={d} disabled />
                                </td>
                              );
                            })}
                          </tr>
                        );
                      }
                    })
                  : ""}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTable;
