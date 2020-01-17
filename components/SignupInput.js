import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './SignupInput.css';
import { Form, Icon, Input, Button } from 'antd';

class NormalSignupForm extends React.Component {
    constructor(props){
      super(props)    
    }  
  
  
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.props.handleSignup} className="signup-form">
       
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
              value={this.props.usernameValue}
              onChange={this.props.onUsernameChange}
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
              value={this.props.passwordValue}
              onChange={this.props.onPasswordChange}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="signup-form-button"
          >
            Create Room
          </Button>
          Or <a href="http://localhost:3000/login">Enter Room!</a>
        </Form.Item>
      </Form>
    );
  }
  }
  
export default Form.create({ name: 'normal_login' })(NormalSignupForm);
