import { AppBar, Toolbar, Typography, makeStyles, Button} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useHistory, withRouter } from 'react-router-dom';
import React, { useContext, useEffect, useState} from 'react';
import { UserContext } from '../App';
import BasicMenu from './home/UserOptions';




const useStyles = makeStyles({
    component: {
        background: '#FFFFFF',
        color: 'black'
    },
    container: {
        justifyContent: 'center',
        '& > *': {
            paddingLeft: 10,
            paddingRight: 10 
        }
    },
    link: {
        textDecoration: 'none', 
        color: 'inherit'
    }
})


const Header = () => {
    const classes = useStyles();
    const history = useHistory();
    const {state, dispatch} = useContext(UserContext)
    
    const handleLogin = (e) => {
        history.push('/login')
    }


    const handleLogout = (e) => {
        localStorage.removeItem('username')
        localStorage.removeItem('token')
        dispatch({type: "USER", payload: false})
        history.push('/')
    }

    const handleProfile = (e) => {
        history.push('/profile/'+localStorage.getItem('username'))
    }

    return (
        <AppBar position="sticky" className={classes.component}>
            <Toolbar className= {classes.container}>
                <Link to='/' className={classes.link}>
                    <Typography>HOME</Typography>
                </Link>
                <Typography>ABOUT</Typography>
                <Typography>CONTACT</Typography>
                {state? <></>:<Typography onClick={handleLogin}>LOGIN</Typography>}
                {state? <Typography onClick={handleLogout}>LOGOUT</Typography>:<></>}
                {/* {state? <BasicMenu/>:<></>} */}
                {state? <Button component="span" style={{textTransform: 'none', border: '1px blue', fontWeight:800, background: '#dddddd'}} onClick={handleProfile}>{localStorage.getItem('username')}</Button>:<></>}

            </Toolbar>
        </AppBar>
    )
}

export default withRouter(Header);