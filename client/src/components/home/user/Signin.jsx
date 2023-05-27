import { Box, Button, createTheme, FormControl, FormGroup, InputBase, makeStyles, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import { signinUser } from '../../../service/api';
import { useHistory } from 'react-router-dom';


const theme = createTheme();

const useStyle = makeStyles(()=>({
    container: {
        background: '#dddddd',
        // padding: '10px',
        margin: '20vh 35vw 30vh 35vw',
        width: '30vw',
        height: '40vh',
        borderRadius: 5,
        [theme.breakpoints.down('md')]: {
            margin: '20vh 25vw 20vh 25vw',
            width: '50vw',
            height: '40vh',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '20vh 10vw 20vh 10vw',
            width: '80vw',
            height: '40vh',
        },
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    login: {
        textAlign: 'center',
        fontSize: 26,
        fontWeight: 600,
        padding: 10
    },
    textFeild: {
        background: '#444444',
        width: '80%',
        margin: '5px',
        padding: '10px',
        borderRadius: 5,
        color: '#ffffff',
        "& .MuiFilledInput-textFeild": {
            background: "none"
        },

    },
    btn: {
        width: '40%',
        margin: '5px',
        padding: '5px 10px 5px 10px',
    }

}))

const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
}


function Signin() {
    const classes = useStyle();

    const [userdata, setUserData] = useState(initialValues);

    const handleChange = (e) => {
        setUserData({...userdata, [e.target.name]: e.target.value})
    }

    const history = useHistory();

    const userSignin = async (e) => {
        e.preventDefault();
        const done = await signinUser(userdata);
        if(done) history.push('/login')
    }

    return (
        <Box className={classes.container}>
            <Typography className={classes.login}>SIGNUP</Typography>

            <FormGroup className={classes.form}>
                <InputBase 
                    onChange={handleChange} 
                    className={classes.textFeild} 
                    label="Username"
                    placeholder="Username"
                    variant="outlined"
                    
                    name = "username"
                />
                <InputBase 
                    onChange={handleChange} 
                    className={classes.textFeild} 
                    placeholder="Email"
                    name = "email"
                />
                <InputBase 
                    onChange={handleChange} 
                    type='password'
                    className={classes.textFeild} 
                    placeholder="Password"
                    name = "password"
                />
                <InputBase 
                    onChange={handleChange} 
                    className={classes.textFeild} 
                    type='password'
                    placeholder="Re-enter Password"
                    name = "confirmpassword"
                />
                <Button variant='contained' className={classes.btn} onClick={userSignin}
                    color='primary'>Signin</Button>
            </FormGroup>

            
        </Box>
    )
}

export default Signin
