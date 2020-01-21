import React from "react";
import { connect } from "react-redux";
import { submitSchedule } from "../redux/actions";
import ScheduleList from "../components/ScheduleList";
import CreateSchedule from "./CreateSchedule"

import 'antd/dist/antd.css';
import { Card, Col, Row, Popconfirm, Button, Icon } from 'antd';

class ScheduleTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myScheduleObj: props.realtimeManager.myScheduleObj,
    };
  }

  onCreateSchedule = (content) => {
    let {myScheduleObj} = this.state
    if(this.props.realtimeManager.restScheduleObj[content] === undefined
      && myScheduleObj[content] === undefined) {
      this.setState({myScheduleObj:{...myScheduleObj, [content]: {content: content, likes: 1}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myScheduleObj}
    newObj[content] = undefined
    this.setState({myScheduleObj: newObj})
  }

  onLikeSelection = (content) => {// handle like or dislike selection
    let newObj = {...this.state.myScheduleObj}
    newObj[content] = {...newObj[content], content:content, likes: 1}
    this.setState({myScheduleObj: newObj})
  }

  clearChangeInSchedule = () => {
    this.setState({myScheduleObj: this.props.realtimeManager.myScheduleObj})
  }

  onSubmitSchedule = () => {
    this.props.submitSchedule(
      Object.values(this.state.myScheduleObj).filter(ele=>!!ele).map(eachSchedule=>({
      content:eachSchedule.content
    })))
  }

  render() {
    let {myScheduleObj} = this.state
    let {onCreateSchedule, onSubmitSchedule, clearChangeInSchedule} = this
    let {restScheduleObj} = this.props.realtimeManager
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <Card title="SCHEDULE" bordered={false}>
                  <ScheduleList restScheduleObj={restScheduleObj} myScheduleObj={myScheduleObj} isSummary={false}
                  onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
                </Card>
                <div className="grid-3">
                  <CreateSchedule createSchedule={onCreateSchedule}/>
                  <Popconfirm title="Are you sure to submit changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={onSubmitSchedule} okText="Submit" cancelText="Cancel">
                    <Button className="main-button" size="large" ghost>SUBMIT SCHEDULE</Button> </Popconfirm>
                  <Popconfirm title="Are you sure to clear changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={clearChangeInSchedule} okText="Clear" cancelText="Cancel">
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
  { submitSchedule }
)(ScheduleTab);