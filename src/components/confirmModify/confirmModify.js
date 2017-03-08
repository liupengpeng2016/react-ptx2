import React, {Component} from 'react'
import {connect} from 'react-redux'
import './confirmModify.css'
import {
  fetchDelOneBlackList,
  fetchDelOneWhiteList,
  fetchDelOneSensitiveWordsList,
  setVisibility
} from '../../redux/actions.js'
class ConfirmModify extends Component{
  render(){
    const hide = {
      display: 'none'
    }
    let id;
    const {dispatch} = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      id = this.props.delBlackList
    }else if(/\/whiteList/.test(loc)){
      id = this.props.delWhiteList
    }else if(/\/searchFilter/.test(loc)){
      id = this.props.delSensitiveWordsList
    }
    return (
      <dl className='confirm-modify' style={this.props.visibility ? {} : hide}>
        <dt>确定要删除吗？</dt>
        <dd onClick={this.confirm.bind(this, id)}>确认</dd>
        <dd onClick={this.cancel.bind(this, id)}>取消</dd>
      </dl>
    )
  }
  confirm(id){
    const {dispatch} = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      dispatch(fetchDelOneBlackList({id}))
    }else if(/\/whiteList/.test(loc)){
      dispatch(fetchDelOneWhiteList({id}))
    }else if(/\/searchFilter/.test(loc)){
      dispatch(fetchDelOneSensitiveWordsList({id}))
    }
  }
  cancel(){
    this.props.dispatch(setVisibility('confirmModify'))
  }
}

export default connect()(ConfirmModify)
