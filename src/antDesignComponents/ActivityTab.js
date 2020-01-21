import React from "react";
import { connect } from "react-redux";
import { submitActivity } from "../redux/actions";
import ActivityList from "../components/ActivityList";
import CreateActivity from "./CreateActivity"

import 'antd/dist/antd.css';
import { Card, Col, Row, Popconfirm, Button, Icon } from 'antd';

class ActivityTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myActivityObj: props.realtimeManager.myActivityObj,
    };
  }

  onCreateActivity = (content, isFavor) => {
    let {myActivityObj} = this.state
    if(this.props.realtimeManager.restActivityObj[content] === undefined
      && myActivityObj[content] === undefined) {
      this.setState({myActivityObj:{...myActivityObj, [content]: {content: content, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myActivityObj}
    newObj[content] = undefined
    this.setState({myActivityObj: newObj})
  }

  onLikeSelection = (content, isLike) => {// handle like or dislike selection
    let newObj = {...this.state.myActivityObj}
    newObj[content] = {...newObj[content], content:content, likes: (isLike?1:0), dislikes: (isLike?0:1)}
    this.setState({myActivityObj: newObj})
  }

  clearChangeInActivity = () => {
    this.setState({myActivityObj: this.props.realtimeManager.myActivityObj})
  }

  onSubmitActivity = () => {
    this.props.submitActivity(
      Object.values(this.state.myActivityObj).filter(ele=>!!ele).map(eachActivity=>({
      content:eachActivity.content,
      isFavor:(eachActivity.likes===1?true:false)
    })))
  }

  render() {
    let {myActivityObj} = this.state
    let {onCreateActivity, onSubmitActivity, clearChangeInActivity} = this
    let {restActivityObj} = this.props.realtimeManager
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <Card title="ACTIVITY" bordered={false}>
                  <ActivityList restActivityObj={restActivityObj} myActivityObj={myActivityObj} isSummary={false}
                  onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
                </Card>
                <div className="grid-3">
                  <CreateActivity createActivity={onCreateActivity}/>
                  <Popconfirm title="Are you sure to submit changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={onSubmitActivity} okText="Submit" cancelText="Cancel">
                    <Button className="main-button" size="large" ghost>SUBMIT ACTIVITY</Button> </Popconfirm>
                  <Popconfirm title="Are you sure to clear changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={clearChangeInActivity} okText="Clear" cancelText="Cancel">
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
  { submitActivity }
)(ActivityTab);