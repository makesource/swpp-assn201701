import React from 'react'
import { connect } from 'react-redux'
import { restart, clickOmok } from 'store/actions'
import { BoardOrganism } from 'components'

const mapStateToProps = (state) => ({
	state: state.omok

})

const mapDispatchToProps = (dispatch) => ({
	onRestart: () => {
		dispatch(restart())
	},
	onOmokClick: (id) => {
		dispatch(clickOmok(id))
	}
})
	
export default connect(mapStateToProps, mapDispatchToProps)(BoardOrganism)