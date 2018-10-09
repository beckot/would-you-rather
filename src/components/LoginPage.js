import React, {Component} from 'react'
import {connect} from 'react-redux'
import { handleInitialData } from '../actions/shared'
import { setAuthedUser } from '../actions/authedUser'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing.unit * 2,
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  });


export class Login extends Component {

    state = {
            showMenu: false,
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