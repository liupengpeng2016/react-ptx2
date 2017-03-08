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
  RECEIVE_ADD_ONE_BLACKLIST,
  RECEIVE_ADD_ONE_SENSITIVEWORDSLIST,
  RECEIVE_ADD_ONE_WHITELIST,
  RECEIVE_SWITCH_STATE,
  DEL_BLACKLIST,
  DEL_WHITELIST,
  DEL_SENSITIVEWORDSLIST,
  ADD_BLACKLIST,
  ADD_WHITELIST,
  ADD_SENSITIVEWORDSLIST
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
    return Object.assign({}, state, {[action.id]: !state[action.id]})
    default:
    return state
  }
}

//数据删除函数
function stateDel(state, data, list, key) {
  let obj = Object.assign({}, state)
  for(let i in obj[list]){
    if(obj[list][i][key] === data){
      delete obj[list][i]
      return obj
    }
  }
}
//数据添加函数
function stateAdd(state, data, list){
  let obj = Object.assign({}, state)
  obj[list].push(data)
  return obj
}
//分类列表TOGGLE
function toggleClass(state, data) {
  let obj = Object.assign({}, state)
  for(let i = 0; i<obj.classList.length; i++){
    if(data.isSub){
      for(let k = 0; k<(obj.classList[i].subclass || 0).length; k++){
        if(obj.classList[i].subclass[k].filter_lable_id === data.filter_lable_id_list[0]){
            obj.classList[i].subclass[k].selected = !obj.classList[i].subclass[k].selected
            break
        }
      }
    }else{
      if(obj.classList[i].filter_lable_id === data.filter_lable_id_list[0]){
          obj.classList[i].selected = !obj.classList[i].selected
          break
      }
    }
  }
  return obj
}
//ajax请求数据
const fetchData = function(state = {
  blackList: [],
  classList: [],
  whiteList: [],
  sensitiveWordsList: [],
  shieldRecord: [],
  requestRecord: [],
  switchState: '1'
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
    return stateDel(state, action.data, 'requestList', 'user_record_id')
    case RECEIVE_DEL_ONE_SHIELDRECORD:
    return stateDel(state, action.data, 'shieldList', 'user_record_id')
    case RECEIVE_DEL_ALL_REQUESTRECORD:
    return Object.assign({}, state.data, {requestList: []})
    case RECEIVE_DEL_ALL_SHIELDRECORD:
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
    case RECEIVE_SWITCH_STATE:
    return Object.assign({}, state, {switchState: action.data.switchState})
    default: return state
  }
}
//删改数据存放
const modifyData = (state = {
  delBlackList: [],
  delWhiteList: [],
  delSensitiveWordsList: [],
  delShieldRecord: [],
  delRequestRecord: [],
  addBlackList: [],
  addWhiteList: [],
  addSensitiveWordsList:[]
},action) => {
  switch(action.type){
    case DEL_BLACKLIST:
    return Object.assign({}, state, {delBlackList: action.data})
    case DEL_WHITELIST:
    return Object.assign({}, state, {delWhiteList: action.data})
    case DEL_SENSITIVEWORDSLIST:
    return Object.assign({}, state, {delSensitiveWordsList: action.data})
    case ADD_BLACKLIST:
    return Object.assign({}, state, {addBlackList: action.data})
    case ADD_BLACKLIST:
    return Object.assign({}, state, {addWhiteList: action.data})
    case ADD_BLACKLIST:
    return Object.assign({}, state, {addSensitiveWordsList: action.data})
    default:return state
  }
}
export default combineReducers({
  visibility,
  fetchData,
  modifyData
})
