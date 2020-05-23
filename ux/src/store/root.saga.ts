import { /*put, takeEvery, */ all } from "redux-saga/effects";

//const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

// function* incrementAsync() {
//   yield delay(1000);
//   yield put({ type: "SOME_ACTION" });
// }

// function* watchIncrementAsync() {
//   yield takeEvery("SOME_ASYNC", incrementAsync);
// }

export default function* rootSaga() {
  yield all([]);
}
