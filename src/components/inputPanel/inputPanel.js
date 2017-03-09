import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./inputPanel.css"
import {
  setVisibility,
  fetchAddBlackList,
  fetchAddSensitiveWordsList
} from '../../redux/actions.js'
function parseInput(val){
  return val.split(/\s+/)
}
class InputPanel extends Component {
  render() {
    const { visibility } = this.props
    return (
      <div className={visibility? 'operate-panel': 'operate-panel hide'}>
        <p>
          <span onClick={this.handleCancel.bind(this)}>取消</span>
          <span>kkkkk</span>
          <span onClick={this.handleSure.bind(this)}>添加</span>
        </p>
        <textarea id='input' placeholder={this.notice}></textarea>
      </div>
    )
  }
  handleCancel(){
    this.props.dispatch(setVisibility({inputPanel:false}))
  }
  handleSure () {
    const {dispatch} = this.props
    const inputDom = document.querySelector('#input')
    const val = inputDom.value
    const loc = location.href
    inputDom.value = ''
    dispatch(setVisibility({inputPanel: false}))
    if(/\/urlFilter/.test(loc)){
      dispatch(fetchAddBlackList({url: parseInput(val)}))
    }else if(/\/searchFilte/.test(loc)){
      dispatch(fetchAddSensitiveWordsList({keywords: parseInput(val)}))
    }
  }
}
const mapState= function (state, notice) {
  return {
    notice,
    visibility: state.visibility.inputPanel
  }
}
export default connect(mapState)(InputPanel)
