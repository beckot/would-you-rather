import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class AuthedUserInfo extends Component {

    logoutUser = (event) => {

        event.preventDefault()
        this.props.dispatch(setAuthedUser(null))
    }

    render() {

        const { authedUserInfo } = this.props

        return(
            <div>
                <img className="avatar" src={authedUserInfo.avatarURL} alt={authedUserInfo.name} ></img>
                {authedUserInfo.name}
                <button onClick={ this.logoutUser }>
                    Logout
                </button>
            </div>
        )
    }

} 

const mapStateToProps = ({ users, authedUser }) => {

    return {
        authedUserInfo: users[authedUser.id]
    }

}

export default connect(mapStateToProps)(AuthedUserInfo)