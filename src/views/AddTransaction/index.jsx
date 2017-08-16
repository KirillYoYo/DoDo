import React from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import {Form, Input, Button, Row, Col, Select, Icon, message} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addTransaction} from '../../actions/addTransaction';
const FormItem = Form.Item;
import './index.sass'
import getBankName from '../../helpers/getBankName'

const Option = Select.Option;

const propTypes = {
	user: PropTypes.object,
	loggingIn: PropTypes.bool,
	loginErrors: PropTypes.string
};

class AddTransaction extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			loadingBanks: false,
			banks: [],
			idTransaction: 0
		}
	}
	
	componentDidMount () {
		if (this.state.banks.length === 0) {
			this.setState({
				...this.state,
				loadingBanks: true,
			})
			api.get('/banks').then(
				result => {
					this.setState({
						...this.state,
						banks: result.data.banks,
						loadingBanks: false,
					})
				},
				error => {
					console.log(error)
				}
			)
		}
	}

	handleChange() {
		console.log('e')
	}
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.addTransaction({...values, idTransaction: this.props.transactions.transactionsNewId})
				message.success('Запись успешно добавленна');
				console.log('Received values of form: ', values);
				// this.setState({
				// 	...this.state,
				// 	idTransaction: this.state.idTransaction + 1,
				// })
			}
		});
	};


	render() {
		const {banks} = this.state;
		const { getFieldDecorator } = this.props.form;

		return (
			<div className="add-transaction-page">
				<h1>AddTransaction</h1>

				<Form onSubmit={this.handleSubmit.bind(this)}>
					<div className="form" style={{maxWidth: 600, margin: '0px auto'}}>
						<Row type="flex" justify="space-around" style={{ alignItems: 'center'}}>
							<Col span={10}>
								<FormItem
									label="Сумма"
									hasFeedback
								>
									{getFieldDecorator('amount', {
										rules: [ {
											required: true, message: 'Введите сумму',
										}],
									})(
										<Input />
									)}
								</FormItem>
							</Col>
							<Col span={10}>
								<FormItem
									label="Банк"
									style={{ maxWidth: 150}}
									hasFeedback
								>
									{getFieldDecorator('bankId', {
										rules: [ {
											required: true, message: 'Введите банк',
										}],
									})(
										<Select style={{ width: 120 }} onChange={this.handleChange}>
											{
												banks && banks.map((item, i) => {
													return (
														<Option value={item.bankId} key={i}>
															{getBankName(item.id)}
														</Option>
													)
												})
											}
										</Select>
									)}
								</FormItem>
							</Col>
							<Col span={4}><Button type="primary" htmlType="submit">Добавить</Button></Col>
						</Row>
					</div>

					<FormItem >

					</FormItem>
				</Form>
			</div>
		)
	}
}

AddTransaction.propTypes = propTypes;

const AddTransactionForm = Form.create()(AddTransaction);

function mapStateToProps(state)  {
	return {
		transactions: state.transactions
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTransaction: bindActionCreators(addTransaction, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionForm);