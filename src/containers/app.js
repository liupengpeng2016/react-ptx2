import React, { Component } from 'react'
import { connect } from 'react-redux'
import './app.css'
import InputPanel from '../components/inputPanel/inputPanel.js'
import Footer from '../components/footer/footer.js'
import Loading from '../components/loading/loading.js'
// import {
//   fetchWhiteList,
//   fetchBlackList,
//   fetchSensitiveWordsList,
//   fetchShildList,
//   fetchRequestList,
//   fetchShieldList
// } from '../redux/actions.js'
class App extends Component {
  render() {
    // const {
    //   whiteList,
    //   blackList,
    //   sensitiveWordsList,
    //   requestList,
    //   shieldList
    // } = this.props
    return (
      <div>
        { this.props.children }
        <InputPanel/>
        <Loading/>
        <Footer/>
      </div>
    )
  }
}
// function mapState(state) {
//   return {
//     whiteList: state.whiteList,
//     blackList: state.blackList,
//     sensitiveWordsList: state.sensitiveWordsList,
//     requestList: state.requestList,
//     shieldList: state.shieldList
//   }
// }
export default connect()(App)
