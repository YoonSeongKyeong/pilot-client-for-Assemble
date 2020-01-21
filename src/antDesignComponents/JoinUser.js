import React from 'react'
import { connect } from "react-redux";
import { joinUser } from "../redux/actions";

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
          title="Join User"
          okText="Join"
          onCancel={onCancel}
          onOk={onJoin}
        >
          <Form layout="vertical">
            <Form.Item label="User Name">
              {getFieldDecorator('User Name', {
                rules: [{ required: true, message: 'Please input the name of user!' }],
              })(<Input placeholder="input user name"/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class JoinUser extends React.Component {
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
      let {joinUser, history} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
  
        joinUser({
          username: values["User Name"]
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
            JOIN USER
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
  { joinUser }
)(JoinUser);