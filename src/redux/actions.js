import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_WHITELIST,
  RECEIVE_SENSITIVEWORDSLIST,
  RECEIVE_REQUESTLIST,
  RECEIVE_SHIELDLIST,
  RECEIVE_DELONERECORD,
  RECEIVE_DELONESHIELD,
  RECEIVE_DELALLRECORD,
  RECEIVE_ADDONESHIELD
} from './actionTypes.js'
require('isomorphic-fetch')
import {getBaseParams, baseUrl} from '../config/config.js'
export const setVisibility = function(id) {
  return {
    type: SET_VISIBILITY,
    id
  }
}
export const receiveBlackList = json => ({type: RECEIVE_BLACKLIST, json})
export const receiveWhiteList = json => ({type: RECEIVE_WHITELIST, json})
export const receiveSensitiveWordList = json => ({type: RECEIVE_SENSITIVEWORDSLIST})
export const receiveRequestList = json => ({type: RECEIVE_REQUESTLIST, json})
export const receiveShieldList = json => ({type: RECEIVE_SHIELDLIST, json})
export const receiveDelOneRecord = json => ({type: RECEIVE_DELONERECORD, json})
export const receiveDelAllRecord = json => ({type: RECEIVE_DELALLRECORD, json})
export const receiveDelOneShield = json => ({type: RECEIVE_DELONESHIELD, json})
export const receiveAddOneShield = json => ({type: RECEIVE_ADDONESHIELD, json})
//列表接口
export const fetchBlackList = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserBlacklistV2', {method: 'POST', body: JSON.stringify(getBaseParams())})
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveBlackList(json.data))
  })
}
export const fetchWhiteList = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserWhitelistV2', {method: 'POST', body: JSON.stringify(getBaseParams())})
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveWhiteList(json.data))
  })
}
export const fetchSensitiveWordsList = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserKeywordsV2', {method: 'POST', headers: {}, body: JSON.stringify(getBaseParams())})
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveSensitiveWordList(json.data))
  })
}
export const fetchRequestList = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserRequestRecord', {method: 'POST', body: JSON.stringify(getBaseParams())})
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveRequestList(json.data))
  })
}
export const fetchShildList = () => dispatch => {
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/getUserBlockRecord', {method: 'POST', body: JSON.stringify(getBaseParams())})
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveShieldList(json.data))
  })
}
//数据删改接口
export const fetchDelOneRecord = (params = {}) => dispatch =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/deleteCategoryRecord')
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveDelOneRecord(json.data))
  })
}
export const fetchDelAllRecord = (params = {}) => dispatch =>{
  dispatch(setVisibility('loading'))
  return fetch(baseUrl + '/browser/browser/clearRecord')
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility('loading'))
    return dispatch(receiveDelAllRecord(json.data))
  })
}
export const fetchDelOneShield = (params = {}) => dispatch =>{
  if(params.classify === 'system'){
    //系统关键词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserWhitelistV2')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  } else if(params.classify === 'keyWord'){
    //用户敏感词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserKeywordsV2')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  } else if(params.classify === 'url'){
    //用户网址(黑名单)
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/deleteUserBlacklistV2')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveDelOneShield(json.data))
    })
  }

}
export const fetchAddOneShield = (params = null) => dispatch => {
  if(params.classify === 'system') {
    //系统关键词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserWhitelistV3')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  } else if(params.classify === 'keyWord') {
    //用户敏感词
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserKeywordsV2')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  } else if(params.classify === 'url') {
    //用户网址(黑名单)
    dispatch(setVisibility('loading'))
    return fetch(baseUrl + '/browser/browser/addUserBlacklist')
    .then(res => res.json())
    .then(json => {
      dispatch(setVisibility('loading'))
      return dispatch(receiveAddOneShield(json.data))
    })
  }
}
