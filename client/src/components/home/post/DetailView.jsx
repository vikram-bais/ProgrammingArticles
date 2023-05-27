import React, { useEffect, useState } from 'react'
import {Box, Button, createTheme, TextareaAutosize, Typography} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import { Edit, Delete } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { deletePost, getPost } from '../../../service/api';
import { useHistory } from 'react-router';
import CommentSection from './CommentSection';
import ReactMarkdown from 'react-markdown'

const theme = createTheme();

const useStyles = makeStyles(()=>({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            // styles
            padding: '0 10px'
        }
    },
    image: {
        height: '50vh',
        width: '100%',
        objectFit: 'cover',
    },
    icons: {
        float: 'right'
    },
    icon: {
        margin: 5,
        border: '2px solid #878787',
        borderRadius: 10,
        padding: 5
    },
    heading: {
        fontSize: 36,
        fontWeight: 600,
        textAlign: 'center',
        margin: '50px 0 10px 0'
    },
    subheading: {
        color: '#878787',
        display: 'flex',
        margin: '20px 0',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    },
    comment: {
        display: 'flex',
        marginTop: 50,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    addComment: {
        width: '80%',
        marginRight: 10,
        [theme.breakpoints.down('sm')]: {
            width: '100%'
        }
    },
    commentBtn: {

    }

}))

function DetailView({match}) {
    // console.log("match: ", match.params.id)

    const classes = useStyles();

    const [post, setPost] = useState({});
    const history = useHistory();

    const url = post.picture? post.picture:'https://cdn.pixabay.com/photo/2021/02/01/06/48/geometric-5969508_960_720.png';


    useEffect(()=>{
        const fetchData = async () => {
            // console.log("detail fetchData st ")
            let data = await getPost(match.params.id);
            setPost(data.post);
        }
        fetchData();
    }, [])

    async function delPost(e) {
        console.log("deletePost")
        await deletePost(match.params.id);
        // history.push('/')
        history.goBack()
    }
    
    return (

        <Box className={classes.container}>
            <img src={url} alt="Image" className={classes.image}/>
            {post.username===localStorage.getItem('username')? [
            <Box className={classes.icons}>
                <Link to={'/update/'+post._id} className={classes.link} >
                    <Edit  className={classes.icon} color='primary'/>
                </Link>
                <Delete  className={classes.icon} color='primary' onClick={delPost} />
            </Box>]: <></>}
            <Typography className={classes.heading}>{post.title}</Typography>
            <Box className={classes.subheading}>
                <Typography style={{color: '#222222'}}>Author: <Link to={'/?username='+post.username} className={classes.link}><span  style={{fontWeight: 600, color: '#222222'} }>{post.username}</span></Link> </Typography>
                <Typography style={{marginLeft: 'auto', color: '#222222'}}>{new Date(post.createdDate).toDateString()}</Typography>
            </Box>
            <Typography> <span style={{fontWeight: 600, fontSize: 24, color: '#444444'}}>Description:</span></Typography>
            <Typography>{post.description}</Typography>
            <Typography style={{marginTop:40, fontWeight: 600, fontSize: 24, color: '#444444'}}> Article:</Typography>
            <Typography style={{padding: 10, borderRadius: 10, border: '0px solid  #eeeeee',boxShadow: "2px 2px 8px 1px #999999",}}><ReactMarkdown style={{}}>{post.article}</ReactMarkdown></Typography>
            

            <CommentSection/>

            


        </Box>
    )
}

export default DetailView
