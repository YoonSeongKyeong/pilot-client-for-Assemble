import {
    GET_MODEL_REQUEST,
    GET_MODEL_SUCCESS,
    GET_MODEL_FAILURE,
    CONNECT_SOCKET_REQUEST,
    CONNECT_SOCKET_SUCCESS,
    CONNECT_SOCKET_FAILURE,
    OFF_USER,
    NEW_ACTIVITY_LIST
} from "../actionTypes";

const initialState = {
    isGetModelSuccess: false,
    waitingGetModel: false,
    isConnectSocketSuccess: false,
    waitingConnectSocket: false,
    roomId: "",
    roomname: "",
    restScheduleObj: {},
    myScheduleObj: {},
    restPlaceObj: {},
    myPlaceObj: {},
    restActivityObj: {},
    myActivityObj: {},
    restMenuObj: {},
    myMenuObj: {},
    paymentList: [],
    people: [],
    myself: {},
    chats: [],
    socketId:null
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_MODEL_REQUEST: {
            return {
                ...state,
                waitingGetModel: true
            };
        }
        case GET_MODEL_SUCCESS: {
            debugger
            let {room_id, roomname, people, chats, payment_list } = action.model
            let username = action.username
            let restScheduleObj = {}
            let myScheduleObj = {}
            let restPlaceObj = {}
            let myPlaceObj = {}
            let restActivityObj = {}
            let myActivityObj = {}
            let restMenuObj = {}
            let myMenuObj = {}
            let myself
            for (let eachPerson of people) {// make high level object
                if(eachPerson.name === username) {// make model for self
                    myself = {...eachPerson}
                    for(let eachSchedule of eachPerson.avail_schedules_list) {
                        let {content} = eachSchedule
                        myScheduleObj[content] = { content: content, likes: 1 } }
                    for(let eachPlace of eachPerson.avail_places_list) {
                        let {content} = eachPlace
                        myPlaceObj[content] = { content: content, likes: 1 } }
                    for(let eachActivity of eachPerson.activity_list) {
                        let {content, isFavor} = eachActivity
                        myActivityObj[content] = { content: content, likes: 0, dislikes:0 }
                        if (isFavor === true ) { myActivityObj[content].likes += 1 }
                        else if (isFavor === false ) { myActivityObj[content].dislikes += 1 }
                    }
                    for(let eachMenu of eachPerson.menu_list) {
                        let {content, isFavor} = eachMenu
                        myMenuObj[content] = { content: content, likes: 0, dislikes:0 }
                        if (isFavor === true ) { myMenuObj[content].likes += 1 }
                        else if (isFavor === false ) { myMenuObj[content].dislikes += 1 }
                    }
                }
                else {// make model for rest
                    for(let eachSchedule of eachPerson.avail_schedules_list) {
                        let {content} = eachSchedule
                        if( restScheduleObj[content] === undefined ) { restScheduleObj[content] = { content: content, likes: 1 } }
                        else { restScheduleObj[content].likes +=  1 }
                    }
                    for(let eachPlace of eachPerson.avail_places_list) {
                        let {content} = eachPlace
                        if( restPlaceObj[content] === undefined ) { restPlaceObj[content] = { content: content, likes: 1 } }
                        else { restPlaceObj[content].likes +=  1 }
                    }
                    for(let eachActivity of eachPerson.activity_list) {
                        let {content, isFavor} = eachActivity
                        if( restActivityObj[content] === undefined ) { restActivityObj[content] = { content: content, likes: 0, dislikes:0 } }
                        if (isFavor === true ) { restActivityObj[content].likes += 1 }
                        else if (isFavor === false ) { restActivityObj[content].dislikes += 1 }
                    }
                    for(let eachMenu of eachPerson.menu_list) {
                        let {content, isFavor} = eachMenu
                        if( restMenuObj[content] === undefined ) { restMenuObj[content] = { content: content, likes: 0, dislikes:0 } }
                        if (isFavor === true ) { restMenuObj[content].likes += 1 }
                        else if (isFavor === false ) { restMenuObj[content].dislikes += 1 }
                    }
                }
            }
            return {
                ...state,
                isGetModelSuccess: true,
                waitingGetModel: false,
                roomId: room_id,
                roomname: roomname,
                people: people,
                myself: myself,
                chats: chats,
                paymentList: [...payment_list],
                restScheduleObj: {...restScheduleObj},
                myScheduleObj: {...myScheduleObj},
                restPlaceObj: {...restPlaceObj},
                myPlaceObj: {...myPlaceObj},
                restActivityObj: {...restActivityObj},
                myActivityObj: {...myActivityObj},
                restMenuObj: {...restMenuObj},
                myMenuObj: {...myMenuObj}
            };
        }
        case GET_MODEL_FAILURE: {
            return {
                ...state,
                isGetModelSuccess: false,
                waitingGetModel: false
            };
        }
        case CONNECT_SOCKET_REQUEST: {
            return {
                ...state,
                waitingConnectSocket: true
            };
        }
        case CONNECT_SOCKET_SUCCESS: {
            return {
                ...state,
                isConnectSocketSuccess: true,
                waitingConnectSocket: false,
                socketId: action.socketId
            };
        }
        case CONNECT_SOCKET_FAILURE: {
            return {
                ...state,
                isConnectSocketSuccess: false,
                waitingConnectSocket: false
            };
        }
        case OFF_USER: {
            return {
                ...state,
                isGetModelSuccess: false,
                waitingGetModel: false,
                isConnectSocketSuccess: false,
                waitingConnectSocket: false,
                roomId: "",
                roomname: "",
                restScheduleObj: {},
                myScheduleObj: {},
                restPlaceObj: {},
                myPlaceObj: {},
                restActivityObj: {},
                myActivityObj: {},
                restMenuObj: {},
                myMenuObj: {},
                paymentList: [],
                people: [],
                myself: {},
                chats: [],
                socketId:null
            };
        }
        case NEW_ACTIVITY_LIST: {
            debugger
            let {myself, people, restActivityObj} = state
            let {updaterName, activity_list} = action
            for(let person of people) {
                if (person.name === updaterName) {
                    if(updaterName === myself.name) {// myself의 object를 만들고, myself와 person의 activity_list를 덮어쓴다.
                        let myActivityObj = {}
                        for(let eachActivity of activity_list) {
                            let {content, isFavor} = eachActivity
                            myActivityObj[content] = { content: content, likes: 0, dislikes:0 }
                            if (isFavor === true ) { myActivityObj[content].likes += 1 }
                            else if (isFavor === false ) { myActivityObj[content].dislikes += 1 }
                        }
                        return {
                            ...state,
                            myself: {...myself, activity_list: activity_list},
                            myActivityObj: myActivityObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, activity_list : activity_list}
                                } 
                                return p
                            })
                        }
                    }
                    else {// oldActivityList를 갖고와서 restObj에서 빼고, restObj에 newActivityList를 더한다. 이후 person의 activity_list를 덮어쓴다.
                        let oldActivityList = person.activity_list
                        restActivityObj = {...restActivityObj}
                        for(let oldActivity of oldActivityList) {
                            let {content, isFavor} = oldActivity
                            let targetObj = restActivityObj[content]
                            restActivityObj[content] = { content: content, likes: targetObj.likes-(isFavor?1:0), dislikes: targetObj.dislikes-(isFavor?0:1)}
                        }
                        for(let newActivity of activity_list) {
                            let {content, isFavor} = newActivity
                            let targetObj = restActivityObj[content]
                            if(targetObj!==undefined) {
                                restActivityObj[content] = { content: content, likes: targetObj.likes+(isFavor?1:0), dislikes: targetObj.dislikes+(isFavor?0:1)}
                            } else {
                                restActivityObj[content] = { content: content, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}
                            }
                        }
                        return {
                            ...state,
                            restActivityObj: restActivityObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, activity_list : activity_list}
                                } 
                                return p
                            })
                        }
                    }
                }
            }
            break;
        }
        // case CHANGE_MY_ACTIVITY: {
        //     debugger
        //     let myself = state.myself
        //     let {newActivity} = action
        //     let {content, isFavor} = newActivity
        //     return {
        //         ...state,
        //         myself: {...myself, activity_list: [...myself.activity_list, newActivity]},
        //         myActivityObj: {...state.myActivityObj, 
        //             [content]: {content: content, likes: (isFavor?1:0), dislikes:(isFavor?0:1)}}
        //     };
        // }
        // case CLEAR_MY_ACTIVITY: {
        //     debugger
        //     let {myself, people, restActivityObj} = state
        //     let {name} = myself
        //     for(let person of people) {
        //         if(person.name === name) {
        //             return {
        //                 ...state,
        //                 myself : {...myself, activity_list: [...person.activity_list]},
        //                 myActivityObj: {...restActivityObj}
        //             }
        //         }
        //     }
        //     break;
        // }
        default:
            return state;
    }
}