import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from '../views/Layout';
import Login from '../views/Login';
import Register from '../views/Register';
import AddTransaction from '../views/AddTransaction';
import Table from '../views/Table';

import Home from '@/views/Home';


export const childRoutes = [
	{
		'path': '/addTransaction',
		'component': AddTransaction,
		'exactly': true
	},
	{
		'path': '/table',
		'component': Table,
		'exactly': true
	},
];

const routes = (
	<Switch>
		<Route path="/login" component={Login}/>
		<Route path="/register" component={Register}/>
		<Route path="/" component={Layout}/>
	</Switch>
);

export default routes
