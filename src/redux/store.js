import { applyMiddleware, compose, createStore } from 'redux';
import reducers from './reducers';

export default function configureStore() {

    let middleware = applyMiddleware();

    if (process.env.NODE_ENV !== 'production') {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      middleware = compose(middleware, devToolsExtension());
    }
  }

  return createStore(reducers, middleware);
}
