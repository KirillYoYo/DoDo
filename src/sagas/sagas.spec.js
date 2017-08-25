import test from 'blue-tape';

import { incrementAsync, fetchAllGoods, getAllGoods } from './sagas'
import goods from '../api/mock/goods'
import { put, takeEvery , call, take} from 'redux-saga/effects'


test('incrementAsync Saga test', (assert) => {
	const gen = fetchAllGoods()

	//Promise.resolve(getAllGoods()).then( (res) => {console.log( res.data )})

	// assert.deepEqual(
	// 	goods,
	// 	Promise.resolve(getAllGoods()).then( (res) => { res.data }),
	// 	'Goods must return Goods array'
	// )

	assert.deepEqual(
		getAllGoods(),
		1,
		'should start functions for gets Goods'
	)

	assert.deepEqual(
		gen.next().value.CALL.fn,
		//getAllGoods,
		1,
		'should start functions for gets Goods'
	)

	assert.deepEqual(
		gen.next().value,
		1,
		//put({type: 'GET_ALL_GOODS_SUCCESS', payload: undefined}),
		'should dispatch GET_ALL_GOODS_SUCCESS'
	)

	assert.deepEqual(
		gen.next(),
		1,
		//{ done: true, value: undefined },
		'fetchAllGoods Saga must be done'
	)

	assert.end()
});