import React from "react";
import ScheduleRow from "../antDesignComponents/ScheduleRow";

const ScheduleList = ({ restScheduleObj, myScheduleObj, isSummary, onDeleteSelection, onLikeSelection } ) => {// restScheduleObj와 myScheduleOBj를 갖고 ScheduleList를 생성한다.
    let copiedMyScheduleObj = {...myScheduleObj}
    if(restScheduleObj) {
        let sharedArr = [...Object.values(restScheduleObj)]
        sharedArr = sharedArr.map(eachSchedule=>{
            let matchingObj = copiedMyScheduleObj[eachSchedule.content]
            if(matchingObj) {
                let newObj = {...eachSchedule}
                if(matchingObj.likes===1) {
                    newObj.myLike = true
                    newObj.likes++
                }
                copiedMyScheduleObj[matchingObj.content] = null
                return newObj
            }
            return eachSchedule
        })
        let unsharedArr = Object.values(copiedMyScheduleObj).filter(ele=>!!ele&&!!ele.content).map(eachObj=>{
            let newObj = {...eachObj}
            if(newObj.likes===1) { newObj.myLike = true }
            return newObj
        })
        let midResult=([...sharedArr, ...unsharedArr]).sort((a, b) => (b.likes - a.likes)) // 정렬 logic : 가능한 많이 겹치는 일정이 먼저 오도록 정렬
        if(isSummary) {
            midResult=midResult.slice(0,3)
        }
        return midResult.map(eachSchedule => 
        <ScheduleRow info={eachSchedule} key={eachSchedule.content} onDeleteSelection={onDeleteSelection} onLikeSelection={onLikeSelection}/>)
    }
    return null
}

export default ScheduleList;
