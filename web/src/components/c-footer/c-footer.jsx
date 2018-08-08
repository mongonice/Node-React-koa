import React, { Component } from 'React';
import "./TabAudience.css";

import Util from '../../assets/js/util';
import emitter from '../../assets/js/emit'
import {getAudienceList} from '../../api'

class TabAudience extends Component {
  constructor (props) {
    super(props)
    const roomId = Util.getQueryString('roomId'),
      anchorId = roomId && roomId.replace(/_.*/,'');
    this.params = {//传参
      lid: roomId,
      zuid: anchorId,
      uuid: Util.getQueryString('uuid')
    }
    this.state = {
      audienceList: []
    }
  }

  //组件挂载之前
  componentWillMount () {
    const _this = this
    // _this._getAudienceList()
    // emitter.on('processData', this.computedTotal.bind(_this))
    _this.tick()
  }

  /**
   * 计算观众人数（此是当弹幕推送过来观众进入房间数据）
   */
  // computedTotal (arr) {
  //   let newArr = this.state.audienceList.concat(arr)
  //   this.setState({audienceList: newArr})
  //   emitter.emit('processAudienceNum', newArr.length)
  // }

  /**
   * 轮询请求观众列表
   */
  tick () {
    const _this = this
    _this._getAudienceList()

    let d = Util.getQueryString('d') || 3,
      tike_time = d * 1000

    setTimeout(function () {
      _this.tick()
    }, tike_time)
  }

  _getAudienceList () {
    const _this = this
    let params = _this.params
    getAudienceList(params, {
      jsonpCallback: 'callback',
			timeout: 3000
    }).then(({data}) => {
      // newDataList = _this.state.audienceList.concat(fetchDataList)
      let fetchDataList = data.viewer_list, audienceTotal = data.total_num;
      _this.setState({audienceList: fetchDataList})
      emitter.emit('processAudienceNum', audienceTotal)
    }).catch(
      err => console.log(err)
    )
  }

  componentDidMount () {
    this.wrapper = document.getElementById('wrapper');
		this.adjustHeight();
    window.addEventListener('resize',this.adjustHeight, false);
  }

  adjustHeight = () => {
    this.wrapper.style.height = (window.innerHeight || document.documentElement.clientHeight) -40 + 'px';
    this.wrapper.style.overflow = 'auto';
  }
  
  //组件更新
  componentDidUpdate(prevProps, prevState) {
    // zoumei
    this.wrapper.scrollTo(0, 40);
  }

  render () {
    return (
      <div className="wrapper" id="wrapper">
        <ul className="audience-list">
          {this.state.audienceList.map((item, index) => {
            let nobel_className = `nobel${item.nobleLevel}`,
              nobel_show = item.nobleLevel === 0 ? 'none': 'inline-block',
              vip_className = `vip${item.vip_level}`;
            return (
              <li key={index}>
                <div className="left-side">
                  <div className="audience-icon"><img src={`https://dl.zb.mi.com/${item.uuid}@style@160jpg?timestamp=${item.avator}`} alt=""/></div>
                  <span className="audience-name">{unescape(item.nickname.replace(/\\u/g,'%u'))}</span>
                  <span style={{display: nobel_show}} className={`lv-nobel ${nobel_className}`}></span>
                  <span className={`lv-vip ${vip_className}`}>{item.vip_level ? item.vip_level : ''}</span>
                </div>
                {/* <span className="follow-btn">关注</span> */}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default TabAudience