import { Button, makeStyles, TableBody, Table, TableCell, TableRow, TableHead } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom';
import { categories } from '../constants/data';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles({
    create: {
        margin: 16,
        background: '#6495ED',
        color: "#FFFFFF",
        width: '90%',
    },
    table: {
        border: '2px solid rgba(224, 224, 224, 1)'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})

function Categories() {

    const classes = useStyles();
    const history = useHistory();
    const createBlog = (e) => {
        if(localStorage.getItem('token')) history.push('/create');
        else history.push('/login')
    }

    return (
        <>
            {/* <Link to={'/create'} className={classes.link} >
                <Button variant="contained" className={classes.create}>Create Blog</Button>
            </Link> */}
            <Button variant="contained" onClick={createBlog} className={classes.create}>Create Article</Button>
            <Table className={classes.table}> 
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link to={'/'} className={classes.link}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category=>(
                            <TableRow>
                                <TableCell>
                                    <Link to={'/?category='+category} className={classes.link}>
                                        {category}
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </>
    )
}

export default Categories
