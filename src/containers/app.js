import React, { Component } from 'react'
import { connect } from 'react-redux'
import './app.css'
import InputPanel from '../components/inputPanel/inputPanel.js'
import Footer from '../components/footer/footer.js'
import Loading from '../components/loading/loading.js'
import ConfirmModify from '../components/confirmModify/confirmModify.js'
class App extends Component {
  render() {
    const {visibility, delBlackList, delWhiteList, delSensitiveWordsList} = this.props
    return (
      <div>
        { this.props.children }
        <ConfirmModify
          visibility={visibility.confirmModify}
          delBlackList={delBlackList}
          delWhiteList={delWhiteList}
          delSensitiveWordsList={delSensitiveWordsList}
          />
        <InputPanel/>
        <Loading/>
        <Footer/>
      </div>
    )
  }
}
function mapToState(state){
  return {
    visibility: state.visibility,
    delBlackList: state.modifyData.delBlackList,
    delWhiteList: state.modifyData.delWhiteList,
    delSensitiveWordsList: state.modifyData.delSensitiveWordsList
  }
}
export default connect(mapToState)(App)
