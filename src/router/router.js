import React from 'react'
import { Router, Route, browserHistory } from 'react-router'
import RecordPanel from '../components/recordPanel/recordPanel.js'
import ShieldPanel from '../components/shieldPanel/shieldPanel.js'
import ClassifyPanel from '../components/classifyPanel/classifyPanel.js'
import App from '../containers/app.js'
import Menu from '../components/menu/menu.js'
const router = (
  <Router history={browserHistory}>
    <Route path='/' component={ App }>
      <Route path='menu' component={Menu}/>
      <Route path='classifyFilter' component={ClassifyPanel}/>
      <Route path='urlFilter' component={ShieldPanel}/>
      <Route path='whiteList' component={ShieldPanel}/>
      <Route path='searchFilter' component={ShieldPanel}/>
      <Route path='recordList' component={RecordPanel}/>
    </Route>
  </Router>
)
export default router
