import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {getAllGoods, deleteFromBasket, addToBasket, updateBasket} from '../../actions/goods';
import { Input, message } from 'antd'
import './index.sass'
import { Link } from 'react-router-dom'
const { TextArea } = Input;

class GoodsComp extends React.Component {

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
		this.props.getAllGoods()
		if (localStorage.getItem('basket') && this.props.goods.basket.length === 0 ) {
			const basket = JSON.parse(localStorage.getItem('basket'));
			this.props.updateBasket(basket)
		}
	}

	gitGoodById (id) {
		const goods = JSON.parse(localStorage.getItem('goods')).goods;
		let res = null
		goods && goods.map((item, i) => {
			if (item.id === id) {
				res = item
			}
		});
		return res
	}


	addToBasketHandler (id) {
		message.success("Добавленно в корзину " + this.gitGoodById(id).name);
		this.props.addToBasket({id})
	}
	deleteFromBasketHandler (id) {
		message.error("Удалено из корзины " + this.gitGoodById(id).name);
		this.props.deleteFromBasket({id})
	}
	getCountsOfGoods (id) {
		const basket = JSON.parse(localStorage.getItem('basket'));
		let cnt = 0;
		basket && basket.map((item, i) => {
			if (item.id === id) {
				cnt++
			}
		});
		return cnt;
	}

	render() {
		const goods = JSON.parse(localStorage.getItem('goods'));
		const basket = JSON.parse(localStorage.getItem('basket'));

		return (
			<div className="inner">
				<h1>Список товаров</h1>
				<div className="goods-catalog">
					{
						goods ?  goods.goods.map((item, i) => {
							return (
								<div className="item" key={i}>
									<div className="name">{item.name}</div>
									<div className="price">{item.price}</div>
									<div className="description">{item.description}</div>
									<div className="img"><img width='56px' src={item.img} alt=""/></div>
									<div onClick={this.addToBasketHandler.bind(this, item.id)} className="plus ">+</div>
									<div className="cnt">{this.getCountsOfGoods(item.id)}</div>
									{
										this.getCountsOfGoods(item.id) > 0 ?
											<div onClick={this.deleteFromBasketHandler.bind(this, item.id)} className="minus ">-</div>
										: null
									}
								</div>
							)
						})
							: null
					}
					{
						basket && basket.length > 0 ?
							<div className="to-basket">
								<Link to='basket'>Перейти в корзину</Link>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoodsComp);