import React, { Component } from 'react'
import './classifyPanel.css'
import {connect} from 'react-redux'
import { fetchClassifyList } from '../../redux/actions.js'
import {
  openClassFilter,
  closeClassFilter
} from '../../redux/actions.js'
class ClassifyPanel extends Component {
  render() {
    const {classify} = this.props
    return (
      <div className='classifyPanel'>
        <h1>勾选以下分类以屏蔽相关网站</h1>
          {
            classify.map((val, i) => {
              return (
                <dl key={i}
                  onClick={this.toggleSubClass}
                  >
                  <dt>
                    {val.name}
                    <span
                    className={!val.selected ? 'checkbox-title' : 'checkbox-title checkbox-title-selected'}
                    onClick={this.handleClick.bind(this,val.filter_lable_id, val.selected, false)}
                    >
                    </span>
                  </dt>
                  {(val.subclass || []).map((val, i) => (
                    <dd key={i} className='subclass'>{val.name}
                      <span
                       className={!val.selected ? 'checkbox-class' : 'checkbox-class checkbox-class-selected'}
                       onClick={this.handleClick.bind(this, val.filter_lable_id, val.selected, true)}
                       >
                      </span>
                    </dd>
                  ))}
                </dl>
              )
            })
          }
      </div>
    )
  }
  // shouldComponentUpdate(){
  //   console.log('should')
  //   return true
  // }
  // componentWillReceiveProps(){
  //   console.log('receive')
  // }
  toggleSubClass(e){
    if(e.target.className === 'toggle-subclass'){
      e.target.className = ''
    }else{
      e.target.className = 'toggle-subclass'
    }
  }
  handleClick(id, selected, isSub, e) {
    e.stopPropagation()
    if(selected){
      this.props.dispatch(closeClassFilter({filter_lable_id_list: [id], isSub}))
    }else{
      this.props.dispatch(openClassFilter({filter_lable_id_list: [id], isSub}))
    }
  }
  componentWillMount(){
    let {dispatch, classify} = this.props
    if(classify.length === 0){
      dispatch(fetchClassifyList())
    }
  }
}

function mapState(state) {
  return{
    classify: state.fetchData.classList,
  }
}
export default connect(mapState,null,null,{pure:false})(ClassifyPanel)
