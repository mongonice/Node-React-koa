import React, {Component} from 'React';
import './TabBarrage.css';

import {getBarrageList} from '../../api'
import Util from '../../assets/js/util'
import emitter from '../../assets/js/emit'
import Textarea from '../Textarea/Textarea.jsx';
import emojiParser from '../../assets/js/smiley-parser.js'

class TabBarrage extends Component {
  constructor (props) {
    super(props)
    const _this = this
    const roomId = Util.getQueryString('roomId'),
      anchorId = roomId && roomId.replace(/_.*/,'');
    this.roomInfo = {//传给textarea组件的数据
      roomId,
      anchorId
    }
    this.params = {//请求参数
      its: 0,
			nts: 0,
			room_id: roomId,
			lan: 0,
			d: Util.getQueryString('d') || 3 //拉取间隔时间
    }
    this.state = {// 弹幕列表 和 height高度
      barrageList: []
    }
    this.userKey = [] //防止用户发了，又被拉了一遍
    emitter.on('processBarrage', this.insertNewBarrage.bind(_this))
  }

  //组件再挂载之前
  componentWillMount () {
    this.tick_getBarrageList()
  }

  //组件第一次挂载
  componentDidMount () {
    this.container = document.getElementById('container');
		this.adjustHeight();
    window.addEventListener('resize',this.adjustHeight, false);
  }

  /**
   * 计算container的高度
   */
  adjustHeight = () => {
		this.container.style.height = (window.innerHeight || document.documentElement.clientHeight) -100 + 'px';
	}

  /**
   * 获取弹幕
   */
  _getBarrageList () {
    const _this = this
    let params = this.params
    getBarrageList(params, {
      jsonpCallback: 'callback',
			timeout: 3000
    }).then(function ({data}) {
      let fetchedDataList = data.msgs, newJoinUsers = [];
      // 由弹幕观众进入房间推到观众列表
      fetchedDataList.map(function (val, index) {
        if (val.type === 320) {
          let item = {
            avator: '', 
            certificationType: 0, 
            level: val.lvl, 
            nobleLevel: val.nobel_lvl, 
            redName: false, 
            ticket: 0, 
            uuid: val.id, 
            vip_level: val.vip_lvl,
            nickname: val.body ? val.body.substr(0, (val.body.length-4)): ''
          }
          newJoinUsers.push(item)
          return true
        } else {
          //也不晓得为啥非得加个 return false
          return false
        }
      })
      if (newJoinUsers && newJoinUsers.length > 0) {
        emitter.emit('processData', newJoinUsers)
      }
      //去重
      if(_this.userKey.length){
        fetchedDataList = fetchedDataList.filter((item) => {
          for(let i = 0 ; i < _this.userKey.length ; i++){
            if((item.id === _this.userKey[i].id) && (item.cid === _this.userKey[i].cid)){
              _this.userKey.splice(i,1);
              return false;
            }
          }
          return true;
        })
      }

      fetchedDataList = fetchedDataList.filter((item) => {
        // 如果消息的类型是 339 点亮了就要过滤掉
        if (item.type === 339) {
          return false
        }
        return true
      })

      let newDataList = _this.state.barrageList.concat(fetchedDataList);
      //设置新的弹幕列表
      _this.setState({barrageList: newDataList})
    }).catch(
      err => console.log(err)
    )
  }

  /**
   * 轮询获取弹幕
   */
  tick_getBarrageList () {
    const _this = this
    let tick_time = this.params.d * 1000
    this._getBarrageList()
    setTimeout(function () {
      _this.tick_getBarrageList()
    }, tick_time)
  }

  /**
   * 子组件触发一个事件进行传值，父组件通过on来接收并触发一个接收函数
   * @param {*} data 点击发送按钮由子组件传过来的数据
   */
  insertNewBarrage (data) {
    let item = {
      lvl: this.props.user_info.lvl,
      nobel_lvl: this.props.user_info.nobleLevel,
			nickname: this.props.user_info.nickname,
			body: data.body,
			cid: data.ts,
      id: this.props.user_info.uuid,
			type: 303
    }, newDataList = this.state.barrageList.concat(item);
    this.userKey.push(item) // 为了去除用户自己的
    this.setState({barrageList: newDataList})
  }

  //组件更新
  componentDidUpdate(prevProps, prevState) {
		this.container.scrollTo(0, this.container.scrollHeight);
	}

  /**
   * 当切换组件时，移除异步请求
   */
  componentWillUnmount () {
    window.removeEventListener('resize', this.adjustHeight, false);
  }


  render () {
    return (
      <div className="className">
        <div className="container" id="container">
          <p className="barrage-tip">封面和直播含吸烟、低俗、色情、反动等内容都将被屏蔽或封禁账号，请文明直播。</p>
          <ul className="barrage-list">
            {
              this.state.barrageList.map((item, index) => {
                let lvl_className = `name${item.nobel_lvl}`,
                  lv_show = item.nobel_lvl === 0 ? 'none': 'inline-block',
                  nick_className = ('202,308,320,401'.search(item.type) > -1 ? 'other' : ''),
                  nickname = item.type === 320 ? '' : `${item.nickname} : `,
                  msg_className = ('202,308,320,401'.search(item.type) > -1 ? 'other' : ''),
                  bodyTxt = emojiParser.transfer(item.body);
                return (
                  <li key={index}>
                    <span style={{display: lv_show}} className={ `lvl ${lvl_className}` }></span>
                    <span className={ `nickname ${nick_className}` }>{ nickname }</span>
                    <span className={`msg ${ msg_className }`}>{ bodyTxt }</span>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <Textarea roomId={ this.roomInfo.roomId } anchorId={ this.roomInfo.anchorId }/>
      </div>
    )
  }
}

export default TabBarrage