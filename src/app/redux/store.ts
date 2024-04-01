import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index'; // 여기에서 rootReducer를 가져옵니다.

const store = configureStore({
  reducer: rootReducer,
});

export type TTARDispatch = typeof store.dispatch;
export default store;
