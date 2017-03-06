import React, { Component } from 'react'
import './classifyPanel.css'
import {connect} from 'react-redux'
import { fetchClassifyList } from '../../redux/actions.js'
class ClassifyPanel extends Component {
  render() {
    const {classify} = this.props
    return (
      <div className='classifyPanel'>
        <h1>勾选以下分类以屏蔽相关网站</h1>
        {
          classify.map((val, i) => {
            return (
              <dl key={i}>
                <dt onClick={this.toggleSubclass}>
                  {val.name}
                  <span
                  className={!val.selected ? 'checkbox-title' : 'checkbox-title checkbox-title-selected'}
                  ></span>
                </dt>
                {(val.subclass || []).map((val, i) => (
                  <dd key={i}>{val.name}<span className={!val.selected ? 'checkbox-class' : 'checkbox-class checkbox-class-selected'}></span></dd>
                ))}
              </dl>
            )
          })
      }
      </div>
    )
  }
  toggleSubclass(e){
    if(e.target.className === 'toggle-subclass'){
      e.target.className = ''
    }else{
      e.target.className = 'toggle-subclass'
    }
  }
  componentWillMount(){
    this.props.dispatch(fetchClassifyList())
  }
}

function mapState(state) {
  return{
    classify: state.fetchData.classifyList
  }
}
export default connect(mapState)(ClassifyPanel)
