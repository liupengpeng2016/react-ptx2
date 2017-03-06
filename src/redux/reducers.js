import { combineReducers } from 'redux'
import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_CLASSIFYLIST,
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
  RECEIVE_ADD_ONE_BLACKLIST,
  RECEIVE_ADD_ONE_SENSITIVEWORDSLIST,
  RECEIVE_ADD_ONE_WHITELIST
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
// function stateDel (state, delData, list, key) {
//   const newList = state[list].filter(function(val, i){
//     if(delData instanceof Array){
//       for(let i = 0, i<delData.length; i++){
//         if(val[key] === delData[key])
//         delete delData[key]
//         return false
//       }
//       return true
//     }else{
//       return val[key] !== delData[key]
//     }
//   })
//   const newState = Object.assign({}, state)
//   newState[list] = newList
//   return newState
// }
// function stateAdd (state, delData, list){
//
// }
//数据删除函数
function stateDel(state, data, list, key) {
  var obj = Object.assign({}, state)
  for(let i in obj[list]){
    if(obj[list][i][key] === data){
      delete obj[list][i]
      return obj
    }
  }
}
//数据添加函数
function stateAdd(state, data, list){
  var obj = Object.assign({}, state)
  obj[list].push(data)
  return obj
}
//分类列表TOGGLE
 function toggleClass(state, idList, isSub) {
   let obj = Object.assign({}, state)
   let classList = !isSub ? obj.classList : obj.classList.subclass
   idList.forEach((val, i) => {
     for(let k = 0; k<classList.length; k++){
        if(classList.filter_label_id === val){
          classList[k].selected = !classList[k].selected
          break
        }
     }
   })
 }
const fetchData = function(state = {
  blackList: [],
  classList: [],
  whiteList: [],
  sensitiveWordsList: [],
  shieldRecord: [],
  requestRecord: []
}, action) {
  switch(action.type){
    case RECEIVE_BLACKLIST:
    return Object.assign({}, state, {blackList: action.json || []})
    case RECEIVE_CLASSLIST:
    return Object.assign({}, state, {classList: action.json || []})
    case RECEIVE_WHITELIST:
    return Object.assign({}, state, {whiteList: action.json || []})
    case RECEIVE_SENSITIVEWORDSLIST:
    return Object.assign({}, state, {sensitiveWordsList: action.json || []})
    case RECEIVE_SHIELDRECORD:
    return Object.assign({}, state, {shieldRecord: action.json || []})
    case RECEIVE_REQUESTRECORD:
    return Object.assign({}, state, {requestRecord: action.json || []})
    case RECEIVE_TOGGLE_CLASSLIST:
    return toggleClass(state, action.json, false)
    case REVEIVE_DEL_ONE_REQUESTLIST:
    return stateDel(state, action.data, 'requestList', 'user_record_id')
    case RECEIVE_DEL_ONE_SHIELDLIST:
    return stateDel(state, action.data, 'shieldList', 'user_record_id')
    case RECEIVE_DEL_ALL_REQUESTLIST:
    return Object.assign({}, state.data, {requestList: []})
    case RECEIVE_DEL_ALL_SHIELDLIST:
    return Object.assign({}, state.data, {shieldList: []})
    case RECEIVE_ADD_ONE_SENSITIVEWORDSLIST:
    return stateAdd(state, action.data, 'sensitiveWordsList' )
    case RECEIVE_ADD_ONE_BLACKLIST:
    return stateAdd(state, action.data, 'blackList')
    case RECEIVE_ADD_ONE_WHITELIST:
    return stateAdd(state, action.data, 'whiteList')
    case RECEIVE_DEL_ONE_BLACKLIST:
    return stateDel(state, action.data, 'blacklist', 'address_filtering_id')
    case RECEIVE_DEL_ONE_WHITELIST:
    return stateDel(state, action.data, 'whiteList', 'address_filtering_id')
    case RECEIVE_DEL_ONE_SENSITIVEWORDSLIST:
    return stateDel(state, action.data, 'sensitiveWordsList', 'keyword')
    default: return state
  }
}
export default combineReducers({
  visibility,
  fetchData
})
