import React, { useContext, useState } from 'react'
import { Box, Button, createTheme, FormControl, FormGroup, InputBase, makeStyles, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom';
import { loginUser } from '../../../service/api';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../../../App';



const theme = createTheme();

const useStyle = makeStyles(()=>({
    container: {
        background: '#dddddd',
        margin: '30vh 35vw 30vh 35vw',
        width: '30vw',
        height: '30vh',
        borderRadius: 5,
        [theme.breakpoints.down('md')]: {
            margin: '30vh 30vw 0 30vw',
            width: '40vw',
            height: '30vh',
        },
        [theme.breakpoints.down('sm')]: {
            margin: '30vh 10vw 30vh 10vw',
            width: '80vw',
            height: '30vh',
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
    },
    btn: {
        width: '40%',
        margin: '5px',
        padding: '5px 10px 5px 10px',
    },
    newUser: {
        marginTop: 10
    }

}))


const initialValues = {
    username: "",
    password: ""
}

function Login() {

    const {state, dispatch} = useContext(UserContext)

    const classes = useStyle();

    const [userdata, setUserData] = useState(initialValues);

    const handelChange = (e) => {
        e.preventDefault();
        setUserData({...userdata, [e.target.name]:e.target.value})
        // console.log(userdata)
    }

    const history = useHistory();
    const userLogin = async (e) => {
        e.preventDefault();
        const done = await loginUser(userdata);
        if(done) {
            dispatch({type: "USER", payload: true})
            history.push('/');
        }
    }

    return (
        <Box className={classes.container}>
            <Typography className={classes.login}>LOGIN</Typography>

            <FormGroup className={classes.form}>
                <InputBase 
                    className={classes.textFeild} 
                    onChange={handelChange}
                    placeholder="Username"
                    name = "username"
                    floatingLabelText="Username"
                />
                <InputBase  type='password'
                    className={classes.textFeild}
                    onChange={handelChange}
                    placeholder="Password"
                    name = "password"
                />
                <Button variant='contained' className={classes.btn} onClick={userLogin}
                    color='primary'>Login</Button>

                <Typography className={classes.newUser}>New User? <Link to='/signin'> <span>Create Account</span>  </Link>
                    
                </Typography>
            </FormGroup>

            
        </Box>
    )
}

export default Login
