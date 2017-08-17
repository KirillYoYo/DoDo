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
			api.get('/table').then(
				result => {
					this.props.updateAllTransactions(result.data.table.concat(this.props.transactions.transactions))
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
			title: 'Id',
			dataIndex: 'id',
			key: 'id',
		}, {
			title: 'Счет',
			key: 'amount',
			dataIndex: 'amount',
		}, {
			title: 'Банк',
			key: 'bankId',
			dataIndex: 'bankId',
			render: (text, record) => (
				<span>
					{getBankName(record.bankId)}
			    </span>
			),
		}, {
			title: 'Action',
			key: 'action',
			render: (text, record) => (
				<span style={{cursor: 'pointer'}} onClick={this.deleteTransition.bind(this, record.idTransaction)}>
			      Удалить
			    </span>
			),
		}];

		const dataSource = [];
		this.props.transactions.transactions.map((item, i) => {
			dataSource.push(item)
			dataSource[i].key = '' + i
		});

		return (
			<div className="table-page">
				<h1>Table</h1>
				{
					this.props.transactions.transactions.length !== 0 ?
						<Table dataSource={dataSource} columns={columns} locale={{emptyText: 'No Data'}} />
					: null
				}
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
		updateAllTransactions: bindActionCreators(updateAllTransactions, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(TableTransactions);