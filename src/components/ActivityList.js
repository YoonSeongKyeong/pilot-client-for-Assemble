import React from "react";
import ActivityRow from "../antDesignComponents/ActivityRow";

const ActivityList = ({ restActivityObj, myActivityObj, isSummary, onDeleteSelection, onLikeSelection } ) => {// restActivityObj와 myActivityOBj를 갖고 ActivityList를 생성한다.
    let copiedMyActivityObj = {...myActivityObj}
    if(restActivityObj) {
        let sharedArr = [...Object.values(restActivityObj)]
        sharedArr = sharedArr.map(eachActivity=>{
            let matchingObj = copiedMyActivityObj[eachActivity.content]
            if(matchingObj) {
                let newObj = {...eachActivity}
                if(matchingObj.likes===1) {
                    newObj.myLike = true
                    newObj.likes++
                }
                else if(matchingObj.dislikes===1) {
                    newObj.myDislike = true
                    newObj.dislikes++
                }
                copiedMyActivityObj[matchingObj.content] = null
                return newObj
            }
            return eachActivity
        })
        let unsharedArr = Object.values(copiedMyActivityObj).filter(ele=>!!ele&&!!ele.content).map(eachObj=>{
            let newObj = {...eachObj}
            if(newObj.likes===1) { newObj.myLike = true }
            else if(newObj.dislikes===1) { newObj.myDislike = true}
            return newObj
        })
        let midResult=([...sharedArr, ...unsharedArr]).sort((a, b) => (b.likes - a.likes) - 3*(b.dislikes - a.dislikes)) // 정렬 logic : 싫어하는 것은 좋아하는 것보다 페널티가 높게 설정
        if(isSummary) {
            midResult=midResult.slice(0,3)
        }
        return midResult.map(eachActivity => 
        <ActivityRow info={eachActivity} key={eachActivity.content} onDeleteSelection={onDeleteSelection} onLikeSelection={onLikeSelection}/>)
    }
    return null
}

export default ActivityList;
