import React from "react";
import { connect } from "react-redux";
import ActivityList from "./ActivityList";
import MenuList from "./MenuList";

class DashboardTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    let {restActivityObj, myActivityObj, restMenuObj, myMenuObj} = this.props.realtimeManager
    debugger
    return (
        <div>
            <div>대시보드</div>
            <div>
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
