import React from 'react'
import './index.sass'
import GoodsComp from '../../components/GoodsComp'


export default class Goods extends React.Component {


	render() {
		return (
			<div className="goods-page">
				<GoodsComp />
			</div>
		)
	}
}
