import React from "react";
import { connect } from "react-redux";
import ActivityList from "./ActivityList";

class DashboardTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  render() {
    let {restActivityObj, myActivityObj} = this.props.realtimeManager
    debugger
    return (
        <div>
            대시보드
            <div>
              <ActivityList restActivityObj={restActivityObj} myActivityObj={myActivityObj} isSummary={true} onDeleteSelection={()=>null} onLikeSelection={()=>null}/>
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
