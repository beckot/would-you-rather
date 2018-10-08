import React, {Component} from 'react'
import {connect} from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'

export class Login extends Component {

    constructor() {
        
        super();
        
        this.state = {
            showMenu: false,
        };
        
    }

    componentDidMount() {
        this.props.dispatch(handleInitialData())
    }
      
    showMenu = (event) => {
        event.preventDefault();
        
        this.setState({ showMenu: true }, () => {
            document.addEventListener('click', this.closeMenu);
        });
    }
    
    closeMenu = () => {
        this.setState({ showMenu: false }, () => {
            document.removeEventListener('click', this.closeMenu);
        });
    }

    handleClick = (event) => {
        
        event.preventDefault()
        this.props.dispatch(setAuthedUser(event.target.value))
    
    }

    componentWillUnmount = () => {
        document.removeEventListener("click", this.closeMenu);
    }

    render() {

        const {users} = this.props

        return (
            <div className="dropdown">
            <button className="dropbtn" onClick={this.showMenu}>
                Login as User...
            </button>

            {

                this.state.showMenu 
                ? (
                    <div className="dropdown-content">
                        {Object.keys(users).map(key => {
                            return(
                                <button key={users[key].id} value={users[key].id} onClick={this.handleClick}>
                                    {users[key].name}
                                </button>
                            )
                        })}
                    </div>
                )
                : (
                    null
                )


            }
            
            </div>
        )
    }

}

const mapStateToProps = ({users}) => {
    return {
        users
    }
}

export default connect(mapStateToProps)(Login)