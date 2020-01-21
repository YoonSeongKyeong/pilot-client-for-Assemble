import React from 'react'
import { connect } from "react-redux";
import ScheduleList from "../components/ScheduleList";
import PlaceList from "../components/PlaceList";
import ActivityList from "../components/ActivityList";
import MenuList from "../components/MenuList";

import 'antd/dist/antd.css';
import { Card, Col, Row, Divider } from 'antd';

class DashboardTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    let {restScheduleObj, myScheduleObj, restPlaceObj, myPlaceObj, restActivityObj, myActivityObj, restMenuObj, myMenuObj} = this.props.realtimeManager
    debugger
    return (
        <div style={{ background: '#ECECEC', padding: '30px' }}>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Schedule Top 3" bordered={false}>
                    <ScheduleList restScheduleObj={restScheduleObj} myScheduleObj={myScheduleObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Place Top 3" bordered={false}>
                    <PlaceList restPlaceObj={restPlaceObj} myPlaceObj={myPlaceObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
                </Card>
              </Col>
            </Row>
            <Divider ></Divider>
            <Row gutter={16}>
              <Col span={8}>
                <Card title="Activity Top 3" bordered={false}>
                    <ActivityList restActivityObj={restActivityObj} myActivityObj={myActivityObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
                </Card>
              </Col>
              <Col span={8}>
                <Card title="Menu Top 3" bordered={false}>
                    <MenuList restMenuObj={restMenuObj} myMenuObj={myMenuObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
                </Card>
              </Col>
            </Row>
        </div>);
    }
}
const mapStateToProps = state => {
    return { realtimeManager: state.realtimeManager };
  };
export default connect(
    mapStateToProps
)(DashboardTab);
