import React, { Component } from 'react'
import './requestSwitch.css'
class RequestSwitch extends Component{
  render() {
    return (
      <ul className='switch'>
        <li>
          <p>允许请求解锁</p>
          <div>
            <p onClick={this.handleClick.bind(this)}></p>
          </div>
        </li>
        <li>开启时，孩子可以在被屏蔽后向家长发出解锁屏蔽的请求</li>
      </ul>
    )
  }
  handleClick(e) {
    if(e.target.id === ''){
      e.target.id = 'button-switch'
      e.target.offsetParent.id ='button-bg-switch'
    }else{
      e.target.id = ''
      e.target.offsetParent.id = ''
    }

  }
}
export default RequestSwitch
