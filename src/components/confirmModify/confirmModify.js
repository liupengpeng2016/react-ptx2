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
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      id = this.props.willDelBlackList
    }else if(/\/whiteList/.test(loc)){
      id = this.props.willDelWhiteList
    }else if(/\/searchFilter/.test(loc)){
      id = this.props.willDelSensitiveWordsList
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
      dispatch(fetchDelOneBlackList({address_filtering_id: id}))
    }else if(/\/whiteList/.test(loc)){
      dispatch(fetchDelOneWhiteList({address_filtering_id: id}))
    }else if(/\/searchFilter/.test(loc)){
      dispatch(fetchDelOneSensitiveWordsList({keyword_ids: [id]}))
    }
    this.props.dispatch(setVisibility({confirmModify: false}))
  }
  cancel(){
    this.props.dispatch(setVisibility({confirmModify: false}))
  }
}
function mapToState(state){
  return {
    willDelBlackList: state.modifyData.willDelBlackList,
    willDelWhiteList: state.modifyData.willDelWhiteList,
    willDelSensitiveWordsList: state.modifyData.willDelSensitiveWordsList
  }
}
export default connect(mapToState)(ConfirmModify)
