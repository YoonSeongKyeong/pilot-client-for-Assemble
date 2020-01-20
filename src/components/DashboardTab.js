import React from "react";
import { connect } from "react-redux";
import ActivityRow from "./ActivityRow";

class DashboardTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
    };
  }

  activitySummary = () => {
    return Object.values(this.props.realtimeManager.groupActivityObj)
    .sort((a, b) => (b.likes - a.likes) - 3*(b.dislikes - a.dislikes) ) // 정렬 logic : 싫어하는 것은 좋아하는 것보다 페널티가 높게 설정
    .slice(0, 5)
    .map(eachActivity => <ActivityRow info={eachActivity} key={eachActivity.content}/>)
  }

  render() {
    return (
        <div>
            대시보드
            <div>
                {this.activitySummary()}
            </div>
        </div>
    );
  }
}
const mapStateToProps = state => {
    return { realtimeManager: state.realtimeManager };
  };
export default connect(
    mapStateToProps,
)(DashboardTab);
