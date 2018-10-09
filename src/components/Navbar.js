import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'


const styles = {
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    nav: {
        flexGrow: 2,
        marginLeft: 12,
    },
    avatarContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexGrow: 1,
        marginLeft: 12,
    },
    avatar: {
        margin: 10,
        width: 40,
        height: 40,
    },
}

const Navbar = ({ classes, authedUserInfo, logoutUser }) => {
    
    return (
        <div className={classes.root}>
            <AppBar position="absolute">
                <Toolbar>
                    <Typography color="inherit" variant="title" className={classes.title}>
                        Would You Rather?
                    </Typography>
                    <nav className={classes.nav} >
                        <Button color="inherit" component={NavLink} to='/'>
                            Home
                        </Button>
                        <Button color="inherit" component={NavLink} to='/new'>
                            New Question
                        </Button>
                        <Button color="inherit" component={NavLink} to='/leaderboard'>
                            Leaderboard
                        </Button>
                    </nav>
                    <div className={classes.avatarContainer} >
                        <Avatar 
                            className={classes.avatar}
                            src={authedUserInfo.avatarURL}
                            alt={authedUserInfo.name} />
                        
                        <Typography color="inherit">
                            {authedUserInfo.name}
                        </Typography>
                        
                        <Button color="secondary" onClick={logoutUser}>
                            Logout
                        </Button>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    )
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
    authedUserInfo: PropTypes.object.isRequired,
    logoutUser: PropTypes.func.isRequired,
}

export default withStyles(styles)(Navbar);
