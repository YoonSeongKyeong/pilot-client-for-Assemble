import React from "react";
import MenuRow from "./MenuRow";

const MenuList = ({ restMenuObj, myMenuObj, isSummary, onDeleteSelection, onLikeSelection } ) => {// restMenuObj와 myMenuOBj를 갖고 MenuList를 생성한다.
    let copiedMyMenuObj = {...myMenuObj}
    if(restMenuObj) {
        let sharedArr = [...Object.values(restMenuObj)]
        sharedArr = sharedArr.map(eachMenu=>{
            let matchingObj = copiedMyMenuObj[eachMenu.content]
            if(matchingObj) {
                let newObj = {...eachMenu}
                if(matchingObj.likes===1) {
                    newObj.myLike = true
                    newObj.likes++
                }
                else if(matchingObj.dislikes===1) {
                    newObj.myDislike = true
                    newObj.dislikes++
                }
                copiedMyMenuObj[matchingObj.content] = null
                return newObj
            }
            return eachMenu
        })
        let unsharedArr = Object.values(copiedMyMenuObj).filter(ele=>!!ele&&!!ele.content).map(eachObj=>{
            let newObj = {...eachObj}
            if(newObj.likes===1) { newObj.myLike = true }
            else if(newObj.dislikes===1) { newObj.myDislike = true}
            return newObj
        })
        let midResult=([...sharedArr, ...unsharedArr]).sort((a, b) => (b.likes - a.likes) - 3*(b.dislikes - a.dislikes)) // 정렬 logic : 싫어하는 것은 좋아하는 것보다 페널티가 높게 설정
        if(isSummary) {
            midResult=midResult.slice(0,5)
        }
        return midResult.map(eachMenu => 
        <MenuRow info={eachMenu} key={eachMenu.content} onDeleteSelection={onDeleteSelection} onLikeSelection={onLikeSelection}/>)
    }
    return null
}

export default MenuList;
