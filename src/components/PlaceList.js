import React from "react";
import PlaceRow from "../antDesignComponents/PlaceRow";

const PlaceList = ({ restPlaceObj, myPlaceObj, isSummary, onDeleteSelection, onLikeSelection } ) => {// restPlaceObj와 myPlaceOBj를 갖고 PlaceList를 생성한다.
    let copiedMyPlaceObj = {...myPlaceObj}
    if(restPlaceObj) {
        let sharedArr = [...Object.values(restPlaceObj)]
        sharedArr = sharedArr.map(eachPlace=>{
            let matchingObj = copiedMyPlaceObj[eachPlace.content]
            if(matchingObj) {
                let newObj = {...eachPlace}
                if(matchingObj.likes===1) {
                    newObj.myLike = true
                    newObj.likes++
                }
                copiedMyPlaceObj[matchingObj.content] = null
                return newObj
            }
            return eachPlace
        })
        let unsharedArr = Object.values(copiedMyPlaceObj).filter(ele=>!!ele&&!!ele.content).map(eachObj=>{
            let newObj = {...eachObj}
            if(newObj.likes===1) { newObj.myLike = true }
            return newObj
        })
        let midResult=([...sharedArr, ...unsharedArr]).sort((a, b) => (b.likes - a.likes)) // 정렬 logic : 가능한 많이 겹치는 일정이 먼저 오도록 정렬
        if(isSummary) {
            midResult=midResult.slice(0,3)
        }
        return midResult.map(eachPlace => 
        <PlaceRow info={eachPlace} key={eachPlace.content} onDeleteSelection={onDeleteSelection} onLikeSelection={onLikeSelection}/>)
    }
    return null
}

export default PlaceList;
