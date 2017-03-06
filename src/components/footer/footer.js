import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setVisibility } from '../../redux/actions.js'
import addIcon from './images/icon_20_49@3x.png'
import './footer.css'
class Footer extends Component {
  render() {
    return (
      <div className='footer' onClick={this.handleClick.bind(this)}><img src={addIcon} alt=''/><span>添加</span></div>
    )
  }
  handleClick() {
    this.props.dispatch(setVisibility('inputPanel'))
  }
}
export default connect()(Footer)
