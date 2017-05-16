
export const restart = () => ({
	type : 'RESTART'
})

export const clickOmok = (id) => ({
	type : 'CLICK_OMOK',
	id
})

export const postEnterRoomRequest = (uname, upwd, rid) => ({
	type : 'POST_ENTER_ROOM_REQUEST',
	uname,
	upwd,
	rid
})

export const getAcceptEnemyRequest = (uname, rid) => ({
	type : 'GET_ACCEPT_ENEMY_REQUEST',
	uname,
	rid
})

export const enterRoomSuccess = (uname, rid) => ({
	type : 'ENTER_ROOM_SUCCESS',
	uname,
	rid
})

export const enterRoomFail = () => ({
	type : 'ENTER_ROOM_FAIL'
})

export const startGame = (enemyname, rid, player) => ({
	type : 'START_GAME',
	enemyname,
	rid,
	player
})

export const getMyTurn = () => ({
	type : 'GET_MY_TURN'
})

export const getEnemyTurn = () => ({
	type : 'GET_ENEMY_TURN'
})

export const putOmok = (id, mine) => ({
	type : 'PUT_OMOK',
	id,
	mine
})

export const endGame = (id) => ({
	type : 'END_GAME',
	id
})