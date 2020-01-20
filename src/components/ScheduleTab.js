import React from "react";
import { connect } from "react-redux";
import { submitSchedule } from "../redux/actions";
import ScheduleList from "./ScheduleList";

class ScheduleTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myScheduleObj: props.realtimeManager.myScheduleObj,
      createInput:"",
    };
  }

  onCreateChange = (input) => {
    this.setState({createInput:input})
  }

  onCreateSchedule = () => {
    let {createInput, myScheduleObj} = this.state
    if(this.props.realtimeManager.restScheduleObj[createInput] === undefined
      && myScheduleObj[createInput] === undefined) {
      this.setState({createInput:"", myScheduleObj:{...myScheduleObj, [createInput]: {content: createInput, likes: 1}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myScheduleObj}
    newObj[content] = undefined
    this.setState({myScheduleObj: newObj})
  }

  onLikeSelection = (content) => {// handle like selection
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
    let {createInput, myScheduleObj} = this.state
    let {restScheduleObj} = this.props.realtimeManager
    return (
      <div>
        활동
        <div>
          <ScheduleList restScheduleObj={restScheduleObj} myScheduleObj={myScheduleObj} isSummary={false}
           onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
        </div>
        <div>추가
          <input className="create-input"
          value={createInput}
          onChange={(e)=>this.onCreateChange(e.target.value)}
          ></input>
          <button onClick={this.onCreateSchedule}>Create Schedule</button>
        </div>
        <button onClick={this.onSubmitSchedule}>Submit Schedule</button>
        <button onClick={this.clearChangeInSchedule}>Clear Change</button>
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