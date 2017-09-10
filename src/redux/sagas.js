import { takeLatest } from 'redux-saga/effects'

function* sagas() {
    yield takeLatest("TEST_ACTION", () => console.log('yeah'));
}

export default sagas;