import { combineReducers, compose, StoreEnhancer, Store } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { history } from "./history";
import { persistStore, persistReducer, Persistor } from "redux-persist";
import { routerMiddleware } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import sagas from "./root.saga";
import { getAppReducer } from "../app/app.reducer";
import { Storage } from "../cache/indexdb";

const persistConfig: any = {
  key: "root",
  storage: Storage(),
};

const persistedReducer = persistReducer(persistConfig, getAppReducer());

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: Function;
  }
  interface NodeModule {
    hot: any;
  }
}

//import Reactotron from "reactotron-react-native";
//import { reactotronRedux } from "reactotron-redux";

const configureAppStore = (preloadedState: any = {}): any => {
  // Create a history depending on the environment
  const enhancers: StoreEnhancer[] = [];
  //  [
  //   window.__REDUX_DEVTOOLS_EXTENSION__ &&
  //     window.__REDUX_DEVTOOLS_EXTENSION__({ name: "SearchUX", trace: true }),
  // ]; // [monitorReducersEnhancer]; //, devTools()];

  const sagaMiddleware = createSagaMiddleware();

  const middleware = [
    routerMiddleware(history),
    ...getDefaultMiddleware({ thunk: false }),
    sagaMiddleware,
  ];

  const composedEnhancers: StoreEnhancer = compose(...enhancers);
  const appReducers = getAppReducer();
  const store = configureStore({
    devTools: true,
    preloadedState: preloadedState,
    reducer: persistedReducer,
    middleware: middleware,
  });
  sagaMiddleware.run(sagas);

  if (module.hot) {
    module.hot.accept(() => {
      store.replaceReducer(getAppReducer());
    });
  }

  const persistor: Persistor = persistStore(store);
  //persistor.purge();
  //persistor.flush();
  // Reactotron.configure()
  //   .use(reactotronRedux())
  //   .useReactNative()
  //   .connect();
  // Reactotron.log(store, history, store.getState());
  //   sync(() => {
  //     docCart.onSnapshot(function (doc) {
  //       store.dispatch(fetchCartSuccess(doc.data()));
  //     });
  //   });
  return {
    store,
    persistor,
    history,
    getState: store.getState,
  };
};

const { store, getState, persistor } = configureAppStore();
export { store, history, getState, persistor };
