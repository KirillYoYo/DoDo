import React from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import {Form, Input, Button, Row, Col, Select, Icon, message, Table} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addTransaction, removeTransaction, updateAllTransactions} from '../../actions/addTransaction';
const FormItem = Form.Item;
import './index.sass'
import getBankName from '../../helpers/getBankName'

const Option = Select.Option;

const propTypes = {
	user: PropTypes.object,
	loggingIn: PropTypes.bool,
	loginErrors: PropTypes.string
};

class TableTransactions extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			tableData: [],
		}
	}
	
	componentDidMount () {
		if (this.props.transactions.transactions.length === 0) {
			// this.setState({
			// 	...this.state,
			// 	loadingBanks: true,
			// })
			api.get('/table').then(
				result => {
					// this.setState({
					// 	...this.state,
					// 	tableData: result.data.table.concat(this.props.transactions.transactions),
					// });
					result.data.table.map((item, i) => {
						console.log(item)
						this.props.addTransaction(item)
					})
				},
				error => {
					console.log(error)
				}
			)
		}
	}

	deleteTransition(id) {
		this.props.removeTransaction(id)
	}


	render() {
		const columns = [{
			title: 'id',
			dataIndex: 'id',
			key: 'id',
			render: (text, record) => (
				<span>
					{ record.idTransaction}
			    </span>
			),
		}, {
			title: 'Счет',
			dataIndex: 'amount',
			key: 'amount',
		}, {
			title: 'Банк',
			dataIndex: 'bankId',
			key: 'bankId',
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span style={{cursor: 'pointer'}} onClick={this.deleteTransition.bind(this, record.idTransaction)}>
			      Удалить
			    </span>
			),
		}];

		return (
			<div className="table-page">
				<h1>Table</h1>
				<Table dataSource={this.props.transactions.transactions} columns={columns} locale={{emptyText: 'No Data'}} />
			</div>
		)
	}
}

TableTransactions.propTypes = propTypes;


function mapStateToProps(state)  {
	return {
		transactions: state.transactions
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTransaction: bindActionCreators(addTransaction, dispatch),
		removeTransaction: bindActionCreators(removeTransaction, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTransactions);