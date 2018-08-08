import React, {Component} from 'react';

import CHeader from '../../components/c-header/c-header.jsx';

class Index extends Component {
    constructor (props) {
        super(props)
    }

    render () {
        return (
            <div className="index-page">
                <CHeader />
                我是index页面
            </div>
        )
    }
}

export default Index;