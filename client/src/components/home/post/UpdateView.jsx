import { makeStyles } from '@material-ui/styles';
import {Box, Button, TextareaAutosize,createTheme, InputBase, FormControl} from '@material-ui/core'
import React from 'react'

import { useEffect, useState } from 'react'


import { AddCircle} from '@material-ui/icons';
import { getPost, updatePost, uploadFile } from '../../../service/api';
import { useHistory } from 'react-router';
const theme = createTheme();

const useStyles = makeStyles(()=>({
    container: {
        padding: '0 80px',
        [theme.breakpoints.down('md')]: {
            padding: '0 10px'
        }
    },
    image: {
        height: '50vh',
        width: '100%',
        objectFit: 'cover',
    },
    form: {
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20
    },
    textFeild: {
        flex: 1,
        margin: '0 30px',
        fontSize: 25
    },
    textarea: {
        width: '100%',
        marginTop: 20,
        border: 'none',
        fontSize: 18,
        '&:focus-visible': {
            // outline: 'none',
        }
    },
    uploadImage: {
        margin: 16,
        background: '#6495ED',
        color: "#FFFFFF",
        width: '90%',
    },
})
)

const initialValues = {
    title: '',
    description: '',
    picture: '',
    username: 'myuser',
    article: "",
    categories: 'All',
    createdDate: new Date()
}

function UpdateView({match}) {
    const classes = useStyles();

    const [file, setFile] = useState('');
    const [image, setImage] = useState('');
    const [post, setPost] = useState(initialValues);
    const url = post.picture? post.picture:'https://cdn.pixabay.com/photo/2021/02/01/06/48/geometric-5969508_960_720.png';


    const history = useHistory();

    useEffect(()=>{
        const fetchData = async () => {
            // console.log("update fetchData st ", match.params)
            let data = await getPost(match.params.id);
            setPost(data.post);
        }
        fetchData();
    }, [])

    useEffect(()=> {
        // console.log("createview useEffect")
        const getImage = async ()=>{
            if(file) {
                const data = new FormData();
                data.append("name", file.name);
                data.append("file", file);
                // console.log("useEffect", data)

                const response = await uploadFile(data)
                post.picture = response.data
                setImage(response.data)
            }
        }
        getImage();
    }, [file])

    function handleChange(e) {
        e.preventDefault();
        setPost({ ...post, [e.target.name]: e.target.value}) 
    }

    async function savePost(e) {
        // console.log("savePost")
        setPost(post);
        await updatePost(match.params.id, post);
        history.push('/details/'+match.params.id)
    }
{/* <AddCircle fontSize='large' color='action'/> */}
    return (
        <Box className={classes.container}>
            <img className={classes.image} src={url} alt="Image" />
            <FormControl className={classes.form}>

                <label htmlFor="fileInput">
                    <Button variant="contained" component="span" className={classes.uploadImage}>Upload Image</Button>
                </label>
                <input 
                    type="file" 
                    id="fileInput" 
                    style={{display: 'none'}}
                    onChange = {(e) => setFile(e.target.files[0])}
                />


                <InputBase 
                className={classes.textFeild} 
                value = {post.title}
                placeholder="Title"
                onChange={handleChange}
                name="title"
                />
                <Button variant='contained' style={{  margin: 16, background: '#6495ED', color: "#FFFFFF"}} onClick={savePost}>Update</Button>
            </FormControl>

            <TextareaAutosize
                rowsMin={5}
                onChange={handleChange} 
                placeholder="Write Description in Few lines" 
                className={classes.textarea}
                value = {post.description}
                name="description"
            />

            <TextareaAutosize
                minRows={5}
                placeholder="Write Article.." 
                className={classes.textarea}
                value = {post.article}
                onChange={handleChange}
                name = "article"
            />
        </Box>
    )
}

export default UpdateView
