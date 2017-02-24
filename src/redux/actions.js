import {
  SET_VISIBILITY,
  RECEIVE_BLACKLIST,
  RECEIVE_WHITELIST,
  RECEIVE_REQUESTLIST,
  RECEIVE_SHIELDLIST
} from './actionTypes.js'
import fetch from 'isomorphic-fetch'
import {getBaseParams, baseUrl} from '../config/config.js'
export const setVisibility= function(id) {
  return {
    type: SET_VISIBILITY,
    id
  }
}
export const receiveBlackList= json => ({type:RECEIVE_BLACKLIST, json})
export const receiveWhiteList= json => ({type:RECEIVE_WHITELIST, json})
export const receiveRequestList= json => ({type:RECEIVE_REQUESTLIST, json})
export const receiveShieldList= json => ({type:RECEIVE_SHIELDLIST, json})

function fetchData(dispatch, url, params) {
  dispatch(setVisibility('loading'))
  let data = getBaseParams()
  return fetch(baseUrl + url, {body:{data}}).then(response=>response.json())
  .then(json=>{
    dispatch(setVisibility('loading'))
    if(typeof(params) === 'string'){
      switch(params){
        case 'blackList':
        return dispatch(receiveBlackList(json))
        case 'whiteList':
        return dispatch(receiveWhiteList(json))
        case 'requestList':
        return dispatch(receiveRequestList(json))
        case 'shieldList':
        return dispatch(receiveShieldList(json))
        default: return
      }
    }else{

    }
  }).catch(function(error){
    dispatch(setVisibility('loading'))
    alert(error)
  })
}
//所有列表接口
export const fetchBlackList = () => dispatch => {
  fetchData(dispatch, '/browser/browser/getUserBlacklistV2', 'blackList')
}
export const fetchWhiteList = () => dispatch => {
  fetchData(dispatch, '/browser/browser/getUserWhitelistV2', 'whiteList')
}
export const fetchRequestList = () => dispatch => {
  fetchData(dispatch + '/browser/browser/getUserRequestRecord', 'requestList')
}
export const fetchShildList = () => dispatch => {
  fetchData(dispatch + '/browser/browser/getUserBlockRecord', 'shieldList')
}
//数据删改接口
export const fetchDelOneRecord = (params = null) => dispatch =>{
  fetchData(dispatch + '/browser/browser/deleteCategoryRecord', params)
}
export const fetchDelAllRecord = (params = null) => dispatch =>{
  fetchData(dispatch + '/browser/browser/clearRecord', params)
}
export const fetchDelOneShield = (params = null) => dispatch =>{
  if(params.classify === 'system'){
    //系统关键词
    fetchData(dispatch + '/browser/browser/deleteUserWhitelistV2', params)
  } else if(params.classify === 'keyWord'){
    //用户敏感词
    fetchData(dispatch + '/browser/browser/deleteUserKeywordsV2', params)
  } else if(params.classify === 'url'){
    //用户网址(黑名单)
    fetchData(dispatch + '/browser/browser/deleteUserBlacklistV2', params)
  }

}
export const fetchAddOneShield = (params = null) => dispatch => {
  if(params.classify === 'system') {
    //系统关键词
    fetchData(dispatch + '/browser/browser/addUserWhitelistV3', params)
  } else if(params.classify === 'keyWord') {
    //用户敏感词
    fetchData(dispatch + '/browser/browser/addUserKeywordsV2', params)
  } else if(params.classify === 'url') {
    //用户网址(黑名单)
    fetchData(dispatch + '/browser/browser/addUserBlacklist', params)
  }
}
