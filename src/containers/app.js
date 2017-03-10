import React, { Component } from 'react'
import { connect } from 'react-redux'
import './app.css'
import InputPanel from '../components/inputPanel/inputPanel.js'
import Footer from '../components/footer/footer.js'
import Loading from '../components/loading/loading.js'
import ConfirmModify from '../components/confirmModify/confirmModify.js'
import {getBaseParams} from '../config/config.js'

class App extends Component {
  render() {
    const {visibility, willDelBlackList, willDelWhiteList, willDelSensitiveWordsList} = this.props
    return (
      <div>
        { this.props.children }
        <ConfirmModify
          visibility={visibility.confirmModify}
          willDelBlackList={willDelBlackList}
          willDelWhiteList={willDelWhiteList}
          willDelSensitiveWordsList={willDelSensitiveWordsList}
          />
        <InputPanel notice={111}/>
        <Loading/>
        <Footer/>
      </div>
    )
  }
  componentWillMount() {
    getBaseParams()
  }
}
function mapToState(state){
  return {
    visibility: state.visibility,
    willDelBlackList: state.modifyData.willDelBlackList,
    willDelWhiteList: state.modifyData.willDelWhiteList,
    willDelSensitiveWordsList: state.modifyData.willDelSensitiveWordsList
  }
}
export default connect(mapToState)(App)
