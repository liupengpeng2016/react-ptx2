import React, { Component } from 'react'
import './recordPanel.css'
import { connect } from 'react-redux'
import { fetchShieldRecord, fetchRequestRecord} from '../../redux/actions.js'
function Dom(data){
  return parseData(data).map((val, i) => {
    return (
      <ul key={i}>
        <li>{val[0].create_time}</li>
        {val.map((val, i) => {
          return (
            <li key={i}>
              <h1>{val.name}</h1>
              <p>访问次数:{val.counnt} | 分类:{val.reason}</p>
            </li>
          )
        })}
      </ul>
    )
  })
}
function parseData(data){
  let obj = {}
  let arr =[]
  //按时间分类
  data.forEach((val, i) => {
    let time = parseTime(val.create_time)
    val.create_time = time
    if(obj[time]){
      obj[time].push(val)
    }else{
      obj[time] = [val]
    }
  })
  //换时间降序排列
  for(let i in obj){
    if(obj.hasOwnProperty(i)){
      arr.push(obj[i])
    }
  }
  arr.sort(function(a, b){
    return a[0].create_time > b[0].create_time ? 1 : -1
  })
  return arr
}
//时间转换
function parseTime(createTime){
  const time = new Date(createTime)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  return year + '年' + month + '月' + date + '日'
}
class RecordPanel extends Component {
  render() {
    const {requestRecord, shieldRecord} = this.props
    return (
      <ul className='record-panel'>
        <li className='request-record'>
          {Dom(requestRecord)}
        </li>
        <li className='shield-record'>
          {Dom(shieldRecord)}
        </li>
      </ul>
    )
  }
  componentWillMount(){
    this.props.dispatch(fetchRequestRecord())
    this.props.dispatch(fetchShieldRecord())
  }
}
function mapToState({fetchData:{shieldRecord, requestRecord}}) {
  //去重
  shieldRecord = [...shieldRecord]
  requestRecord = [...requestRecord]
  for(let i = 0; i < requestRecord.length; i++){
    for(let k = 0; k < shieldRecord.length; k++){
      if(requestRecord[i].content_id === shieldRecord[k].content_id){
        shieldRecord.splice(k,1)
        break
      }
    }
  }
  //格式化数据
  return {
    shieldRecord: parseData(requestRecord),
    requestRecord: parseData(shieldRecord)
  }
}
export default connect(mapToState)(RecordPanel)
