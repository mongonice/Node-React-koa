import React, { Component } from 'react';
import emitter from '../../assets/js/emit';

import './Tips.css';

class Tips extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			msg: '',
			tips_className: 'tips'
		};
	}
	componentDidMount() {
		emitter.on('showTips',this.show);
	}
	componentWillUnmount() {
		emitter.removeListener('showTips',this.show);
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(nextState.tips_className !== this.state.tips_className){
			return true;
		}
		return false;
	}
	show = (data) => {
		this.setState({
			msg: data.msg,
			tips_className : 'tips show tips-' + data.type
		})

		setTimeout(() => {
			this.setState({
				tips_className : this.state.tips_className.replace('show','')
			});
			data.callback && data.callback();

		},data.time || 3000);
	}
	render(){
		return (
			<div className={ this.state.tips_className }>{ this.state.msg }</div>
		)
	}
}
export default Tips;
