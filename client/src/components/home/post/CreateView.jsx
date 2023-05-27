import { makeStyles } from '@material-ui/styles';
import {Box, Button, TextareaAutosize,createTheme, InputBase, FormControl} from '@material-ui/core'
import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { AddCircle} from '@material-ui/icons';
import { createPost, uploadFile } from '../../../service/api';
import CategoriesMenu from './CategoriesMenu';

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
    username: 'myuser1',
    categories: 'All',
    article: "",
    createdDate: new Date()
}

function CreateView() {
    const classes = useStyles();

    const history = useHistory();
    const [post, setPost] = useState(initialValues);
    const [file, setFile] = useState('');
    const [image, setImage] = useState('');

    const url = post.picture? post.picture:'https://cdn.pixabay.com/photo/2021/02/01/06/48/geometric-5969508_960_720.png';


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
        post.username = localStorage.getItem('username')
        console.log("savePost")
        await createPost(post);
        history.goBack()
    }

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

                <Box style={{margin: 16, background: '#6495ED',color: "#FFFFFF",}}> <CategoriesMenu/> </Box>


                <Button variant='contained' 
                    onClick={savePost}
                    className={classes.uploadImage}
                    style={{  width: 150,  marginLeft: 'auto'}}>Publish</Button>
            </FormControl>

            <InputBase 
                    onChange={handleChange} 
                    className={classes.textarea} 
                    placeholder="Title"
                    name = "title"
                />

            <TextareaAutosize
                rowsMin={5}
                onChange={handleChange} 
                placeholder="Write Description in Few lines" 
                className={classes.textarea}
                name="description"
            />

            <TextareaAutosize
                rowsMin={5}
                onChange={handleChange} 
                placeholder="Write Article.." 
                className={classes.textarea}
                name="article"
            />
        </Box>
    )
}

export default CreateView
