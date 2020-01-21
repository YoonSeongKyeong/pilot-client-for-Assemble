import React from 'react'
import { connect } from "react-redux";
import { createRoom } from "../redux/actions";

import { Button, Modal, Form, Input } from 'antd';
import 'antd/dist/antd.css';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Create Room"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Room Name">
              {getFieldDecorator('Room Name', {
                rules: [{ required: true, message: 'Please input the name of room!' }],
              })(<Input placeholder="input room name"/>)}
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

class CreateRoom extends React.Component {
    state = {
      visible: false,
    };
  
    showModal = () => {
      this.setState({ visible: true });
    };
  
    handleCancel = () => {
      this.setState({ visible: false });
    };
  
    handleCreate = () => {
      let {createRoom} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        createRoom({
          roomname: values["Room Name"], 
          password: values["Password"]
        })
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
          <Button className="main-button" size="large" onClick={this.showModal} ghost>
            CREATE ROOM
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </div>
      );
    }
  }

export default connect(
  null,
  { createRoom }
)(CreateRoom);