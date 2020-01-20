import React from "react";
import { connect } from "react-redux";
import { submitPlace } from "../redux/actions";
import PlaceList from "./PlaceList";

class PlaceTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myPlaceObj: props.realtimeManager.myPlaceObj,
      createInput:"",
    };
  }

  onCreateChange = (input) => {
    this.setState({createInput:input})
  }

  onCreatePlace = () => {
    let {createInput, myPlaceObj} = this.state
    if(this.props.realtimeManager.restPlaceObj[createInput] === undefined
      && myPlaceObj[createInput] === undefined) {
      this.setState({createInput:"", myPlaceObj:{...myPlaceObj, [createInput]: {content: createInput, likes: 1}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myPlaceObj}
    newObj[content] = undefined
    this.setState({myPlaceObj: newObj})
  }

  onLikeSelection = (content) => {// handle like selection
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
    let {createInput, myPlaceObj} = this.state
    let {restPlaceObj} = this.props.realtimeManager
    return (
      <div>
        활동
        <div>
          <PlaceList restPlaceObj={restPlaceObj} myPlaceObj={myPlaceObj} isSummary={false}
           onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
        </div>
        <div>추가
          <input className="create-input"
          value={createInput}
          onChange={(e)=>this.onCreateChange(e.target.value)}
          ></input>
          <button onClick={this.onCreatePlace}>Create Place</button>
        </div>
        <button onClick={this.onSubmitPlace}>Submit Place</button>
        <button onClick={this.clearChangeInPlace}>Clear Change</button>
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