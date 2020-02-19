import React, { useEffect, useState } from "react";
import "../styles.css";
import Modal from "react-bootstrap/Modal";

const Delete = props => {
  const { value } = props;
  const handleClose = val => props.modalCallback(val);

  return (
    <Modal show={value} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Do you want to delete data?</Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={e => handleClose(false)}>
          Close
        </button>
        <button className="btn btn-primary" onClick={e => handleClose(true)}>
          Delete
        </button>
      </Modal.Footer>
    </Modal>
  );
};

// Layout.propTypes = {
//  children: PropTypes.node.isRequired
// };

export default Delete;
