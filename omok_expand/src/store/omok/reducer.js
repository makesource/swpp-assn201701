import { initGame } from 'store/omok/selectors'

const game = (state = initGame, action) => {
	console.log(action)
	switch (action.type) {
		case 'PUT_OMOK':
			let coordinate = action.id.split('_');
			let next = state.squares.map(function(arr, index) {
				if (index == coordinate[0]) {
					let copy = arr.slice();
					let who = (action.mine ? state.player : 3 - state.player)
					copy[coordinate[1]] = (who == 1) ? 'O' : 'X';
					return copy;
				}
				return arr.slice();
			});
			return {
				...state,
				squares: next,
			}
		case 'POST_ENTER_ROOM_REQUEST':
			return {
				...state,
				uname: action.uname,
				upwd: action.upwd,
				rid: action.rid
			}
		case 'ENTER_ROOM_SUCCESS':
			console.log('Success login!');
			return {
				...state,
				waiting: true
			}
		case 'START_GAME':
			return {
				...state,
				started: true,
				waiting: false,
				enemyname: action.enemyname,
				player: action.player
			}
		case 'GET_MY_TURN':
			return {
				...state,
				turn : state.player
			}
		case 'GET_ENEMY_TURN':
			return {
				...state,
				turn : 3 - state.player
			}
		case 'END_GAME':
			return {
				...state,
				win: action.id
			}
		default:
			return state;
	}
}

export default game