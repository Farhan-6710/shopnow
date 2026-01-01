// src/redux/rootSaga.ts
import { all, fork } from "redux-saga/effects";
import { watchCart } from "./cart/cartSaga";
import { watchWishlist } from "./wishlist/wishlistSaga";

import { watchFeedback } from "./feedback/feedbackSaga";

export default function* rootSaga() {
  yield all([fork(watchCart), fork(watchWishlist), fork(watchFeedback)]);
}
