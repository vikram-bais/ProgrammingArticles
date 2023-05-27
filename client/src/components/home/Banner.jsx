
import { makeStyles, Typography } from "@material-ui/core";
import { Box } from "@material-ui/core";
const useStyles = makeStyles({
    image: {
        background: 'url("https://cdn.pixabay.com/photo/2016/11/05/12/38/fuzzy-1800136_960_720.jpg") center',
        width: '100%',
        height: '40vh',
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& :first-child': {
            fontSize: 60,
            color: '#FFFFFF',
            lineHeight: 1.5,
        },
        '& :last-child': {
            fontSize: 20,
            background: '#FFFFFF',
            padding: 2,
        }
        
    }
})


const Banner = () => {
    const classes = useStyles();
    // console.log(typeof makeStyles);
    return (
        <Box className={classes.image}>
            <Typography> Programming Articles</Typography>
            <Typography>{'  Find articles related to programming here  '}</Typography>
        </Box>
    )
}


export default Banner;