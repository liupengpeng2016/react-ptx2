import { combineReducers } from 'redux'
import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SENSITIVEWORDSLIST,
  RECEIVE_SHIELDLIST,
  RECEIVE_REQUESTLIST,
  DEL_ONERECORD,
  DEL_ALLRECORD,
  DEL_ONESHIELD
} from './actionTypes.js'

const visibility= function(
  state= {
    loading: false,
    inputPanel: false
  },
  action){
  switch(action.type) {
    case SET_VISIBILITY:
    return Object.assign({}, state, {[action.id]: !state[action.id]})
    default:
    return state
  }
}
function filterDel (state, action) {
  const obj = Object.assign({},state.shieldList)
  for(let i in action.json) {
    if(action.json.hasOwnProperty(i)){
      delete obj[i]
    }
  }
  return obj
}
const fetchData = function(state = {
  blackList: [],
  whiteList: [],
  sensitiveWordsList: [],
  shieldList: [],
  requestList: []
}, action) {
  switch(action.type){
    case RECEIVE_BLACKLIST:
    return Object.assign({}, state, {blackList: action.json || []})
    case RECEIVE_WHITELIST:
    return Object.assign({}, state, {whiteList: action.json || []})
    case RECEIVE_SENSITIVEWORDSLIST:
    return Object.assign({}, state, {sensitiveWordsList: action.json || []})
    case RECEIVE_SHIELDLIST:
    return Object.assign({}, state, {shieldList: action.json || []})
    case RECEIVE_REQUESTLIST:
    return Object.assign({}, state, {requestList: action.json || []})
    case DEL_ONERECORD:
    return filterDel(state, action)
    case DEL_ALLRECORD:
    if('清空屏蔽列表'){
      return Object.assign({}, state, {shieldList: null})
    }else{
      return Object.assign({}, state, {requestList: null})
    }
    case DEL_ONESHIELD:
    return filterDel(state, action)
    default: return state
  }
}
export default combineReducers({
  visibility,
  fetchData
})
