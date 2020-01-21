import React from "react";
import { connect } from "react-redux";
import { submitMenu } from "../redux/actions";
import MenuList from "../components/MenuList";
import CreateMenu from "./CreateMenu"

import 'antd/dist/antd.css';
import { Card, Col, Row, Popconfirm, Button, Icon } from 'antd';

class MenuTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMenuObj: props.realtimeManager.myMenuObj,
    };
  }

  onCreateMenu = (content, isFavor) => {
    let {myMenuObj} = this.state
    if(this.props.realtimeManager.restMenuObj[content] === undefined
      && myMenuObj[content] === undefined) {
      this.setState({myMenuObj:{...myMenuObj, [content]: {content: content, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myMenuObj}
    newObj[content] = undefined
    this.setState({myMenuObj: newObj})
  }

  onLikeSelection = (content, isLike) => {// handle like or dislike selection
    let newObj = {...this.state.myMenuObj}
    newObj[content] = {...newObj[content], content:content, likes: (isLike?1:0), dislikes: (isLike?0:1)}
    this.setState({myMenuObj: newObj})
  }

  clearChangeInMenu = () => {
    this.setState({myMenuObj: this.props.realtimeManager.myMenuObj})
  }

  onSubmitMenu = () => {
    this.props.submitMenu(
      Object.values(this.state.myMenuObj).filter(ele=>!!ele).map(eachMenu=>({
      content:eachMenu.content,
      isFavor:(eachMenu.likes===1?true:false)
    })))
  }

  render() {
    let {myMenuObj} = this.state
    let {onCreateMenu, onSubmitMenu, clearChangeInMenu} = this
    let {restMenuObj} = this.props.realtimeManager
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <Card title="MENU" bordered={false}>
                  <MenuList restMenuObj={restMenuObj} myMenuObj={myMenuObj} isSummary={false}
                  onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
                </Card>
                <div className="grid-3">
                  <CreateMenu createMenu={onCreateMenu}/>
                  <Popconfirm title="Are you sure to submit changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={onSubmitMenu} okText="Submit" cancelText="Cancel">
                    <Button className="main-button" size="large" ghost>SUBMIT MENU</Button> </Popconfirm>
                  <Popconfirm title="Are you sure to clear changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={clearChangeInMenu} okText="Clear" cancelText="Cancel">
                    <Button className="main-button" size="large" ghost>CLEAR CHANGE</Button> </Popconfirm>
                </div>
              </Col>
            </Row>
        </div>
    );
  }
}
const mapStateToProps = state => {
  return { realtimeManager: state.realtimeManager };
};
export default connect(
  mapStateToProps,
  { submitMenu }
)(MenuTab);