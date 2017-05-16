import React from 'react'
import { connect } from 'react-redux'
import { postEnterRoomRequest } from 'store/actions'
import { LoginOrganism } from 'components'

const mapStateToProps = (state) => ({
	state: state.omok
})

const mapDispatchToProps = (dispatch) => ({
	onPostEnterRoom: (uname, upwd, rid) => {
		dispatch(postEnterRoomRequest(uname, upwd, rid))
	}
})
	
export default connect(mapStateToProps, mapDispatchToProps)(LoginOrganism)