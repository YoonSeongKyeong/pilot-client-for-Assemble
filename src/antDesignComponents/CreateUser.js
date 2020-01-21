import React from 'react'
import { connect } from "react-redux";
import { createUser } from "../redux/actions";

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
          title="Create User"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="User Name">
              {getFieldDecorator('User Name', {
                rules: [{ required: true, message: 'Please input the name of user!' }],
              })(<Input placeholder="input room name"/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CreateUser extends React.Component {
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
      let {createUser} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        createUser({
          username: values["User Name"], 
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
            CREATE USER
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
  { createUser }
)(CreateUser);