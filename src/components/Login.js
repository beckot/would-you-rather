import React, {Component} from 'react'
import {connect} from 'react-redux'

class Login extends Component {

    constructor() {
        super();
        
        this.state = {
            showMenu: false,
        };
        
        // this.showMenu = this.showMenu.bind(this);
        // this.closeMenu = this.closeMenu.bind(this);
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

    handleClick = (buttonValue) => {
        console.log('clicked:', buttonValue)
    }

    render() {

        const {users} = this.props

        return (
            <div class="dropdown">
            <button class="dropbtn" onClick={this.showMenu}>
                Login as User...
            </button>

            {

                this.state.showMenu 
                ? (
                    <div class="dropdown-content">
                        {Object.keys(users).map(key => {
                            return(
                                <button key={users[key].id} onClick={this.handleClick(users[key].id)}>
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