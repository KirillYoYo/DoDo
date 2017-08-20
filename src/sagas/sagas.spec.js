import test from 'tape';

import { incrementAsync } from './sagas'
import { delay } from 'redux-saga'
import { put, takeEvery , call} from 'redux-saga/effects'

test('incrementAsync Saga test', (assert) => {
	const gen = incrementAsync()

	// gen.next()
	// gen.next()
	// gen.next()

	console.log('---------1-----------')
	console.log(gen.next())
	console.log('---------1-----------')

	console.log('---------1-----------')
	console.log(gen.next())
	console.log('---------1-----------')

	console.log('---------1-----------')
	console.log(gen.next())
	console.log('---------1-----------')


	// assert.deepEqual(
	// 	gen.next(),
	// 	{ done: false, value: '' },
	// 	'incrementAsync should return a Promise that will resolve after 1 second'
	// )
	//
	// assert.deepEqual(
	// 	gen.next().value,
	// 	call(delay, 1000),
	// 	'incrementAsync Saga must call delay(1000)'
	// )
	//
	// assert.deepEqual(
	// 	gen.next().value,
	// 	put({type: 'INCREMENT'}),
	// 	'incrementAsync Saga must dispatch an INCREMENT action'
	// )
	//
	// assert.deepEqual(
	// 	gen.next(),
	// 	{ done: true, value: undefined },
	// 	'incrementAsync Saga must be done'
	// )
	//
	assert.end()
});