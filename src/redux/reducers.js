import { combineReducers } from 'redux'
import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SHIELDLIST,
  RECEIVE_REQUESTLIST
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
const fetchData = function(state = {
  blackList:null,
  whiteList:null,
  shieldList:null,
  requestList:null
}, action) {
  switch(action.type){
    case RECEIVE_BLACKLIST:
    return Object.assign({}, state, {blackList: action.json})
    case RECEIVE_WHITELIST:
    return Object.assign({}, state, {whiteList: action.json})
    case RECEIVE_SHIELDLIST:
    return Object.assign({}, state, {shieldList: action.json})
    case RECEIVE_REQUESTLIST:
    return Object.assign({}, state, {requestList: action.json})
    default: return state
  }
}
export default combineReducers({
  visibility,
  fetchData
})
