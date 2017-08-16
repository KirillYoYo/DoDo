import React from 'react'
import PropTypes from 'prop-types'
import {Layout, Row, Col, Icon, Badge, Menu, Dropdown, Avatar, Popover} from 'antd'
import './index.less'
import {Link, withRouter} from 'react-router-dom'

const {Header} = Layout;

class commonHeader extends React.Component {
	constructor() {
		super()
	}

	handleLogOut = () => {
		const {logout} = this.props
		logout().payload.promise.then(() => {
			this.props.history.replace('/login');
		});
	}

	render() {
		const {profile} = this.props

		return (
			<Header style={{background: '#fff', padding: 0}}>
				<Row type="flex" justify="end" align="middle">

					<Col span={3}>
						<a onClick={this.handleLogOut}>Выйти</a>
					</Col>
				</Row>
			</Header>
		)
	}
}

export default withRouter(commonHeader)
