import React from 'react';
import 'antd/dist/antd.css';
import {connect} from "react-redux"
import { Form, Icon, Input, Button } from 'antd';
import { postChat } from '../redux/actions';

class NormalChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const{content} = values;
        this.props.postChat({content: content});
        this.props.form.resetFields();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="chat-form">
        <Form.Item>
          {getFieldDecorator('content', {
            rules: [{ required: true, message: '채팅을 치세요' }],
          })(
            <Input
              prefix={
                <Icon type="dribbble" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="채팅"
            />,
          )}
          <Button type="primary" htmlType="submit" className="chat-form-button">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const newChat = Form.create({ name: 'normal_chat' })(NormalChatForm);

const mapStateToProps = state => {
    return { realtimeManager: state.realtimeManager };
  };
  export default connect(
    mapStateToProps,
    { postChat }
  )(newChat);