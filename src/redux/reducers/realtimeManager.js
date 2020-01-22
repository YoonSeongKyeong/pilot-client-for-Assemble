import {
    GET_MODEL_REQUEST,
    GET_MODEL_SUCCESS,
    GET_MODEL_FAILURE,
    CONNECT_SOCKET_REQUEST,
    CONNECT_SOCKET_SUCCESS,
    CONNECT_SOCKET_FAILURE,
    OFF_USER,
    NEW_PERSON,
    NEW_SCHEDULE_LIST,
    SUBMIT_SCHEDULE_REQUEST,
    SUBMIT_SCHEDULE_SUCCESS,
    SUBMIT_SCHEDULE_FAILURE,
    NEW_PLACE_LIST,
    SUBMIT_PLACE_REQUEST,
    SUBMIT_PLACE_SUCCESS,
    SUBMIT_PLACE_FAILURE,
    NEW_ACTIVITY_LIST,
    SUBMIT_ACTIVITY_REQUEST,
    SUBMIT_ACTIVITY_SUCCESS,
    SUBMIT_ACTIVITY_FAILURE,
    NEW_MENU_LIST,
    SUBMIT_MENU_REQUEST,
    SUBMIT_MENU_SUCCESS,
    SUBMIT_MENU_FAILURE, 
    NEW_CHAT,
    SUBMIT_CHAT_REQUEST,
    SUBMIT_CHAT_SUCCESS,
    SUBMIT_CHAT_FAILURE
} from "../actionTypes";

const initialState = {
    isGetModelSuccess: false,
    waitingGetModel: false,
    isConnectSocketSuccess: false,
    waitingConnectSocket: false,
    isSubmitScheduleSuccess: false,
    waitingSubmitSchedule: false,
    isSubmitPlaceSuccess: false,
    waitingSubmitPlace: false,
    isSubmitActivitySuccess: false,
    waitingSubmitActivity: false,
    isSubmitMenuSuccess: false,
    waitingSubmitMenu: false,
    isSubmitChatSuccess: false,
    waitingSubmitChat: false,
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
    socketId:null,
    recentChatId: '',// double message patch
    recentNewPersonName: '',// double message patch
    recentScheduleId: '',// double message patch
    recentPlaceId: '',// double message patch
    recentActivityId: '',// double message patch
    recentMenuId: '',// double message patch
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
                isSubmitScheduleSuccess: false,
                waitingSubmitSchedule: false,
                isSubmitPlaceSuccess: false,
                waitingSubmitPlace: false,
                isSubmitActivitySuccess: false,
                waitingSubmitActivity: false,
                isSubmitMenuSuccess: false,
                waitingSubmitMenu: false,
                isSubmitChatSuccess: false,
                waitingSubmitChat: false,
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
        case NEW_PERSON: {
            let {newPerson} = action
            if(newPerson.name===state.recentNewPersonName) {
                return state
            }
            return {
                ...state,
                people: [...state.people, action.newPerson],
                recentNewPersonName: newPerson.name
            };
        }
        case SUBMIT_SCHEDULE_REQUEST: {
            return {
                ...state,
                waitingSubmitSchedule: true
            };
        }
        case SUBMIT_SCHEDULE_SUCCESS: {
            return {
                ...state,
                isSubmitScheduleSuccess: true,
                waitingSubmitSchedule: false
            };
        }
        case SUBMIT_SCHEDULE_FAILURE: {
            return {
                ...state,
                isSubmitScheduleSuccess: false,
                waitingSubmitSchedule: false
            };
        }
        case NEW_SCHEDULE_LIST: {
            debugger
            let {myself, people, restScheduleObj} = state
            let {updaterName, avail_schedules_list, id} = action
            if(id === state.recentScheduleId) {// avoid duplicate message
                return state
            }
            for(let person of people) {
                if (person.name === updaterName) {
                    if(updaterName === myself.name) {// myself의 object를 만들고, myself와 person의 avail_schedules_list를 덮어쓴다.
                        let myScheduleObj = {}
                        for(let eachSchedule of avail_schedules_list) {
                            let {content} = eachSchedule
                            myScheduleObj[content] = { content: content, likes: 1}
                        }
                        return {
                            ...state,
                            myself: {...myself, avail_schedules_list: avail_schedules_list},
                            myScheduleObj: myScheduleObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, avail_schedules_list : avail_schedules_list}
                                } 
                                return p
                            }),
                            recentScheduleId:id
                        }
                    }
                    else {// oldScheduleList를 갖고와서 restObj에서 빼고, restObj에 newScheduleList를 더한다. 이후 person의 avail_schedules_list를 덮어쓴다.
                        let oldScheduleList = person.avail_schedules_list
                        restScheduleObj = {...restScheduleObj}
                        for(let oldSchedule of oldScheduleList) {
                            let {content} = oldSchedule
                            let targetObj = restScheduleObj[content]
                            restScheduleObj[content] = { content: content, likes: targetObj.likes-1 }
                        }
                        for(let newSchedule of avail_schedules_list) {
                            let {content} = newSchedule
                            let targetObj = restScheduleObj[content]
                            if(targetObj!==undefined) {
                                restScheduleObj[content] = { content: content, likes: targetObj.likes+1 }
                            } else {
                                restScheduleObj[content] = { content: content, likes: 1 }
                            }
                        }
                        return {
                            ...state,
                            restScheduleObj: restScheduleObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, avail_schedules_list : avail_schedules_list}
                                } 
                                return p
                            }),
                            recentScheduleId:id
                        }
                    }
                }
            }
            break;
        }
        case SUBMIT_PLACE_REQUEST: {
            return {
                ...state,
                waitingSubmitPlace: true
            };
        }
        case SUBMIT_PLACE_SUCCESS: {
            return {
                ...state,
                isSubmitPlaceSuccess: true,
                waitingSubmitPlace: false
            };
        }
        case SUBMIT_PLACE_FAILURE: {
            return {
                ...state,
                isSubmitPlaceSuccess: false,
                waitingSubmitPlace: false
            };
        }
        case NEW_PLACE_LIST: {
            debugger
            let {myself, people, restPlaceObj} = state
            let {updaterName, avail_places_list, id} = action
            if(id === state.recentPlaceId) {// avoid duplicate message
                return state
            }
            for(let person of people) {
                if (person.name === updaterName) {
                    if(updaterName === myself.name) {// myself의 object를 만들고, myself와 person의 avail_places_list를 덮어쓴다.
                        let myPlaceObj = {}
                        for(let eachPlace of avail_places_list) {
                            let {content} = eachPlace
                            myPlaceObj[content] = { content: content, likes: 1}
                        }
                        return {
                            ...state,
                            myself: {...myself, avail_places_list: avail_places_list},
                            myPlaceObj: myPlaceObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, avail_places_list : avail_places_list}
                                } 
                                return p
                            }),
                            recentPlaceId: id
                        }
                    }
                    else {// oldPlaceList를 갖고와서 restObj에서 빼고, restObj에 newPlaceList를 더한다. 이후 person의 avail_places_list를 덮어쓴다.
                        let oldPlaceList = person.avail_places_list
                        restPlaceObj = {...restPlaceObj}
                        for(let oldPlace of oldPlaceList) {
                            let {content} = oldPlace
                            let targetObj = restPlaceObj[content]
                            restPlaceObj[content] = { content: content, likes: targetObj.likes-1 }
                        }
                        for(let newPlace of avail_places_list) {
                            let {content} = newPlace
                            let targetObj = restPlaceObj[content]
                            if(targetObj!==undefined) {
                                restPlaceObj[content] = { content: content, likes: targetObj.likes+1 }
                            } else {
                                restPlaceObj[content] = { content: content, likes: 1 }
                            }
                        }
                        return {
                            ...state,
                            restPlaceObj: restPlaceObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, avail_places_list : avail_places_list}
                                } 
                                return p
                            }),
                            recentPlaceId: id
                        }
                    }
                }
            }
            break;
        }
        case NEW_ACTIVITY_LIST: {
            debugger
            let {myself, people, restActivityObj} = state
            let {updaterName, activity_list, id} = action
            if(id === state.recentActivityId) {// avoid duplicate message
                return state
            }
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
                            }),
                            recentActivityId: id
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
                            }),
                            recentActivityId: id
                        }
                    }
                }
            }
            break;
        }
        case SUBMIT_ACTIVITY_REQUEST: {
            return {
                ...state,
                waitingSubmitActivity: true
            };
        }
        case SUBMIT_ACTIVITY_SUCCESS: {
            return {
                ...state,
                isSubmitActivitySuccess: true,
                waitingSubmitActivity: false
            };
        }
        case SUBMIT_ACTIVITY_FAILURE: {
            return {
                ...state,
                isSubmitActivitySuccess: false,
                waitingSubmitActivity: false
            };
        }
        case NEW_MENU_LIST: {
            debugger
            let {myself, people, restMenuObj} = state
            let {updaterName, menu_list, id} = action
            if(id === state.recentMenuId) {// avoid duplicate message
                return state
            }
            for(let person of people) {
                if (person.name === updaterName) {
                    if(updaterName === myself.name) {// myself의 object를 만들고, myself와 person의 menu_list를 덮어쓴다.
                        let myMenuObj = {}
                        for(let eachMenu of menu_list) {
                            let {content, isFavor} = eachMenu
                            myMenuObj[content] = { content: content, likes: 0, dislikes:0 }
                            if (isFavor === true ) { myMenuObj[content].likes += 1 }
                            else if (isFavor === false ) { myMenuObj[content].dislikes += 1 }
                        }
                        return {
                            ...state,
                            myself: {...myself, menu_list: menu_list},
                            myMenuObj: myMenuObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, menu_list : menu_list}
                                } 
                                return p
                            }),
                            recentMenuId: id
                        }
                    }
                    else {// oldMenuList를 갖고와서 restObj에서 빼고, restObj에 newMenuList를 더한다. 이후 person의 menu_list를 덮어쓴다.
                        let oldMenuList = person.menu_list
                        restMenuObj = {...restMenuObj}
                        for(let oldMenu of oldMenuList) {
                            let {content, isFavor} = oldMenu
                            let targetObj = restMenuObj[content]
                            restMenuObj[content] = { content: content, likes: targetObj.likes-(isFavor?1:0), dislikes: targetObj.dislikes-(isFavor?0:1)}
                        }
                        for(let newMenu of menu_list) {
                            let {content, isFavor} = newMenu
                            let targetObj = restMenuObj[content]
                            if(targetObj!==undefined) {
                                restMenuObj[content] = { content: content, likes: targetObj.likes+(isFavor?1:0), dislikes: targetObj.dislikes+(isFavor?0:1)}
                            } else {
                                restMenuObj[content] = { content: content, likes: (isFavor?1:0), dislikes: (isFavor?0:1)}
                            }
                        }
                        return {
                            ...state,
                            restMenuObj: restMenuObj,
                            people: people.map(p => {
                                if(p.name === updaterName) {
                                    return {...p, menu_list : menu_list}
                                } 
                                return p
                            }),
                            recentMenuId: id
                        }
                    }
                }
            }
            break;
        }
        case SUBMIT_MENU_REQUEST: {
            return {
                ...state,
                waitingSubmitMenu: true
            };
        }
        case SUBMIT_MENU_SUCCESS: {
            return {
                ...state,
                isSubmitMenuSuccess: true,
                waitingSubmitMenu: false
            };
        }
        case SUBMIT_MENU_FAILURE: {
            return {
                ...state,
                isSubmitMenuSuccess: false,
                waitingSubmitMenu: false
            };
        }

        case SUBMIT_CHAT_REQUEST: {
            return {
                ...state,
                waitingSubmitChat: true
            };
        }
        case SUBMIT_CHAT_SUCCESS: {
            return {
                ...state,
                isSubmitChatSuccess: true,
                waitingSubmitChat: false
            };
        }
        case SUBMIT_CHAT_FAILURE: {
            return {
                ...state,
                isSubmitChatSuccess: false,
                waitingSubmitChat: false
            };
        }
        case NEW_CHAT: {
            debugger
            let {msg} = action
            if(state.recentChatId===msg.id) {// avoid duplicate message
                return state
            }
            return {
                ...state,
                chats: [...state.chats, msg],
                recentChatId:msg.id
            }
        }

        default:
            return state;
    }
}