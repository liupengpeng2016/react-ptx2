import React, { Component } from 'react'
import './shieldPanel.css'
import { connect } from 'react-redux'
import emptyDataImg from './images/img_page_empty@3x.png'
import {
  fetchBlackList,
  fetchWhiteList,
  fetchSensitiveWordsList,
  delWhiteList,
  delBlackList,
  delSensitiveWordsList,
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
              <li key={i}>{val.keyword || val.keywords || val.url_address}
                <span className='shield_control'
                  onClick={this.handleClick.bind(this)}
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
  handleClick(){
    const {
      dispatch,
      willDelBlackList,
      willDelWhiteList,
      willDelSensitiveWordsList
    } = this.props
    const loc = location.href
    if(/\/urlFilter/.test(loc)){
      dispatch(delBlackList(willDelBlackList))
    }else if(/\/whiteList/.test(loc)){
      dispatch(delWhiteList(willDelWhiteList))
    }else if(/\/searchFilte/.test(loc)){
      dispatch(delSensitiveWordsList(willDelSensitiveWordsList))
    }
    this.props.dispatch(setVisibility('confirmModify'))
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
      willDelBlackList: state.modifyData.delBlackList,
      data: state.fetchData.blackList,
      emptyDataTip: ['未设置自定义过滤网站，点击下方按钮添加', '例如：www.baidu.com']
    }
  }else if(/\/whiteList/.test(loc)){
    return {
      willDelWhiteList: state.modifyData.delWhiteList,
      data: state.fetchData.whiteList,
      emptyDataTip: ['葡萄可能会屏蔽你认为无害的信息', '白名单允许你的孩子访问这些信息，避免误屏蔽']
    }
  }else if(/\/searchFilter/.test(loc)){
    return {
      willDelSensitiveWordsList: state.modifyData.delSensitiveWordsList,
      data: state.fetchData.sensitiveWordsList,
      emptyDataTip: ['未设置自定义过滤关键词，点击下方按钮添加', '例如：一夜情']
    }
  }
}
export default connect(mapToState)(ShieldPanel)
