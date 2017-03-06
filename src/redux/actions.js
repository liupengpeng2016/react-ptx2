import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_CLASSLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SENSITIVEWORDSLIST,
  RECEIVE_REQUESTLIST,
  RECEIVE_SHIELDLIST,
  RECEIVE_DEL_ONE_WHITELIST,
  RECEIVE_DEL_ONE_BLACKLIST,
  RECEIVE_DEL_ONE_SENSITIVEWORDSLIST,
  RECEIVE_DEL_ONE_SHIELDRECORD,
  RECEIVE_DEL_ONE_REQUESTRECORD,
  RECEIVE_DEL_ALL_SHIELDRECORD,
  RECEIVE_DEL_ALL_REQUESTRECORD,
  RECEIVE_TOGGLE_CLASSLIST
} from './actionTypes.js'
import fetch from 'isomorphic-fetch'
import {getBaseParams, baseUrl} from '../config/config.js'

export const setVisibility = function(id) {
  return {
    type: SET_VISIBILITY,
    id
  }
}
export const receiveBlackList = json => ({type: RECEIVE_BLACKLIST, data})
export const receiveClassifyList = json => ({type: RECEIVE_CLASSLIST, data})
export const receiveWhiteList = json => ({type: RECEIVE_WHITELIST, data})
export const receiveSensitiveWordList = json => ({type: RECEIVE_SENSITIVEWORDSLIST, data})
export const receiveRequestList = json => ({type: RECEIVE_REQUESTLIST, data})
export const receiveShieldList = json => ({type: RECEIVE_SHIELDLIST, data})
export const receiveDelOneRecordList = json => ({type: RECEIVE_DEL_ONE_RECORDLIST, data})
export const receiveDelOneShieldList = json => ({type: RECEIVE_DEL_ONE_SHIELDLIST, data})
export const receiveDelAllRequestList = json => ({type: RECEIVE_DEL_ALL_REQUESTLIST, data})
export const receiveDelAllShieldList = json => ({type: RECEIVE_DEL_ALL_SHIELDLIST, data})
export const receiveAddOneShieldList = json => ({type: RECEIVE_ADD_ONE_SHIELDLIST, data})
export const receiveAddOneWhiteList = json => ({type: RECEIVE_ADD_ONE_WHITELIST, data})
export const receiveAddOneShieldList = json => ({type: RECEIVE_ADD_ONE_BLACKLIST, data})
export const receiveToggleClassList = json => ({type: RECEIVE_TOGGLE_CLASSLIST, data})
//异步action
let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
function setParams(obj) {
  return Object.assign({
    method: 'POST',
    mode: 'cors',
    headers,
    body: 'data=' + JSON.stringify(getBaseParams())
  }, obj)
}
export const fetchClassifyList = params => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getFilterLable', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveClassifyList(json.data))
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
//数据删改接口
export const fetchDelOneRecord = params => dispatch =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/deleteCategoryRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveDelOneRecord(json.data))
  })
}
export const fetchDelAllRecord = params => dispatch =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/clearRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveDelAllRecord(json.data))
  })
}
export const fetchDelOneShield = params => dispatch =>{
  if(params.classify === 'system'){
    //系统关键词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserWhitelistV2', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  } else if(params.classify === 'keyWord'){
    //用户敏感词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserKeywordsV2', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  } else if(params.classify === 'url'){
    //用户网址(黑名单)
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserBlacklistV2', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  }

}
export const fetchAddOneShield = params => dispatch => {
  if(params.classify === 'system') {
    //系统关键词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserWhitelistV3', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  } else if(params.classify === 'keyWord') {
    //用户敏感词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserKeywordsV2', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  } else if(params.classify === 'url') {
    //用户网址(黑名单)
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserBlacklist', setParams(params))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  }
}
//分类过滤开关接口
export const openClassFilter = params => {
  return dispatch => {
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/onFilterLable', setParams({params}))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(toggleClassList(json.data))
    })
  }
}
export const closeClassFilter = params => {
  return dispatch => {
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/offFilterLable', setParams({params}))
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveToggleClassList(json.data))
    })
  }
}
