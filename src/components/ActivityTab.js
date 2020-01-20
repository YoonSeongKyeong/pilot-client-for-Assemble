import React from "react";
import { connect } from "react-redux";
import { submitActivity } from "../redux/actions";
import ActivityList from "./ActivityList";

class ActivityTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myActivityObj: props.realtimeManager.myActivityObj,
      createInput:"",
      isFavor:true
    };
  }

  onCreateChange = (input) => {
    this.setState({createInput:input})
  }

  onCreateActivity = () => {
    let {createInput, isFavor, myActivityObj} = this.state
    if(this.props.realtimeManager.restActivityObj[createInput] === undefined
      && myActivityObj[createInput] === undefined) {
      this.setState({createInput:"", isFavor:true, myActivityObj:{...myActivityObj, [createInput]: {content: createInput, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}}})
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

  toggleLike = () => {
    this.setState({isFavor: !this.state.isFavor})
  }

  render() {
    let {createInput, isFavor, myActivityObj} = this.state
    let {restActivityObj} = this.props.realtimeManager
    return (
      <div>
        활동
        <div>
          <ActivityList restActivityObj={restActivityObj} myActivityObj={myActivityObj} isSummary={false}
           onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
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
  { submitActivity }
)(ActivityTab);