import React from 'react'
import { connect } from 'react-redux'
import Navbar from './Navbar'
import { setAuthedUser } from '../actions/authedUser'

class Header extends React.Component {
    
    logoutUser = (event) => {
        event.preventDefault()
        this.props.dispatch(setAuthedUser(null))
    }

    render() {
        return (
            <Navbar authedUserInfo={this.props.authedUserInfo} logoutUser={this.logoutUser} />
        );
    }
}

const mapStateToProps = ({ users, authedUser }) => {

    return {
        authedUserInfo: users[authedUser.id]
    }

}

export default connect(mapStateToProps)(Header);
