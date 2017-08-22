import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAllUsers, updateUser} from '../../actions/main';
import { Input } from 'antd'
import './index.sass'
const { TextArea } = Input;

class MainComp extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			users: [],
			currentUser: 1,
			name: '',
			description: '',
		}
	}

	componentDidMount () {
		this.props.getAllUsers()
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.users !== nextProps.users) {
			this.setState({
				users: nextProps.users.users.colorsArray,
			}, () => {
				this.setState({
					name: this.state.users[0].name,
					description: this.state.users[0].description
				})
			})
		}
	}

	getMenus(arr) {
		const new_arr = [];
		if (arr) {
			arr.map((item, i) => {
				if (new_arr.indexOf(item.group) === -1) {
					new_arr.push(item.group)
				}
			});
			return new_arr
		}
	}
	menuClickhandler (obj) {
		let new_arr = []
		if (obj === 'all') {
			new_arr = this.props.users.users.colorsArray
		} else {
			this.props.users.users.colorsArray.map((item, i) => {
				if (item.group === obj) {
					new_arr.push(item)
				}
			})
		}
		this.setState({
			users: new_arr,
			currentUser: 1,
			name: new_arr[0].name,
			description: new_arr[0].description
		})

	}
	prev () {
		if (this.state.currentUser > 1) {
			this.setState({
				currentUser: this.state.currentUser - 1,
				name: this.state.users[this.state.currentUser -2 ].name,
				description: this.state.users[this.state.currentUser -2 ].description
			})
		}
	}
	next () {
		if (this.state.currentUser < this.state.users.length) {
			this.setState({
				currentUser: this.state.currentUser + 1,
				name: this.state.users[this.state.currentUser].name,
				description: this.state.users[this.state.currentUser].description
			})
		}
	}
	save () {
		const value = {name: this.state.name, description: this.state.description, id: (this.state.currentUser -1)};
		this.props.updateUser(value)
	}
	handleName(e) {
		const value = e.target.value;
		this.setState({
			name: value
		})
	}
	handleDescription(e) {
		const value = e.target.value;
		this.setState({
			description: value
		})
	}


	render() {
		const {users, currentUser} = this.state;

		return (
			<div className="inner">
				<div className="menu">
					<div onClick={this.menuClickhandler.bind(this, 'all')}>All</div>
					{
						this.props.users && this.props.users.users.colorsArray && this.getMenus(this.props.users.users.colorsArray).map((item, i) => {
							return (
								<div key={i} onClick={this.menuClickhandler.bind(this, item)} >{item}</div>
							)
						})
					}
				</div>
				<div className="slider">
					{
						users && users.length ?
							<div className="inner">
								<div className="nav">
									<div className="prev" onClick={this.prev.bind(this)}> {'<'} </div>
									<div className="cur">
										{currentUser + ' '}
										from
										{' ' + users.length}
									</div>
									<div className="next" onClick={this.next.bind(this)}>{'>'}</div>
								</div>
								<div className="content">
									<div className="name">{users[currentUser - 1].name}</div>
									<Input
										onChange={this.handleName.bind(this)}
										value={this.state.name}
									/>
									<div className="description">
										{users[currentUser - 1].description}
									</div>
									<Input
										onChange={this.handleDescription.bind(this)}
										type="[textarea]"
										value={this.state.description}
									/>
									<div onClick={this.save.bind(this)} className="save">SAVE</div>
								</div>
							</div>
						: null
					}
				</div>

			</div>
		)
	}
}


function mapStateToProps(state)  {
	return {
		users: state.users
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllUsers: bindActionCreators(getAllUsers, dispatch),
		updateUser: bindActionCreators(updateUser, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComp);