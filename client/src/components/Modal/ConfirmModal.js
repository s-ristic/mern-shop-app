import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from 'react-bootstrap';

import Btn from '../UI/Btn';

function ConfirmModal({ id, showModal, onClickModalHandler, onClickDelete }) {
  const content = (
    <Modal show={showModal} onHide={onClickModalHandler} backdrop='static' keyboard={false}>
      <Modal.Header>
        <Modal.Title>Are you sure?</Modal.Title>
      </Modal.Header>

      <Modal.Footer>
        <Btn outlinePrimary onClick={onClickModalHandler}>
          No
        </Btn>
        <Btn
          onClick={() => {
            onClickDelete(id);
            onClickModalHandler();
          }}>
          Yes
        </Btn>
      </Modal.Footer>
    </Modal>
  );

  return ReactDOM.createPortal(content, document.getElementById('confirm-modal'));
}

export default ConfirmModal;
