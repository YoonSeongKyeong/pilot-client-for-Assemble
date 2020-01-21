import React from "react";
import { connect } from "react-redux";
import { submitPlace } from "../redux/actions";
import PlaceList from "../components/PlaceList";
import CreatePlace from "./CreatePlace"

import 'antd/dist/antd.css';
import { Card, Col, Row, Popconfirm, Button, Icon } from 'antd';

class PlaceTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPlaceObj: props.realtimeManager.myPlaceObj,
    };
  }

  onCreatePlace = (content) => {
    let {myPlaceObj} = this.state
    if(this.props.realtimeManager.restPlaceObj[content] === undefined
      && myPlaceObj[content] === undefined) {
      this.setState({myPlaceObj:{...myPlaceObj, [content]: {content: content, likes: 1}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myPlaceObj}
    newObj[content] = undefined
    this.setState({myPlaceObj: newObj})
  }

  onLikeSelection = (content) => {// handle like or dislike selection
    let newObj = {...this.state.myPlaceObj}
    newObj[content] = {...newObj[content], content:content, likes: 1}
    this.setState({myPlaceObj: newObj})
  }

  clearChangeInPlace = () => {
    this.setState({myPlaceObj: this.props.realtimeManager.myPlaceObj})
  }

  onSubmitPlace = () => {
    this.props.submitPlace(
      Object.values(this.state.myPlaceObj).filter(ele=>!!ele).map(eachPlace=>({
      content:eachPlace.content
    })))
  }

  render() {
    let {myPlaceObj} = this.state
    let {onCreatePlace, onSubmitPlace, clearChangeInPlace} = this
    let {restPlaceObj} = this.props.realtimeManager
    return (
      <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={16}>
                <Card title="PLACE" bordered={false}>
                  <PlaceList restPlaceObj={restPlaceObj} myPlaceObj={myPlaceObj} isSummary={false}
                  onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
                </Card>
                <div className="grid-3">
                  <CreatePlace createPlace={onCreatePlace}/>
                  <Popconfirm title="Are you sure to submit changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={onSubmitPlace} okText="Submit" cancelText="Cancel">
                    <Button className="main-button" size="large" ghost>SUBMIT PLACE</Button> </Popconfirm>
                  <Popconfirm title="Are you sure to clear changes？" icon={<Icon type="question-circle-o" style={{ color: 'red' }}/>}
                   onConfirm={clearChangeInPlace} okText="Clear" cancelText="Cancel">
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
  { submitPlace }
)(PlaceTab);