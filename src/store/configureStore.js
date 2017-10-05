// import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
// import thunkMiddleware from 'redux-thunk';
//
// import promiseMiddleware from '../middlewares/promiseMiddleware'
//
// import reducer from '../reducers';
//
// const createStoreWithMiddleware = applyMiddleware(
// 	thunkMiddleware,
// 	promiseMiddleware({promiseTypeSuffixes: ['PENDING', 'SUCCESS', 'ERROR']})
// )(createStore);

// export default function configureStore(initialState) {
// 	let store;
//
// 	if (process.env.NODE_ENV === 'development') {
// 		const persistState = require('redux-devtools').persistState;
// 		const DevTools = require('../envs/DevTools').default;
//
// 		const enhancer = compose(
// 			DevTools.instrument(),
// 			persistState(
// 				window.location.href.match(
// 					/[?&]debug_session=([^&#]+)\b/
// 				)
// 			)
// 		);
// 		store = createStoreWithMiddleware(reducer, initialState, enhancer);
//
// 		if (module.hot) {
// 			module.hot.accept('../reducers', () =>
// 				store.replaceReducer(require('../reducers').default)
// 			);
// 		}
// 	} else {
// 		store = createStoreWithMiddleware(reducer, initialState);
// 	}
//
// 	return store;
// }


import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'
import rootReducer from '../reducers'


let m_store = null;


export  function configureStore(initialState) {
	console.log('configureStore !!!!!!!!!!!')
	const sagaMiddleware = createSagaMiddleware()

	const persistState = require('redux-devtools').persistState;
	const DevTools = require('../envs/DevTools').default;

	const store = createStore(
		rootReducer,
		initialState,
		compose(
			applyMiddleware(
				sagaMiddleware,
			),
			DevTools.instrument(),
			persistState(
				window.location.href.match(
					/[?&]debug_session=([^&#]+)\b/
				)
			)
		)
	)

	if (process.env.NODE_ENV === 'development') {
		const persistState = require('redux-devtools').persistState;
		const DevTools = require('../envs/DevTools').default;

		// const enhancer = compose(
		// 	DevTools.instrument(),
		// 	persistState(
		// 		window.location.href.match(
		// 			/[?&]debug_session=([^&#]+)\b/
		// 		)
		// 	)
		// );
		//store = createStoreWithMiddleware(reducer, initialState, enhancer);

		if (module.hot) {
			module.hot.accept('../reducers', () =>
				store.replaceReducer(require('../reducers').default)
			);
		}
	}

	if (module.hot) {
		module.hot.accept('../reducers', () => {
			const nextRootReducer = require('../reducers/index');
			store.replaceReducer(nextRootReducer);
		});
	}


	store.runSaga = sagaMiddleware.run
	store.close = () => store.dispatch(END)
	m_store = store
}

configureStore()

export default m_store