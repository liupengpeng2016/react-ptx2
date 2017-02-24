import React, { Component } from 'react'
import { Link } from 'react-router'
import './menu.css'
class Menu extends Component {
  render() {
    return (
      <ul className="browser-menu">
        <li><Link to='/classifyFilter'>分类过滤</Link></li>
        <li><Link to='/searchFilter'>搜索过滤</Link></li>
        <li><Link to='/urlFilter'>网址过滤</Link></li>
        <li><Link to='/whiteList'>白名单</Link></li>
      </ul>
    )
  }
}
export default Menu
