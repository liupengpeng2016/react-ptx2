import React, { Component } from 'react'
import { connect } from 'react-redux'
import icon from './images/ani_pageloading_logo@3x.png'
import rotate from './images/ani_pageloading_rotation@3x.png'
import './loading.css'
class Loading extends Component {
  render() {
    const { visibility } = this.props;
    return (
      <div className={visibility? 'loading': 'loading hide'}>
        <img src={ icon } alt='error'/>
        <img src={ rotate } alt='error'/>
      </div>
    )
  }
}
const mapState = function (state) {
  return{
    visibility: state.visibility.loading
  }
}
export default connect(mapState)(Loading)
