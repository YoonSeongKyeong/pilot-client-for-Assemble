import React from "react";
import { connect } from "react-redux";
import { submitMenu } from "../redux/actions";
import MenuList from "./MenuList";

class MenuTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      myMenuObj: props.realtimeManager.myMenuObj,
      createInput:"",
      isFavor:true
    };
  }

  onCreateChange = (input) => {
    this.setState({createInput:input})
  }

  onCreateMenu = () => {
    let {createInput, isFavor, myMenuObj} = this.state
    if(this.props.realtimeManager.restMenuObj[createInput] === undefined
      && myMenuObj[createInput] === undefined) {
      this.setState({createInput:"", isFavor:true, myMenuObj:{...myMenuObj, [createInput]: {content: createInput, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}}})
    }
  }

  onDeleteSelection = (content) => {
    let newObj = {...this.state.myMenuObj}
    newObj[content] = undefined
    this.setState({myMenuObj: newObj})
  }

  onLikeSelection = (content, isLike) => {// handle like or dislike selection
    let newObj = {...this.state.myMenuObj}
    newObj[content] = {...newObj[content], content:content, likes: (isLike?1:0), dislikes: (isLike?0:1)}
    this.setState({myMenuObj: newObj})
  }

  clearChangeInMenu = () => {
    this.setState({myMenuObj: this.props.realtimeManager.myMenuObj})
  }

  toggleLike = () => {
    this.setState({isFavor: !this.state.isFavor})
  }

  onSubmitMenu = () => {
    this.props.submitMenu(
      Object.values(this.state.myMenuObj).filter(ele=>!!ele).map(eachMenu=>({
      content:eachMenu.content,
      isFavor:(eachMenu.likes===1?true:false)
    })))
  }

  render() {
    let {createInput, isFavor, myMenuObj} = this.state
    let {restMenuObj} = this.props.realtimeManager
    return (
      <div>
        활동
        <div>
          <MenuList restMenuObj={restMenuObj} myMenuObj={myMenuObj} isSummary={false}
           onDeleteSelection={this.onDeleteSelection} onLikeSelection = {this.onLikeSelection}/>
        </div>
        <div>추가
          <input className="create-input"
          value={createInput}
          onChange={(e)=>this.onCreateChange(e.target.value)}
          ></input>
          {isFavor?<span onClick={this.toggleLike}>Like(Selected)</span>:<span onClick={this.toggleLike}>Like</span>}
          {isFavor?<span onClick={this.toggleLike}>Dislike</span>:<span onClick={this.toggleLike}>Dislike(Selected)</span>}
          <button onClick={this.onCreateMenu}>Create Menu</button>
        </div>
        <button onClick={this.onSubmitMenu}>Submit Menu</button>
        <button onClick={this.clearChangeInMenu}>Clear Change</button>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { realtimeManager: state.realtimeManager };
};
export default connect(
  mapStateToProps,
  { submitMenu }
)(MenuTab);