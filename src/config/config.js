const baseParams= {
  appid: null,
  token: null,
  uid: null,
  uid_children: null
}
//接口地址
//dev
// export const baseUrl = 'http://browser-server-dev.ptdev.cn'

//test
export const baseUrl = '//browser-server-test.ptdev.cn'

//正式
// export const baseUrl = '//browser-server.putao.com'

//基础参数
export const getBaseParams= function() {
  if(baseParams.uid === null){
    if(location.search !== ''){
      const query=location.search.replace(/\s+/g,'').slice(1).split('&')
      query.forEach(function(val){
        const item=val.split('=')
        Object.assign(baseParams, {[item[0]]:item[1]})
      })
    }else{
      // throw new Error('查询参数为空')
    }
  }
  console.log(baseParams)
  return baseParams
}
//适配尺寸
export const setSize = ()=>{
  window.onresize=function(){
    document.querySelector('html').style.fontSize = window.innerWidth + 'px'
  }
  window.onresize()
}
