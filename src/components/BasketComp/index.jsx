import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAllGoods, deleteFromBasket, addToBasket, updateBasket} from '../../actions/goods';
import { Input, message, Button } from 'antd'
import './index.sass'
const { TextArea } = Input;

class BasketComp extends React.Component {

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

	}

	renderBasketItems (arr) {
		console.log(arr)
		const new_arr = [];
		const arr_id = [];

		function getItemInddx (arr, id) {
			let res = null;
			arr.map((item, i) => {
				if (item.id === id) {
					res = i;
				}
			});
			return res
		}

		arr.every(function(item, i) {
			if (arr_id.indexOf(item.id) === -1) {
				new_arr.push(item);
				arr_id.push(item.id)
				new_arr[new_arr.length -1].cnt = 1
				return true
			} else {
				new_arr[getItemInddx(new_arr, item.id)].cnt++
				return true
			}
		});
		new_arr.sort(function(a, b) {
			return a.id - b.id;
		});
		return new_arr
	}
	handleOrder () {
		this.props.updateBasket([])
		message.success("Заказ офрмлен")
	}


	render() {
		const goods = JSON.parse(localStorage.getItem('goods'));
		const basket = JSON.parse(localStorage.getItem('basket'));

		return (
			<div className="inner">
				<h1>Ваш заказ:</h1>
				<div className="goods-catalog">
					{
						basket && basket.length !== 0 ? this.renderBasketItems(basket).map((item, i) => {
							return (
								<div className="item" key={i}>
									<div className="name">{item.name}</div>
									<div className="price">{item.price}</div>
									<div className="img"><img width="56px" src={item.img} alt=""/></div>
									<div className="cnt" style={{paddingTop: 0, marginLeft: 5}}><bold><span>x</span>{item.cnt}</bold></div>
								</div>
							)
						})
						: <div>У вас еще небыло покупок</div>
					}
				</div>
				{
					basket && basket.length !== 0 ?
						<div className="do-order">
							<Button onClick={this.handleOrder.bind(this)} type="primary">Оформить заказ</Button>
						</div>
					: null
				}

			</div>
		)
	}
}


function mapStateToProps(state)  {
	return {
		goods: state.goods
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getAllGoods: bindActionCreators(getAllGoods, dispatch),
		deleteFromBasket: bindActionCreators(deleteFromBasket, dispatch),
		addToBasket: bindActionCreators(addToBasket, dispatch),
		updateBasket: bindActionCreators(updateBasket, dispatch),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BasketComp);