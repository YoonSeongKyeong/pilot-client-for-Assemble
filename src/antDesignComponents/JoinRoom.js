import React from 'react'
import { connect } from "react-redux";
import { joinRoom } from "../redux/actions";

import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onJoin, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Join Room"
          okText="Join"
          onCancel={onCancel}
          onOk={onJoin}
        >
          <Form layout="vertical">
            <Form.Item label="Room ID">
              {getFieldDecorator('Room ID', {
                rules: [{ required: true, message: 'Please input the ID of room!' }],
              })(<Input placeholder="input room ID"/>)}
            </Form.Item>
            <Form.Item label="Password">
              {getFieldDecorator('Password', {
                rules: [{ required: true, message: 'Please input the password of room!' }],
              })(<Input.Password allowClear placeholder="input password" />)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class JoinRoom extends React.Component {
    state = {
      visible: false,
    };
  
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };
  
    handleJoin = () => {
      let {joinRoom, history} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        joinRoom({
          roomId: values["Room ID"], 
          password: values["Password"]
        }, history)
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
  
    render() {
      return (
        <div>
          <Button className="main-button" onClick={this.showModal} size="large" ghost>
            JOIN ROOM
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onJoin={this.handleJoin}
          />
        </div>
      );
    }
  }

export default connect(
  null,
  { joinRoom }
)(JoinRoom);