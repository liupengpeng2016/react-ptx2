import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_CLASSLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SENSITIVEWORDSLIST,
  RECEIVE_REQUESTLIST,
  RECEIVE_SHIELDLIST,

  RECEIVE_DEL_ONE_SHIELDRECORD,
  RECEIVE_DEL_ONE_REQUESTRECORD,
  RECEIVE_DEL_ALL_SHIELDRECORD,
  RECEIVE_DEL_ALL_REQUESTRECORD,

  RECEIVE_TOGGLE_CLASSLIST,
  RECEIVE_ADD_ONE_BLACKLIST,
  RECEIVE_ADD_ONE_SENSITIVEWORDSLIST,
  RECEIVE_ADD_ONE_WHITELIST,
  RECEIVE_DEL_ONE_BLACKLIST,
  RECEIVE_DEL_ONE_WHITELIST,
  RECEIVE_DEL_ONE_SENSITIVEWORDSLIST,

  RECEIVE_SWITCH_STATE,

  DEL_BLACKLIST,
  DEL_WHITELIST,
  DEL_SENSITIVEWORDSLIST,
  ADD_WHITELIST,
  ADD_BLACKLIST,
  ADD_SENSITIVEWORDSLIST
} from './actionTypes.js'
import fetch from 'isomorphic-fetch'
import {getBaseParams, baseUrl} from '../config/config.js'
//toggle visibility
export const setVisibility = function(id) {
  return {
    type: SET_VISIBILITY,
    id
  }
}
//存储数据到state
export const delBlackList = data => ({type: DEL_BLACKLIST, data})
export const delWhiteList = data => ({type: DEL_WHITELIST, data})
export const delSensitiveWordsList = data => ({type: DEL_SENSITIVEWORDSLIST, data})
export const addBlackList = data => ({type: ADD_BLACKLIST, data})
export const addWhiteList = data => ({type: ADD_WHITELIST, data})
export const addSensitiveWordsList = data => ({type: ADD_SENSITIVEWORDSLIST, data})

export const receiveBlackList = data => ({type: RECEIVE_BLACKLIST, data})
export const receiveClassList = data => ({type: RECEIVE_CLASSLIST, data})
export const receiveWhiteList = data => ({type: RECEIVE_WHITELIST, data})
export const receiveSensitiveWordList = data => ({type: RECEIVE_SENSITIVEWORDSLIST, data})
export const receiveRequestList = data => ({type: RECEIVE_REQUESTLIST, data})
export const receiveShieldList = data => ({type: RECEIVE_SHIELDLIST, data})

export const receiveDelOneRequestRecord = data => ({type: RECEIVE_DEL_ONE_REQUESTRECORD, data})
export const receiveDelOneShieldRecord = data => ({type: RECEIVE_DEL_ONE_SHIELDRECORD, data})
export const receiveDelAllRequestRecord = data => ({type: RECEIVE_DEL_ALL_REQUESTRECORD, data})
export const receiveDelAllShieldRecord = data => ({type: RECEIVE_DEL_ALL_SHIELDRECORD, data})

export const receiveAddOneSensitiveWordsList = data => ({type: RECEIVE_ADD_ONE_SENSITIVEWORDSLIST, data})
export const receiveAddOneWhiteList = data => ({type: RECEIVE_ADD_ONE_WHITELIST, data})
export const receiveAddOneBlackList = data => ({type: RECEIVE_ADD_ONE_BLACKLIST, data})
export const receiveDelOneSensitiveWordsList = data => ({type: RECEIVE_DEL_ONE_SENSITIVEWORDSLIST, data})
export const receiveDelOneWhiteList = data => ({type: RECEIVE_DEL_ONE_WHITELIST, data})
export const receiveDelOneBlackList = data => ({type: RECEIVE_DEL_ONE_BLACKLIST, data})
export const receiveToggleClassList = data => ({type: RECEIVE_TOGGLE_CLASSLIST, data})

export const receiveSwitchState = data => ({type: RECEIVE_SWITCH_STATE, data})

//获取列表接口
let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
function setParams(obj) {
  return {
    method: 'POST',
    mode: 'cors',
    headers,
    body: 'data=' + JSON.stringify(Object.assign(getBaseParams(),obj))
  }
}
export const fetchClassifyList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getFilterLable', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveClassList(json.data))
  })
}
export const fetchBlackList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserBlacklistV2', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveBlackList(json.data))
  })
}
export const fetchWhiteList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserWhitelistV2', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveWhiteList(json.data))
  })
}
export const fetchSensitiveWordsList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserKeywordsV2', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveSensitiveWordList(json.data))
  })
}
export const fetchRequestList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserRequestRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveRequestList(json.data))
  })
}
export const fetchShildList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserBlockRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveShieldList(json.data))
  })
}

//删除屏蔽内容接口
 const delShieldList = (dispatch, url, params, action ) =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + url, setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(action(json.data))
  })
}
export const fetchDelOneBlackList = params => dispatch => {
  delShieldList(dispatch, '/browser/browser/deleteUserBlacklistV2', {address_filtering_id: params.id}, receiveDelOneBlackList)
}
export const fetchDelOneWhiteList = params => dispatch => {
  delShieldList(dispatch, '/browser/browser/deleteUserWhitelistV2', {address_filtering_id: params.id}, receiveDelOneWhiteList)
}
export const fetchDelOneSensitiveWordsList = params => dispatch => {
  delShieldList(dispatch, '/browser/browser/deleteUserKeywordsV2', {keyword_ids: params.id}, receiveDelOneSensitiveWordsList)
}

//删除记录接口
function delOneRecord(dispatch, params) {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/deleteCategoryRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    // dispatch(setVisibility('loading'))
    // if(params.type === 'REQUEST_LIST')
    // switch(params.type){
    //   case 'REQUEST_RECORD':
    //   return dispatch(receiveDelOneRequestRecord(json.data))
    //   case 'BLACK_RECORD':
    //   return dispatch(receiveDelOneBlackList(json.data))
    //   case 'WHITELIST_RECORD':
    //   return dispatch(receiveDelOneWhiteList(json.data))
    //   default: return
    // }
  })
}
export const fetchDelOneRequestRecord = params => dispatch => delOneRecord(dispatch, params)
export const fetchDelOneShieldRecord = params => dispatch => delOneRecord(dispatch, params)

export const delAllRecord = params => dispatch =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/clearRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    switch(params.type){
      case 'REQUEST_RECORD':
      return dispatch(receiveDelAllRequestRecord())
      case 'BLACK_RECORD':
      case 'WHITELIST_RECORD':
      return dispatch(receiveDelAllShieldRecord())
      default: return
    }
  })
}
//分类过滤开关接口
export const openClassFilter = params => {
  return dispatch => {
    let {filter_lable_id_list} = params
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/onFilterLable', setParams({filter_lable_id_list}))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveToggleClassList(params))
    })
  }
}
export const closeClassFilter = params => {
  return dispatch => {
    let {filter_lable_id_list} = params
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/offFilterLable', setParams({filter_lable_id_list}))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveToggleClassList(params))
    })
  }
}
//屏蔽请求开关
export const fetchToggleSwitch = (params) => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/controlUserChildAccess', setParams({type: params.switchState}))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveSwitchState(params))
  })
}
//屏蔽请求状态
export const fetchSwitchState = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserChildAccessH5', setParams())
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveSwitchState({switchState: json.data.control_type}))
  })
}
