import React from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Affix, Row, Col} from 'antd';
import {Route, Redirect} from 'react-router-dom';
import AddTransaction from '../AddTransaction';
import Table from '../Table';
import {withRouter} from 'react-router-dom';


import {childRoutes} from '@/route'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import {logout} from '../../actions/auth';

import './index.sass';

const {Content} = Layout;

class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		if (!localStorage.getItem('uid')) {
			this.props.history.replace('/login');
		}
	}

	shouldComponentUpdate  () {
		return !localStorage.getItem('uid')
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.auth !== nextProps.auth) {
			if (!nextProps.auth.user) {
				localStorage.removeItem('uid');
				this.props.history.replace('/login');
			}
		}
	}

	render() {
		const {auth, actions} = this.props;

		return (
			<Layout className="ant-layout-has-sider">
				<Sidebar />
				<Layout>
					<Header profile={auth} logout={actions.logout}/>
					<Content style={{margin: '0 16px'}}>
						<div style={{minHeight: 360}}>
							<Route path="/main" render={() => (
								<h3>main</h3>
							)}/>
							<Route path="/main/table" component={Table}/>
							<Route path="/main/addTransaction" component={AddTransaction}/>
						</div>
					</Content>
				</Layout>
			</Layout>
		);
	}
}

App.propTypes = {
	auth: PropTypes.object,
	navpath: PropTypes.array
};

const mapStateToProps = (state) => {
	const {auth, menu} = state;
	return {
		auth: auth ? auth : null,
		navpath: menu.navpath
	};
};

function mapDispatchToProps(dispatch) {
	return {actions: bindActionCreators({ logout}, dispatch)};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
