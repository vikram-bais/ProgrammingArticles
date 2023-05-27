import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';
import Post from './Post'
import {getAllPost} from '../../service/api'


function Posts() {
    // let posts = [1, 2, 3, 4, 5, 6, 7 ,8, 9, 10];

    const [posts, setPosts] = useState([])
    const {search} = useLocation();

    useEffect(()=> {
        const fetchData = async ()=> {
            console.log("working ..")

            let data = await getAllPost(search);
            // console.log("useEffect: ", data)
            setPosts(data.posts)
        }
        fetchData();
    }, [search])

    return (
        posts.map(post=>(
            <Grid item lg={3} sm={6} xs={12}>
                <Link to={'/details/'+post._id} style ={{textDecoration: 'none', color: 'inherit'}} >
                    {/* {console.log("post: ", post)} */}
                    <Post post={post} />
                </Link>
            </Grid>
        ))
    )
}

export default Posts
