import React, {Component} from 'react';
import {Route, Switch } from 'react-router-dom';

import Layout from '../views/Layout';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '@/views/Home';

const routes = (
	<Switch>
		<Route exact path='/' component={Home}/>
		<Route path="/login" component={Login}/>
		<Route path="/register" component={Register}/>
		<Route path="/main" component={Layout}/>
	</Switch>
);

export default routes
