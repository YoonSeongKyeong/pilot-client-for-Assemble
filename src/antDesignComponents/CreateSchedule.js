import React from 'react'

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
          title="Create Schedule"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="Schedule Name">
              {getFieldDecorator('Schedule Name', {
                rules: [{ required: true, message: 'Please input the name of schedule!' }],
              })(<Input placeholder="input schedule name"/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class CreateSchedule extends React.Component {
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
      let {createSchedule} = this.props
      const { form } = this.formRef.props;
      form.validateFields((err, values) => {
        if (err) {
          return;
        }
        
        createSchedule(values["Schedule Name"])
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
            CREATE SCHEDULE
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

export default CreateSchedule;