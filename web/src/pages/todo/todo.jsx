import React, { Component } from 'react';
// import 'todo.css';


class Todo extends Component {
	constructor(props) {
		super(props);
		this.state = {},
		this.params = {}
	}

	componentWillMount () {
	}

	render() {
		return (
		<div className="todo">
			您好我是todo 页面
		</div>
		);
	}
}

export default Todo;
