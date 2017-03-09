import React, { Component } from 'react'
import './shieldPanel.css'
import { connect } from 'react-redux'
import emptyDataImg from './images/img_page_empty@3x.png'
import {
  fetchBlackList,
  fetchWhiteList,
  fetchSensitiveWordsList,
  willDelWhiteList,
  willDelBlackList,
  willDelSensitiveWordsList,
  setVisibility
} from '../../redux/actions.js'
class ShieldPanel extends Component {
  render () {
    const { data, emptyDataTip } = this.props
    return (
      <div className='data-panel'>
        <ul>
          {
            data.map((val,i) => (
              <li key={i}>{val.keyword || val.keywords || val.url_address || val.url}
                <span className='shield-control'
                  onClick={this.handleClick.bind(this, val.id || val.address_filtering_id)}
                ></span>
              </li>
            ))
          }
        </ul>
        <div className={!data.length ? 'empty-data-tip' : 'empty-data-tip empty-data-tip-hide'}>
          <img src={emptyDataImg} alt=''/>
          {
            emptyDataTip.map((val,i) => {
              return <p key={i}>{val}</p>
            })
          }
        </div>
      </div>
    )
  }
  handleClick(id){
    const {
      dispatch
    } = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      dispatch(willDelBlackList(id))
    }else if(/\/whiteList/.test(id)){
      dispatch(willDelWhiteList(id))
    }else if(/\/searchFilte/.test(loc)){
      dispatch(willDelSensitiveWordsList(id))
    }
    this.props.dispatch(setVisibility({confirmModify: true}))
  }
  componentWillMount() {
    const {dispatch} = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      dispatch(fetchBlackList())
    }else if(/\/whiteList/.test(loc)){
      dispatch(fetchWhiteList())
    }else if(/\/searchFilter/.test(loc)){
      dispatch(fetchSensitiveWordsList())
    }
  }

}

function mapToState(state) {
  const loc = location.href
  if(/\/urlFilter/.test(loc)){
    return {
      data: state.fetchData.blackList,
      emptyDataTip: ['未设置自定义过滤网站，点击下方按钮添加', '例如：www.baidu.com']
    }
  }else if(/\/whiteList/.test(loc)){
    return {
      data: state.fetchData.whiteList,
      emptyDataTip: ['葡萄可能会屏蔽你认为无害的信息', '白名单允许你的孩子访问这些信息，避免误屏蔽']
    }
  }else if(/\/searchFilter/.test(loc)){
    return {
      data: state.fetchData.sensitiveWordsList,
      emptyDataTip: ['未设置自定义过滤关键词，点击下方按钮添加', '例如：一夜情']
    }
  }
}
export default connect(mapToState)(ShieldPanel)
