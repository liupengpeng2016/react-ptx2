import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux'
import reducers from './redux/reducers.js'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import {setSize} from './config/config.js'
import createLogger from 'redux-logger'
import router from './router/router.js'
setSize()
const logger=createLogger()
const store= createStore(reducers, applyMiddleware(thunk, logger))
render(<Provider store={store}>{router}</Provider>, document.querySelector('#root'))
