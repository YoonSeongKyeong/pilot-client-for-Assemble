import React from "react";
import { connect } from "react-redux";
import ScheduleList from "./ScheduleList";
import PlaceList from "./PlaceList";
import ActivityList from "./ActivityList";
import MenuList from "./MenuList";

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
        <div>
            <div>대시보드</div>
            <div>
              <div>Schedule Top 5</div>
              <ScheduleList restScheduleObj={restScheduleObj} myScheduleObj={myScheduleObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
              <div>Place Top 5</div>
              <PlaceList restPlaceObj={restPlaceObj} myPlaceObj={myPlaceObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
              <div>Activity Top 5</div>
              <ActivityList restActivityObj={restActivityObj} myActivityObj={myActivityObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
              <div>Menu Top 5</div>
              <MenuList restMenuObj={restMenuObj} myMenuObj={myMenuObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
            </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
    return { realtimeManager: state.realtimeManager };
  };
export default connect(
    mapStateToProps
)(DashboardTab);
