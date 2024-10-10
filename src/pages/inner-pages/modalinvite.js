import { Modal, Button, Form, Input, Space, Row, Col, Typography } from 'antd';
import { useState } from 'react';
import { PlusOutlined, DeleteOutlined, MailOutlined } from '@ant-design/icons';

const { Title } = Typography;

const InviteMembersDialog = ({ visible, onCancel, onSendInvitation }) => {
  const [email, setEmail] = useState('');
  const [emailList, setEmailList] = useState([]);

  const handleAddEmail = () => {
    if (!email) {
      console.error("Please enter the email");
      return;
    }

    setEmailList([...emailList, email]);
    setEmail('');
  };

  const handleRemoveEmail = (indexToRemove) => {
    const updatedEmailList = emailList.filter((_, index) => index !== indexToRemove);
    setEmailList(updatedEmailList);
  };

  const handleSendInvitations = () => {
    if (emailList.length === 0) {
      console.error('Please enter at least one email');
      return;
    }

    onSendInvitation(emailList);
  };

  return (
    <Modal
      visible={visible}
      okText="Send Invitations"
      cancelText="Cancel"
      onOk={handleSendInvitations}
      onCancel={onCancel}
      style={{
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
      }}
      width={600} // Ajustement de la taille du modal
    >
      <Row justify="center" style={{ marginBottom: '20px' }}>
        <Col>
          <Title level={4}>Invite members to your team</Title>
        </Col>
      </Row>

      <Form layout="vertical" style={{ marginBottom: '20px' }}>
        <Form.Item label="Enter email">
          <Input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ borderRadius: '5px', padding: '10px' }}
            prefix={<MailOutlined />}
          />
        </Form.Item>
        <Row justify="center" style={{ marginBottom: '20px' }}>
          <Col>
            <Button type="primary" onClick={handleAddEmail} icon={<PlusOutlined />} style={{ marginRight: '10px' }}>
              Add email
            </Button>
          </Col>
        </Row>
      </Form>

      <ul style={{ listStyle: 'none', padding: '0', margin: '20px 0' }}>
        {emailList.map((email, index) => (
          <li key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', border: '1px solid lightgray', borderRadius: '5px', marginBottom: '10px' }}>
            <span>{email}</span>
            <Button type="text" onClick={() => handleRemoveEmail(index)} icon={<DeleteOutlined />} />
          </li>
        ))}
      </ul>
    </Modal>
  );
};

export default InviteMembersDialog;
