import React from "react";
import { connect } from "react-redux";
import ActivityRow from "./ActivityRow";
import { submitActivity, createActivity, clearChangeInActivity } from "../redux/actions";

class ActivityTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activityList:[],
      createInput:"",
      isFavor:true
    };
  }

  onCreateChange = (input) => {
    this.setState({createInput:input})
  }

  onCreateActivity = () => {
    debugger
    let {createInput, isFavor} = this.state
    if(this.props.realtimeManager.localActivityObj[createInput] === undefined) {
      this.props.createActivity(createInput, isFavor)
    }
    this.setState({createInput:"", isFavor:true})
  }

  activities = () => {
    return Object.values(this.props.realtimeManager.localActivityObj)
    .sort((a, b) => (b.likes - a.likes) - 3*(b.dislikes - a.dislikes) ) // 정렬 logic : 싫어하는 것은 좋아하는 것보다 페널티가 높게 설정
    .map(eachActivity => <ActivityRow info={eachActivity} key={eachActivity.content}/>)
  }

  toggleLike = () => {
    this.setState({isFavor: !this.state.isFavor})
  }

  render() {
    let {createInput, isFavor} = this.state
    return (
      <div>
        활동
        <div>
          {this.activities()}
        </div>
        <div>추가
          <input className="create-input"
          value={createInput}
          onChange={(e)=>this.onCreateChange(e.target.value)}
          ></input>
          {isFavor?<span onClick={this.toggleLike}>Like(Selected)</span>:<span onClick={this.toggleLike}>Like</span>}
          {isFavor?<span onClick={this.toggleLike}>Dislike</span>:<span onClick={this.toggleLike}>Dislike(Selected)</span>}
          <button onClick={this.onCreateActivity}>Create Activity</button>
        </div>
        <button onClick={this.props.submitActivity}>Submit Activity</button>
        <button onClick={this.props.clearChangeInActivity}>Clear Change</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { realtimeManager: state.realtimeManager };
};
export default connect(
  mapStateToProps,
  { submitActivity, createActivity, clearChangeInActivity }
)(ActivityTab);