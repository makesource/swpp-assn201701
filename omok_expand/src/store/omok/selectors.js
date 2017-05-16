
export const initGame = {
	squares : new Array(19).fill(new Array(19).fill('-')),
	started : false,
	waiting : false,
	enemyname : '',
	uname : '',
	upwd : '',
	rid : '',
	win : 0,
	player : 0,
	turn : 1
}

export const getOmok = (state) => (state.omok)
