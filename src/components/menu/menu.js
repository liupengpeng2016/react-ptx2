import React, { Component } from 'react'
import { Link } from 'react-router'
import './menu.css'
import RequestSwitch from '../requestSwitch/requestSwitch.js'
class Menu extends Component {
  render() {
    return (
      <div>
        <ul className="browser-menu">
          <li><Link to='/classifyFilter'>分类过滤</Link></li>
          <li><Link to='/searchFilter'>搜索过滤</Link></li>
          <li><Link to='/urlFilter'>网址过滤</Link></li>
          <li><Link to='/whiteList'>白名单</Link></li>
        </ul>
        <RequestSwitch/>
      </div>
    )
  }

}
export default Menu
