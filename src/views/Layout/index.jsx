import React from 'react';
import PropTypes from 'prop-types'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Layout, Affix, Row, Col} from 'antd';
import {Route, Redirect} from 'react-router-dom';
import Basket from '../Basket';
import Goods from '../Goods';
import {withRouter} from 'react-router-dom';


import {childRoutes} from '@/route'
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

	shouldComponentUpdate (nextProps) {
		console.log(nextProps)
		return !localStorage.getItem('uid') ||
		nextProps.location !== this.props.locations
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
		return (
			<Layout className="ant-layout-has-sider">
				<Sidebar />
				<Layout>
					<Content style={{margin: '0 16px'}}>
						<div style={{minHeight: 360}}>
							<Route path="/main" />
							<Route path="/main/goods" component={Goods}/>
							<Route path="/main/basket" component={Basket}/>
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
