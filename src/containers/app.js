import React, { Component } from 'react'
import { connect } from 'react-redux'
import './app.css'
import InputPanel from '../components/inputPanel/inputPanel.js'
import Footer from '../components/footer/footer.js'
import Loading from '../components/loading/loading.js'
class App extends Component {
  render() {
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
export default connect()(App)
