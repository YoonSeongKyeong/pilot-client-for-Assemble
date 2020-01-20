import {
    GET_MODEL_REQUEST,
    GET_MODEL_SUCCESS,
    GET_MODEL_FAILURE,
    CONNECT_SOCKET_REQUEST,
    CONNECT_SOCKET_SUCCESS,
    CONNECT_SOCKET_FAILURE,
    OFF_USER,
    CREATE_ACTIVITY,
    CLEAR_CHANGE_IN_ACTIVITY
} from "../actionTypes";

const initialState = {
    isGetModelSuccess: false,
    waitingGetModel: false,
    isConnectSocketSuccess: false,
    waitingConnectSocket: false,
    roomId: "",
    roomname: "",
    groupScheduleObj: {},
    localScheduleObj: {},
    groupPlaceObj: {},
    localPlaceObj: {},
    groupActivityObj: {},
    localActivityObj: {},
    groupMenuObj: {},
    localMenuObj: {},
    paymentList: [],
    localPaymentList: [],
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
            let scheduleObj = {}
            let placeObj = {}
            let activityObj = {}
            let menuObj = {}
            let myself
            for (let eachPerson of people) {// make group level object
                if(eachPerson.name === username) {
                    myself = {...eachPerson}
                }
                for(let eachSchedule of eachPerson.avail_schedules_list) {
                    let {content} = eachSchedule
                    if( scheduleObj[content] === undefined ) { scheduleObj[content] = { content: content, likes: 1 } }
                    else { scheduleObj[content].likes +=  1 }
                }
                for(let eachPlace of eachPerson.avail_places_list) {
                    let {content} = eachPlace
                    if( placeObj[content] === undefined ) { placeObj[content] = { content: content, likes: 1 } }
                    else { placeObj[content].likes +=  1 }
                }
                for(let eachActivity of eachPerson.activity_list) {
                    let {content, isFavor} = eachActivity
                    if( activityObj[content] === undefined ) { activityObj[content] = { content: content, likes: 0, dislikes:0 } }
                    if (isFavor === true ) { activityObj[content].likes += 1 }
                    else if (isFavor === false ) { activityObj[content].dislikes += 1 }
                }
                for(let eachMenu of eachPerson.menu_list) {
                    let {content, isFavor} = eachMenu
                    if( menuObj[content] === undefined ) { menuObj[content] = { content: content, likes: 0, dislikes:0 } }
                    if (isFavor === true ) { menuObj[content].likes += 1 }
                    else if (isFavor === false ) { menuObj[content].dislikes += 1 }
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
                localPaymentList: [...payment_list],
                groupScheduleObj: {...scheduleObj},
                localScheduleObj: {...scheduleObj},
                groupPlaceObj: {...placeObj},
                localPlaceObj: {...placeObj},
                groupActivityObj: {...activityObj},
                localActivityObj: {...activityObj},
                groupMenuObj: {...menuObj},
                localMenuObj: {...menuObj}
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
                groupScheduleList: [],
                groupPlaceList: [],
                groupActivityList: [],
                groupMenuList: [],
                paymentList: [],
                people: [],
                myself: {},
                chats: [],
                socketId: null
            };
          }
        case CREATE_ACTIVITY: {
            debugger
            let myself = state.myself
            let {newActivity} = action
            let {content, isFavor} = newActivity
            return {
                ...state,
                myself: {...myself, activity_list: [...myself.activity_list, newActivity]},
                localActivityObj: {...state.localActivityObj, 
                    [content]: {content: content, likes: (isFavor?1:0), dislikes:(isFavor?0:1)}}
            };
        }
        case CLEAR_CHANGE_IN_ACTIVITY: {
            // debugger
            // let {username} = action
            // for(let person of state.people) {
            //     if(person.name === username) {
            //         return {
            //             ...state,

            //         }
            //     }
            // }
            // return {
            //     ...state,
            //     myself: {...myself, activity_list: [...myself.activity_list, newActivity]},
            //     localActivityObj: {...state.localActivityObj, 
            //         [content]: {content: content, likes: (isFavor?1:0), dislikes:(isFavor?0:1)}}
            // };
        }
        default:
            return state;
    }
}