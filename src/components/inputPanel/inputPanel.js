import React, { Component } from 'react'
import { connect } from 'react-redux'
import "./inputPanel.css"
class InputPanel extends Component {
  render() {
    const { visibility } = this.props
    return (
      <textarea className={visibility? 'operate-panel': 'operate-panel hide'} placeholder='用户输入区'></textarea>
    )
  }
}
const mapState= function (state) {
  return {
    visibility: state.visibility.inputPanel
  }
}
export default connect(mapState)(InputPanel)
