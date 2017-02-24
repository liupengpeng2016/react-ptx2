import React, { Component } from 'react'
import './shieldPanel.css'
import { connect } from 'react-redux'
import {
  fetchBlackList
} from '../../redux/actions.js'
class ShieldPanel extends Component {
  render () {
    const { data } = this.props
    return (
      <div className='data-panel'>
        {JSON.stringify(data)}
      </div>
    )
  }
  componentWillMount() {
    const {dispatch} = this.props
    dispatch(fetchBlackList())
  }
}
function mapToState(state) {
  return {
    data: state.fetchData.blackList
  }
}
export default connect(mapToState)(ShieldPanel)
