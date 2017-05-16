import { take, put, call, fork, spawn, select } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import api from 'services/api'
import { getOmok } from './selectors'
import { enterRoomFail, enterRoomSuccess, clickOmok, getAcceptEnemyRequest, startGame, getMyTurn, getEnemyTurn, putOmok, endGame } from 'store/actions'

const url = 'http://127.0.0.1:8000/'
const players_url = (rid) => (url + 'rooms/' + rid + '/players')
const history_url = (rid) => (url + 'rooms/' + rid + '/history')
const user_url = (id) => (url + 'users/' + id)
const room_url = (rid) => (url + 'rooms/' + rid)

export function* watchLogin() {
	const data = yield take('POST_ENTER_ROOM_REQUEST')
	yield call(postEnterRoom, data)
}

export function* postEnterRoom(data) {
	let uname = data.uname
	let upwd = data.upwd
	let rid = data.rid
	console.log("Logging in...")
	const hash = new Buffer(`${uname}:${upwd}`).toString('base64')
	const response = yield call(fetch, players_url(rid), {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${hash}`
		}
	})
	console.log(response)
	if (!response.ok) {
		yield put(enterRoomFail())
	} else {
		yield put(enterRoomSuccess(uname, rid))
	}
}

export function* createEnemyWait() {
	const data = yield take('ENTER_ROOM_SUCCESS')
	const rid = data.rid
	const uname = data.uname
	yield put(getAcceptEnemyRequest(uname, rid))
}

export function* waitEnemy() {
	while (true) {
		console.log('Waiting GET_ACCEPT_ENEMY_REQUEST...')
		const data = yield take('GET_ACCEPT_ENEMY_REQUEST')
		yield call(acceptEnemy, data)
	}
}

export function* acceptEnemy(data) {
	let rid = data.rid
	let uname = data.uname

	console.log("Getting current player list...")
	const res = yield call(api.get, players_url(rid))

	let usernames = []
	for (var i = 0; i < res.length; i ++) {
		const ires = yield call(api.get, user_url(res[i]))
		usernames.push(ires['username'])
	}
	console.log(usernames)

	if (usernames.length == 2) {
		// Room is full!!
		let enemyname = ""
		if (usernames[0] == uname) {
			enemyname = usernames[1]
			yield put(startGame(enemyname, rid, 1))
			yield put(getMyTurn()) // 1p
		} else {
			enemyname = usernames[0]
			yield put(startGame(enemyname, rid, 2))
			yield put(getEnemyTurn()) // 2p
		}
	} else {
		yield spawn(createNewAction, {uname, rid})
	}
}

export function* createNewAction(data) {
	const rid = data.rid
	const uname = data.uname
	console.log("Waiting enemy...")
	yield delay(1000)
	console.log("1sec passed.")
	yield put(getAcceptEnemyRequest(uname, rid))
}

export function* watchMyTurn() {
	while (true) {
		console.log('Waiting click omok...')
		const data = yield take('CLICK_OMOK')
		yield call(postOmok, data)
	}
}

export function* postOmok(data) {
	const omok = yield select(getOmok)
	const rid = omok.rid
	const uname = omok.uname
	const upwd = omok.upwd
	const hash = new Buffer(`${uname}:${upwd}`).toString('base64')
	const coordinate = data.id.split('_');
	const response = yield call(fetch, history_url(rid), {
		method: 'POST',
		headers: {
			'Authorization': `Basic ${hash}`,
			'Accept'        : 'application/json',
       		'Content-Type'  : 'application/json'
		},
		body: JSON.stringify({
        	place_i   : coordinate[0],
        	place_j   : coordinate[1]
      	})
	})
	console.log(response)
	if (!response.ok) {
		yield put(clickOmok(data.id))
	} else {
		yield put(putOmok(data.id, true))
		yield put(getEnemyTurn())
	}
}

export function* watchEnemyTurn() {
	while (true) {
		const data = yield take('GET_ENEMY_TURN')
		yield call(checkGameState, data)
	}
}

export function* checkGameState(data) {
	const omok = yield select(getOmok)
	let rid = omok.rid

	console.log("Getting room detail...")
	const response = yield call(api.get, room_url(rid))

	console.log("Getting history list...")
	const res = yield call(api.get, history_url(rid))
	let id = ''
	let max = 0
	for (var i = 0; i < res.length; i ++) {
		if (max < res[i]['id']) {
			max = res[i]['id']
			id = res[i]['place_i'] + '_' + res[i]['place_j']
		}
	}

	if (response['win'] === 0) { 
		if (response['turn'] != omok.turn) {
			yield put(putOmok(id, false))
			yield put(getMyTurn())
		} else {
			yield spawn(createNewTurnAction, {})
		}
	} else {
		let mine = (response['turn'] == omok.turn)
		yield put(putOmok(id, mine))
		yield put(endGame(response['win']))
	}
}

export function* createNewTurnAction(data) {
	yield delay(1000)
	console.log("1sec passed.")
	yield put(getEnemyTurn())
}

export default function* () {
	yield fork(watchLogin)
	yield fork(createEnemyWait)
	yield fork(waitEnemy)
	yield fork(watchMyTurn)
	yield fork(watchEnemyTurn)
}