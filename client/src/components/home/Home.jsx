import { Grid } from "@material-ui/core";
import { useContext } from "react";
import { UserContext } from "../../App";
import Banner from "./Banner"
import Categories from "./Categories";
import Posts from "./Posts";



const Home = () => {
    const {state, dispatch} = useContext(UserContext)

    if(localStorage.getItem('username')) {
        dispatch({type: "USER", payload: true})
      } 
      else {
        dispatch({type: "USER", payload: false})
      }

    return (
        <>
        <Banner/>
        <Grid container>
            <Grid item lg={2} xs={12} sm={2}>
                <Categories/>
            </Grid>
            <Grid container item lg={10} xs={12} sm={10}>
                <Posts/>
            </Grid>
        </Grid>
        </>
    )
}

export default Home;