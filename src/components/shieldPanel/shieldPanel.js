import React, { Component } from 'react'
import './shieldPanel.css'
import { connect } from 'react-redux'
import {
  fetchBlackList,
  fetchWhiteList,
  fetchSensitiveWordsList
} from '../../redux/actions.js'
class ShieldPanel extends Component {
  render () {
    const { data } = this.props
    return (
      <ul className='data-panel'>
        {data.map((val) => (<li>{val.address}</li>))}
      </ul>
    )
  }
  componentWillMount() {
    const {dispatch} = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      dispatch(fetchBlackList())
    }else if(/\/whiteList/.test(loc)){
      dispatch(fetchWhiteList())
    }else if(/\/sensitiveWordsList/.test(loc)){
      dispatch(fetchSensitiveWordsList())
    }
  }
}
function mapToState(state) {
  const loc = location.href
  if(/\/urlFilter/.test(loc)){
    return {data: state.fetchData.blackList}
  }else if(/\/whiteList/.test(loc)){
    return {data: state.fetchData.whiteList}
  }else if(/\/sensitiveWordsList/.test(loc)){
    return {data: state.fetchData.sensitiveWordsList}
  }
}
export default connect(mapToState)(ShieldPanel)
