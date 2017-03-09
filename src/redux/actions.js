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
  RECEIVE_ADD_BLACKLIST,
  RECEIVE_ADD_SENSITIVEWORDSLIST,
  RECEIVE_ADD_WHITELIST,
  RECEIVE_DEL_ONE_BLACKLIST,
  RECEIVE_DEL_ONE_WHITELIST,
  RECEIVE_DEL_ONE_SENSITIVEWORDSLIST,

  RECEIVE_SWITCH_STATE,

  WILL_DEL_BLACKLIST,
  WILL_DEL_WHITELIST,
  WILL_DEL_SENSITIVEWORDSLIST,
  WILL_ADD_WHITELIST,
  WILL_ADD_BLACKLIST,
  WILL_ADD_SENSITIVEWORDSLIST
} from './actionTypes.js'
import fetch from 'isomorphic-fetch'
import {getBaseParams, baseUrl} from '../config/config.js'
//toggle visibility
export const setVisibility = function(data) {
  return {
    type: SET_VISIBILITY,
    data
  }
}
//存储数据到state
  //将要修改的数据
export const willDelBlackList = data => ({type: WILL_DEL_BLACKLIST, data})
export const willDelWhiteList = data => ({type: WILL_DEL_WHITELIST, data})
export const willDelSensitiveWordsList = data => ({type: WILL_DEL_SENSITIVEWORDSLIST, data})
export const willAddBlackList = data => ({type: WILL_ADD_BLACKLIST, data})
export const willAddWhiteList = data => ({type: WILL_ADD_WHITELIST, data})
export const willAddSensitiveWordsList = data => ({type: WILL_ADD_SENSITIVEWORDSLIST, data})
  //列表数据
export const receiveBlackList = data => ({type: RECEIVE_BLACKLIST, data})
export const receiveClassList = data => ({type: RECEIVE_CLASSLIST, data})
export const receiveWhiteList = data => ({type: RECEIVE_WHITELIST, data})
export const receiveSensitiveWordList = data => ({type: RECEIVE_SENSITIVEWORDSLIST, data})
export const receiveRequestList = data => ({type: RECEIVE_REQUESTLIST, data})
export const receiveShieldList = data => ({type: RECEIVE_SHIELDLIST, data})
  //正式删除的记录
export const receiveDelOneRequestRecord = data => ({type: RECEIVE_DEL_ONE_REQUESTRECORD, data})
export const receiveDelOneShieldRecord = data => ({type: RECEIVE_DEL_ONE_SHIELDRECORD, data})
export const receiveDelAllRequestRecord = data => ({type: RECEIVE_DEL_ALL_REQUESTRECORD, data})
export const receiveDelAllShieldRecord = data => ({type: RECEIVE_DEL_ALL_SHIELDRECORD, data})
  //正式删除列表项
export const receiveDelOneSensitiveWordsList = data => ({type: RECEIVE_DEL_ONE_SENSITIVEWORDSLIST, data})
export const receiveDelOneWhiteList = data => ({type: RECEIVE_DEL_ONE_WHITELIST, data})
export const receiveDelOneBlackList = data => ({type: RECEIVE_DEL_ONE_BLACKLIST, data})
export const receiveToggleClassList = data => ({type: RECEIVE_TOGGLE_CLASSLIST, data})
  //正式添加的列表项
export const receiveAddBlackList = data => ({type: RECEIVE_ADD_BLACKLIST, data})
export const receiveAddWhiteList = data => ({type: RECEIVE_ADD_WHITELIST, data})
export const receiveAddSensitiveWordsList = data => ({type: RECEIVE_ADD_SENSITIVEWORDSLIST, data})
  //请求开关状态
export const receiveSwitchState = data => ({type: RECEIVE_SWITCH_STATE})
//fetch
let headers = new Headers({'Content-Type': 'application/x-www-form-urlencoded'});
function setParams(obj) {
  return {
    method: 'POST',
    mode: 'cors',
    headers,
    body: 'data=' + JSON.stringify(Object.assign(getBaseParams(), obj))
  }
}
function fetchData(dispatch, url, params, action){
  dispatch(setVisibility({loading: true}))
  return fetch(baseUrl + url, setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility({loading: false}))
    return dispatch(action(json.data))
  }).catch(error => console.log(error))
}
//获取列表接口
export const fetchClassifyList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getFilterLable', params, receiveClassList)
export const fetchBlackList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserBlacklistV2', params, receiveBlackList)
export const fetchWhiteList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserWhitelistV2', params, receiveWhiteList)
export const fetchSensitiveWordsList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserKeywordsV2', params, receiveSensitiveWordList)
export const fetchRequestList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserRequestRecord', params, receiveRequestList)
export const fetchShildList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserBlockRecord', params, receiveShieldList)

//解除屏蔽
export const fetchDelOneBlackList = params => dispatch => {
  fetchData(dispatch, '/browser/browser/deleteUserBlacklistV2', params, receiveDelOneBlackList)
}
export const fetchDelOneWhiteList = params => dispatch => {
  fetchData(dispatch, '/browser/browser/deleteUserWhitelistV2', params, receiveDelOneWhiteList)
}
export const fetchDelOneSensitiveWordsList = params => dispatch => {
  fetchData(dispatch, '/browser/browser/deleteUserKeywordsV2', params, receiveDelOneSensitiveWordsList)
}
//添加屏蔽
export const fetchAddBlackList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/addUserBlacklist', params, receiveAddBlackList)
export const fetchAddWhiteList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/addUserWhitelistV3', params, receiveAddWhiteList)
export const fetchAddSensitiveWordsList = params => dispatch =>
  fetchData(dispatch, '/browser/browser/addUserKeywordsV2', params, receiveAddSensitiveWordsList)
//分类过滤开关
export const openClassFilter = params => dispatch =>
  fetchData(dispatch, '/browser/browser/onFilterLable', params, receiveToggleClassList)
export const closeClassFilter = params => dispatch =>
  fetchData(dispatch, '/browser/browser/offFilterLable', params, receiveToggleClassList)
//屏蔽请求状态
export const fetchSwitchState = () => dispatch =>
  fetchData(dispatch, '/browser/browser/getUserChildAccessH5', {}, receiveSwitchState)
//屏蔽请求开关
export const fetchToggleSwitch = params => dispatch =>
  fetchData(dispatch, '/browser/browser/controlUserChildAccess', params, receiveSwitchState)
//清除单个记录
export const fetchDelOneRequestRecord = params => dispatch =>
  fetchData(dispatch, '', params,receiveDelOneRequestRecord)
export const fetchDelOneShieldRecord = params => dispatch =>
  fetchData(dispatch, '', params,receiveDelOneShieldRecord)
//清除所有记录
export const delAllRecord = params => dispatch =>{
  dispatch(setVisibility({loading: true}))
  return fetch(baseUrl + '/browser/browser/clearRecord', setParams(params))
  .then(res => res.json())
  .then(json => {
    dispatch(setVisibility({loading: false}))
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
