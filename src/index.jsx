import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {LocaleProvider} from 'antd';
import enUS from 'antd/lib/locale-provider/en_US';

import configureStore from './store/configureStore';

import Root from './containers/Root';

const store = configureStore();

render(
	<LocaleProvider locale={enUS}>
		<AppContainer>
			<Root
				store={ store }
			/>
		</AppContainer>
	</LocaleProvider>,
	document.getElementById('root')
);

if (module.hot) {
	module.hot.accept('./containers/Root', () => {
		const RootContainer = require('./containers/Root');
		render(
			<LocaleProvider locale={enUS}>
				<AppContainer>
					<RootContainer
						store={ store }
					/>
				</AppContainer>
			</LocaleProvider>,
			document.getElementById('root')
		);
	});
}
