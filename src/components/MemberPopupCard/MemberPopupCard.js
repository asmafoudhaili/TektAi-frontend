import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const MemberPopupCard = ({ members, onClose }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Team Members</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {members.map((member, index) => (
          <div key={index}>
            <img src={member.profilePic} alt="Profile" />
            <p>{`${member.firstName} ${member.lastName}`}</p>
            <Button variant="danger">Delete</Button>
          </div>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary">Add Member</Button>
        <Button variant="secondary" onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MemberPopupCard;