import { Box, Button, createTheme, Grid, makeStyles, Typography } from '@material-ui/core';
import { AddCircle, TrendingUpRounded } from '@material-ui/icons';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getByUsername } from '../../../service/api';
import Post from '../Post';
import { useHistory } from 'react-router-dom';




const theme = createTheme();

const useStyles = makeStyles(()=>({
    container: {
        padding: '0 100px',
        [theme.breakpoints.down('md')]: {
            // styles
            padding: '0 10px'
        }
    },
    options: {
        margin: 12,

    },
    uploadImage: {
        margin: 16,
        background: '#6495ED',
        color: "#FFFFFF",
        width: '200px',
    },

}))


const initialValue = {
    profile: false,
    articles: true
}


function MyProfile() {
    const classes = useStyles();
    const [posts, setPosts] = useState([])
    const [options, setOptions] = useState(initialValue)

    useEffect(() => {
       
    }, [options])

    const switchOpt1 = (e) => {
        setOptions({
            profile: true,
            articles: false
        })
    }

    const switchOpt2 = (e) => {
        setOptions({
            profile: false,
            articles: true
        })
    }
    const history = useHistory();

    const createBlog = (e) => {
        if(localStorage.getItem('token')) history.push('/create');
        else history.push('/login')
    }

    const Articles = () => {
        return (
        <>
        <Typography style={{margin: '20px 10px 0 12px', fontWeight: 600, fontSize: 24, color: '#444444'}}> Articles:</Typography>
            <Grid container item lg={12} xs={12} sm={12}>
              {posts.map(post=>(
                <Grid item lg={3} sm={6} xs={12}>
                    <Link to={'/details/'+post._id} style ={{textDecoration: 'none', color: 'inherit'}} >
                        <Post post={post} />
                    </Link>
                </Grid>
            ))}
            </Grid>
            <Button variant="contained" component="span" onClick={createBlog} className={classes.uploadImage}>Create Article</Button>

        </>
        )
    }

    const Profile = () => {
        return (
        <>
        <Typography style={{margin: '20px 10px 0 12px', fontWeight: 600, fontSize: 24, color: '#444444'}}> Profile:</Typography>
        <Typography style={{margin: '20px 10px 0 12px', fontSize: 28, color: '#444444'}}> Username:  <span style={{fontWeight: 600}}>{localStorage.getItem('username')}</span> </Typography>
        </>
        )
    }
    
    useEffect(()=> {
        const fetchData = async ()=> {
            let data = await getByUsername();
            setPosts(data.posts)
        }
        fetchData();
    }, [])

    getByUsername();
    return (
        <>
        <Box className={classes.container}>
            <Button variant='contained' name="profile" style={{ margin: 16, background: (options.profile)? '#6495ED':'#bbbbbb', color: "#FFFFFF" }} onClick={switchOpt1}>Profile</Button>
            <Button variant='contained' name="article" style={{ margin: 16, background: (options.articles)? '#6495ED':'#bbbbbb', color: "#FFFFFF" }} onClick={switchOpt2}>Articles</Button>

            {(options.profile)? <Profile/>:<></>}
            {(options.articles)? <Articles/>:<></>}
        </Box>
        </>
    )
}

export default MyProfile
