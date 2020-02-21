import React, { useEffect, useState } from "react";
import "../styles.css";
import Modal from "react-bootstrap/Modal";

const PDF = props => {
  const {
    status,
    message,
    folders,
    folderURL,
    resetClick,
    downloadURL
  } = props;

  const handleClose = () => {
    setSelectedFolder({ name: "", id: "" });
    setFileNameState("");
    setError({});
    props.pdfModalCallback();
  };

  const [selectedFolder, setSelectedFolder] = useState({ name: "", id: "" });
  const [filenameState, setFileNameState] = useState("");
  const [error, setError] = useState({});
  const [clickable, setClickable] = useState(resetClick);

  useEffect(() => {
    if (message == "PDF Created" || message == "Error PDF Not Created") {
      setClickable(true);
      console.log("reset click");
    }
  }, [message]);

  const handleChange = e => {
    console.log("selected folder");
    setSelectedFolder({ name: e.target.key, id: e.target.value });
  };

  const handleFilename = e => {
    console.log("folder name");
    setFileNameState(e.target.value);
  };

  const onSubmit = () => {
    if (filenameState.trim() != "") {
      if (selectedFolder.id) {
        console.log("submitting");
        setError({ folderError: "", filenameError: "" });
        props.pdfSaveCallback(selectedFolder.id, filenameState);
      } else {
        console.log("Folder Name Cannot Be Blank");
        setError({ folderError: "Folder Name Cannot Be Blank" });
      }
    } else {
      console.log("File Name Cannot Be Blank");
      setError({ filenameError: "File Name Cannot Be Blank" });
    }
  };

  return (
    <Modal show={status} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{message}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <select
          className="w-100"
          value={selectedFolder.name}
          onChange={handleChange}
          placeHolder={"Select a File"}
        >
          <option value="" selected disabled hidden>
            Choose a folder from your Google Drive
          </option>
          {folders.length
            ? folders.map((item, idx) => {
                return (
                  <option key={item[0]} value={item[1]}>
                    {item[0]}
                  </option>
                );
              })
            : "Loading Folders..."}
        </select>

        {error.folderError && (
          <span className="text-danger">{error.folderError}</span>
        )}

        <div className="mt-3">
          <input
            className="form-control"
            type="text"
            id="filename"
            name="filename"
            placeHolder="Enter a filename"
            onChange={e => handleFilename(e)}
            value={filenameState}
          />
          {error.filenameError && (
            <span className="text-danger">{error.filenameError}</span>
          )}
        </div>
        <div>
          <div>
            {folderURL && (
              <a target="_blank" href={folderURL}>
                Go to your Drive folder
              </a>
            )}
          </div>
          <div>
            {downloadURL && (
              <a target="_blank" href={downloadURL}>
                Download PDF
              </a>
            )}
          </div>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={e => handleClose()}>
          Close
        </button>
        <button
          className="btn btn-primary"
          onClick={e => {
            if (!clickable) {
              return;
            } else {
              setClickable(false);
              onSubmit();
            }
          }}
        >
          Save
        </button>
      </Modal.Footer>
    </Modal>
  );
};

// Layout.propTypes = {
//  children: PropTypes.node.isRequired
// };

export default PDF;
