import React from 'react'

import { Button, Modal, Form, Input, Switch, Icon } from 'antd';
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
          title="Create Menu"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Menu Name">
              {getFieldDecorator('Menu Name', {
                rules: [{ required: true, message: 'Please input the name of menu!' }],
              })(<Input placeholder="input menu name"/>)}
            </Form.Item>

            <Form.Item label="Like">
                {getFieldDecorator('Like', { 
                    initialValue: true, valuePropName: 'checked' })(
                    <Switch 
                        checkedChildren={<Icon type="like" />} 
                    unCheckedChildren={<Icon type="dislike" />} />)}
            </Form.Item>

          </Form>
        </Modal>
      );
    }
  },
);

class CreateMenu extends React.Component {
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
      let {createMenu} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        
        createMenu(values["Menu Name"], values["Like"])
        form.resetFields();
        this.setState({ visible: false });
      });
    };
  
    saveFormRef = formRef => {
      this.formRef = formRef;
    };
  
    render() {
      return (
        <span>
          <Button className="main-button" size="large" onClick={this.showModal} ghost>
            CREATE MENU
          </Button>
          <CollectionCreateForm
            wrappedComponentRef={this.saveFormRef}
            visible={this.state.visible}
            onCancel={this.handleCancel}
            onCreate={this.handleCreate}
          />
        </span>
      );
    }
  }

export default CreateMenu;