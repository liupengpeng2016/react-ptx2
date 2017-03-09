import { combineReducers } from 'redux'
import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_CLASSLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SENSITIVEWORDSLIST,
  RECEIVE_SHIELDRECORD,
  RECEIVE_REQUESTRECORD,
  RECEIVE_DEL_ALL_SHIELDRECORD,
  RECEIVE_DEL_ALL_REQUESTRECORD,
  RECEIVE_DEL_ONE_SHIELDRECORD,
  RECEIVE_DEL_ONE_REQUESTRECORD,
  RECEIVE_TOGGLE_CLASSLIST,
  RECEIVE_DEL_ONE_WHITELIST,
  RECEIVE_DEL_ONE_BLACKLIST,
  RECEIVE_DEL_ONE_SENSITIVEWORDSLIST,
  RECEIVE_ADD_BLACKLIST,
  RECEIVE_ADD_SENSITIVEWORDSLIST,
  RECEIVE_ADD_WHITELIST,
  RECEIVE_SWITCH_STATE,
  WILL_DEL_BLACKLIST,
  WILL_DEL_WHITELIST,
  WILL_DEL_SENSITIVEWORDSLIST
} from './actionTypes.js'

const visibility= function(
  state= {
    loading: false,
    inputPanel: false,
    confirmModify: false
  },
  action){
  switch(action.type) {
    case SET_VISIBILITY:
    return Object.assign({}, state, action.data)
    default:
    return state
  }
}

//数据删除函数
function stateDel(state, val, list, key1, key2) {
  let obj = Object.assign({}, state)
  for(let i = 0; i< obj[list].length; i++){
    if(obj[list][i][key1] || obj[list][i][key2] === val){
      obj[list].splice(i,1)
      return obj
    }
  }
  return obj
}
//数据添加函数
function stateAdd(state, data, list){
  const obj = Object.assign({}, state)
  obj[list] = obj[list].concat(data)
  return obj
}
//分类列表TOGGLE
function toggleClass(state, data) {
  let obj = Object.assign({}, state)
  for(let i = 0; i<obj.classList.length; i++){
    if(data[0].id === obj.classList[i].filter_lable_id){
      obj.classList[i].selected = !obj.classList[i].selected
      return obj
    }
    for(let k = 0; k < (obj.classList[i].subclass || []).length; k++){
      if(data[0].id === obj.classList[i].subclass[k].filter_lable_id){
        obj.classList[i].subclass[k].selected = !obj.classList[i].subclass[k].selected
        return obj
      }
    }
  }
  return obj
}
//请求数据
const fetchData = function(state = {
  blackList: [],
  classList: [],
  whiteList: [],
  sensitiveWordsList: [],
  shieldRecord: [],
  requestRecord: [],
  switchState: 0
}, action) {
  switch(action.type){
    case RECEIVE_BLACKLIST:
    return Object.assign({}, state, {blackList: action.data || []})
    case RECEIVE_CLASSLIST:
    return Object.assign({}, state, {classList: action.data || []})
    case RECEIVE_WHITELIST:
    return Object.assign({}, state, {whiteList: action.data || []})
    case RECEIVE_SENSITIVEWORDSLIST:
    return Object.assign({}, state, {sensitiveWordsList: action.data || []})
    case RECEIVE_SHIELDRECORD:
    return Object.assign({}, state, {shieldRecord: action.data || []})
    case RECEIVE_REQUESTRECORD:
    return Object.assign({}, state, {requestRecord: action.data || []})
    case RECEIVE_TOGGLE_CLASSLIST:
    return toggleClass(state, action.data)
    case RECEIVE_DEL_ONE_REQUESTRECORD:
    return stateDel(state, action.data, 'requestList', 'user_record_id')//待修改
    case RECEIVE_DEL_ONE_SHIELDRECORD:
    return stateDel(state, action.data, 'shieldList', 'user_record_id')//待修改
    case RECEIVE_DEL_ALL_REQUESTRECORD:
    return Object.assign({}, state.data, {requestList: []})
    case RECEIVE_DEL_ALL_SHIELDRECORD:
    return Object.assign({}, state.data, {shieldList: []})
    case RECEIVE_ADD_SENSITIVEWORDSLIST:
    return stateAdd(state, action.data, 'sensitiveWordsList' )
    case RECEIVE_ADD_BLACKLIST:
    return stateAdd(state, action.data, 'blackList')
    case RECEIVE_ADD_WHITELIST:
    return stateAdd(state, action.data, 'whiteList')
    case RECEIVE_DEL_ONE_BLACKLIST:
    return stateDel(state, action.data.address_filtering_id, 'blackList', 'address_filtering_id', 'id')
    case RECEIVE_DEL_ONE_WHITELIST:
    return stateDel(state, action.data.address_filtering_id, 'whiteList', 'address_filtering_id', '')
    case RECEIVE_DEL_ONE_SENSITIVEWORDSLIST:
    return stateDel(state, action.data[0].keyword_id, 'sensitiveWordsList', 'id', '')
    case RECEIVE_SWITCH_STATE:
    return Object.assign({}, state,
      {switchState: state.switchState === 1 ? state.switchState = 0 : state.switchState = 1}
    )
    default: return state
  }
}
//删改数据存放
const modifyData = (state = {
  willDelBlackList: [],
  willDelWhiteList: [],
  willDelSensitiveWordsList: []
},action) => {
  switch(action.type){
    case WILL_DEL_BLACKLIST:
    return Object.assign({}, state, {willDelBlackList: action.data})
    case WILL_DEL_WHITELIST:
    return Object.assign({}, state, {willDelWhiteList: action.data})
    case WILL_DEL_SENSITIVEWORDSLIST:
    return Object.assign({}, state, {willDelSensitiveWordsList: action.data})
    default:return state
  }
}
export default combineReducers({
  visibility,
  fetchData,
  modifyData
})
