import React from 'react'
import PropTypes from 'prop-types'
import api from '../../api'
import {Form, Input, Button, Row, Col, Select, Icon, message} from 'antd'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {addTransaction} from '../../actions/addTransaction';
import {getAllBanks} from '../../actions/banks';
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

	componentDidUpdate(prevProps, prevState) {
		// only update chart if the data has changed
		if (prevProps !== this.props) {
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
	}

	componentDidMount() {
		this.props.getAllBanks()
	}

	handleSubmit (e) {
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				this.props.addTransaction({...values, idTransaction: this.props.transactions.transactionsNewId});
				global.lol = this.props.transactions.transactionsNewId
				message.success('Запись успешно добавленна');
			}
		});
	};


	render() {
		const {banks} = this.props;
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
										<Select style={{ width: 120 }} placeholder="Select a option and change input text above">
											{
												banks.banks && banks.banks.map((item, i) => {
													const Option = Select.Option;
													return (
														<Option value={String(item.bankId)} key={i}>
															{getBankName(item.bankId)}
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
		transactions: state.transactions,
		banks: state.banks
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		addTransaction: bindActionCreators(addTransaction, dispatch),
		getAllBanks: bindActionCreators(getAllBanks, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTransactionForm);