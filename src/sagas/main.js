// import { createStore, applyMiddleware } from 'redux'
// import createSagaMiddleware from 'redux-saga'
//
// import { helloSaga } from './sagas'
//
// import rootSaga from './sagas'
//
//
// const sagaMiddleware = createSagaMiddleware();
// const store = createStore(
// 	reducer,
// 	applyMiddleware(sagaMiddleware)
// )
// sagaMiddleware.run(rootSaga)
//
// const action = type => store.dispatch({type});
//
// // rest unchanged
//
// const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
// 	<div>
// 		<button onClick={onIncrementAsync}>
// 			Increment after 1 second
// 		</button>
// 		{' '}
// 		<button onClick={onIncrement}>
// 			Increment
// 		</button>
// 		{' '}
// 		<button onClick={onDecrement}>
// 			Decrement
// 		</button>
// 		<hr />
// 		<div>
// 			Clicked: {value} times
// 		</div>
// 	</div>
//
//
// function render() {
// 	ReactDOM.render(
// 		<Counter
// 			value={store.getState()}
// 			onIncrement={() => action('INCREMENT')}
// 			onDecrement={() => action('DECREMENT')}
// 			onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
// 		document.getElementById('root')
// 	)
// }
//
//
