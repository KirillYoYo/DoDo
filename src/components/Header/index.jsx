import React from 'react'
import {Layout, Row, Col} from 'antd'
import './index.less'
import {Link, withRouter} from 'react-router-dom'

const {Header} = Layout;

class commonHeader extends React.Component {
	constructor() {
		super()
	}

	handleLogOut  () {
		const {logout} = this.props;
		logout()
	}

	render() {

		return (
			<Header style={{background: '#fff', padding: 0}}>
				<Row type="flex" justify="end" align="middle">

					<Col span={3}>
						<a onClick={this.handleLogOut.bind(this)}>Выйти</a>
					</Col>
				</Row>
			</Header>
		)
	}
}

export default withRouter(commonHeader)
