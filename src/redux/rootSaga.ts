// src/redux/rootSaga.ts
import { all, fork } from "redux-saga/effects";
import { watchCart, watchWishlist, watchFeedback } from "./sagas";

export default function* rootSaga() {
  yield all([fork(watchCart), fork(watchWishlist), fork(watchFeedback)]);
}
