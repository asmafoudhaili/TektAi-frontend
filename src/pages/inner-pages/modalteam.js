import { Modal, Button, Form, Input, Typography } from 'antd';
import { useState } from 'react';

const { Title } = Typography;

const CreateTeamDialog = ({ visible, onCreate, onCancel }) => {
    const [teamname, setTeamname] = useState('');

    const handleCreateTeam = () => {
        if (!teamname) {
            console.error('Please enter the team name');
            return;
        }

        onCreate({ teamname });
        setTeamname('');
    };

    const handleCancel = () => {
        onCancel();
        setTeamname('');
    };

    return (
        <Modal
            visible={visible}
            title={<Title level={4} style={{ textAlign: 'center' }}>Create a team</Title>}
            okText="Create"
            cancelText="Cancel"
            onOk={handleCreateTeam}
            onCancel={handleCancel}
            style={{
                borderRadius: '10px',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            }}
            width={600} // Modal width adjustment
        >
            <Form layout="vertical">
                <Form.Item label="Team name">
                    <Input value={teamname} onChange={(e) => setTeamname(e.target.value)} />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CreateTeamDialog;
