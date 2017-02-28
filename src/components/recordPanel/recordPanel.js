import React, { Component } from 'react'
import './recordPanel.css'
import {getBaseParams} from '../../config/config.js'
class RecordPanle extends Component {
  render() {
    return (
      <div className='record-panel'>recordpanle</div>
    )
  }
  componentWillMount() {
    getBaseParams()
  }
}
export default RecordPanle
