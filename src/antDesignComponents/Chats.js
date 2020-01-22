import React from 'react';
import { connect } from 'react-redux';
import 'antd/dist/antd.css';
import './Chats.css'
import { Icon } from 'antd';
import ChatList from '../components/ChatList';
import SubmitChat from '../antDesignComponents/SubmitChat';

class Chats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    let { chats, myself } = this.props.realtimeManager;
    let { name } = myself;

    return (
      <div>
        <div style={{ textAlign: 'center', color: 'black', margin: '20px 30px 25px 30px', 'backgroundColor': 'white'}} fontSize='3rem'><Icon size="" type="message"/> CHATTING</div>
        <div style={{ padding: '0 30px 30px 30px '}}>
          <ChatList chats={chats} name={name}/>
          <SubmitChat />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { realtimeManager: state.realtimeManager };
};
export default connect(mapStateToProps)(Chats);