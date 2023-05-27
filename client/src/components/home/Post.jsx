import { Box, Typography, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
    container: {
        height: 350,
        margin: 10,
        borderRadius: 10,
        border: '0px solid  #dddddd',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        /* offset-x | offset-y | blur-radius | spread-radius | color */
        boxShadow: "2px 2px 8px 2px #999999",
        // width: '20%'
        '&:hover': {
            boxShadow: "2px 2px 8px 6px #999999",
        },
        '&>*': {
            padding: '0 5px 5px 5px'
        }

    },
    image: {
        height: 170,
        width: '100%',
        objectFit: 'cover',
        borderRadius: '10px 10px 0px 0px '
    },
    text: {
        color: '#878787',
        fontSize: 12
    },
    heading: {
        fontSize: 18,
        fontWeight: 600,
        textAlign: 'center'
    },
    detail: {
        fontSize: 14,
        wordBreak: 'break-word',
        textAlign: 'center'
    }
})

function Post(props) {
    // console.log("props: ", props)
    // console.log(props.post._id)
    const post = props.post;

    const classes = useStyles();

    const url = post.picture || 'https://cdn.pixabay.com/photo/2021/02/01/06/48/geometric-5969508_960_720.png';

    let descript = post.description
    let temp = descript.length<=100? post.description:[
        descript = descript.substr(0, 500),
        descript = descript.substr(0, Math.min(descript.length, descript.lastIndexOf(" ")))
    ]
    
    return (
        <Box className={classes.container}>
            <img src={url} className={classes.image} alt="wrapper" />
            <Typography className={classes.text}>{post.categories}</Typography>
            <Typography className={classes.heading}>{post.title}</Typography>
            <Typography className={classes.text}>Author: {post.username}</Typography>
            <Typography className={classes.details}>{descript + "."}</Typography>
        </Box>
    )
}

export default Post
