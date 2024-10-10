import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import  NioButton from '../NioButton/NioButton';
import Confetti from 'react-confetti';
// import './Popup.css';
function Example() {
  const [show, setShow] = useState(true);
  const [modalClosed, setModalClosed] = useState(false);

  const handleClose = () => {
    setShow(false);
    setModalClosed(true);
    handleSpeak();
  };

  const handleSpeak = () => {
    const message = new SpeechSynthesisUtterance('Welcome to you dashboard !'); // Customize the welcome message here
    window.speechSynthesis.speak(message);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
   <div className='popup'>
        <Modal.Body className="grid-example">
        <div class="container">
  <div class="row justify-content-md-center">
    <div class="col col-lg-2">
    </div>
    <div class="col-md-auto">
    <h3>ARE U READY</h3> 
       </div>
    <div class="col col-lg-2">
    </div>
  </div>
  <div class="row justify-content-md-center">
    <NioButton label="YES" className="btn btn-indigo text-nowrap" onClick={handleClose}/> 

</div>
        </div>
      </Modal.Body></div>
      </Modal>

      {modalClosed && (
        <Confetti width={2000} height={3000} recycle={false} />
      )}
    </>
  );
}

export default Example;