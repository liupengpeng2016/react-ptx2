import React, { Component } from 'react'
import './requestSwitch.css'
import { connect } from 'react-redux'
import {
  fetchSwitchState,
  fetchToggleSwitch
} from '../../redux/actions.js'
class RequestSwitch extends Component{
  render() {
    const {switchState} = this.props
    return (
      <ul className='switch'>
        <li>
          <p>允许请求解锁</p>
          <div id={switchState === 1 ? 'button-bg-switch' : ''}>
            <p id={switchState === 1 ? 'button-switch' : ''} onClick={this.handleClick.bind(this, switchState)}></p>
          </div>
        </li>
        <li>开启时，孩子可以在被屏蔽后向家长发出解锁屏蔽的请求</li>
      </ul>
    )
  }
  handleClick(state) {
    this.props.dispatch(fetchToggleSwitch({type: state === 1 ? 0 : 1}))
  }
  componentWillMount() {
    if(!this.props.switchState){
      this.props.dispatch(fetchSwitchState())
    }
  }
}
function mapToState(state){
  return {
    switchState: state.fetchData.switchState
  }
}
export default connect(mapToState)(RequestSwitch)
