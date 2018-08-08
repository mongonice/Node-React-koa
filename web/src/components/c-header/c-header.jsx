import React, { Component } from 'React';
import './c-header.css';

class CHeader extends Component {
	constructor (props) {
		super(props)
		this.state = {
		}
	}

//   /**
//    * 切换tab显示
//    * @param {*} id tab的index值
//    */
//   toggleTab (id) {
//     this.setState({currentTab: id});
//     emitter.emit('toggle_tab', id)
//   }

//   componentWillMount () {
//     this.setState({audienceTotal: this.props.user_num})
//     emitter.on('processAudienceNum', this.computedAudienceNum.bind(this))
//   }

  /**
   * 接收并处理穿过来的用户数量
   * @param {*} len 传过来的观众数量
   */
	computedAudienceNum (len) {
	// this.setState({audienceTotal: len})
	}

	render () {
		return (
			<div className="header-bar">
				<div className="logo"></div>
				<div className="user-info">
					<div className="user-icon">
						<img src="" alt=""/>
					</div>

					<div className="user-name">mongo</div>
				</div>
			</div>
		)
	}
}

export default CHeader