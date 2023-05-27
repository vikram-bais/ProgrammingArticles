import { Box, Button, createTheme, TextareaAutosize, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'

const theme = createTheme();

const useStyles = makeStyles(()=>({
    commentBox: {
        display: 'flex',
        marginTop: 50,
        flexDirection: 'row',
        [theme.breakpoints.down('sm')]: {
            display: 'block'
        }
    },
    allcomment: {
        marginTop: 10,
    },
    addComment: {
        borderRadius: 8,
        width: '80%',
        marginRight: 10,
        marginBottom: 10,
        [theme.breakpoints.down('sm')]: {
            width: '100%',
            marginBottom: 10
        }
    },
    commentBtn: {

    },
    comment: {
        // display: 'flex',
        // flexDirection: 'row',
        // top right bottom left
        background: '#dddddd',
        padding: '10px 0 10px 10px',
        margin: '10px 0 0 0',
        borderRadius: 16,
        width: '80%'
    },
    username: {
        marginRight: 10,
        fontWeight: 700
    },
    commenttext: {
        marginRight: 10,
        fontSize: 18,
        margin: '0 0 10px 10px'
    },
    commenttime: {
        color: '#202020'
    }
}))



function CommentSection() {
    const classes = useStyles();

    const comments = [
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        {
            username: "person1 name",
            time: "Fri Nov 19 2021",
            comment: "this article is great I refer this wo all who are troubling with react"
        },
        
    ]

    return (
        <>
        <Box className={classes.allcomment}>
            {
                comments.map(values=>(
                    <Box className={classes.comment}>
                        <Box style= {{display:'flex'}}>
                            <Typography className={classes.username}>{values.username}</Typography>
                            <Typography className={classes.commenttime}>{values.time}</Typography>
                        </Box>
                        <Typography className={classes.commenttext}>{'- ' + values.comment}</Typography>
                    </Box>
                ))
            }
        </Box>
        <Box className={classes.commentBox}>
            <TextareaAutosize
                rowsMin={5}
                placeholder="Add Comment.." 
                className={classes.addComment}
                name="addcomment"
            />
            <Button variant='contained' style={{ height: '40px'}} color='primary'>Comment</Button>

        </Box>
        </>
    )
}

export default CommentSection
