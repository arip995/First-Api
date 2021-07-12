import React from 'react'
import { useEffect, useState } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import AppBar from '@material-ui/core/AppBar';
import TableCell from '@material-ui/core/TableCell';
import {alpha, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import InputBase from '@material-ui/core/InputBase';
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
const axios = require('axios');
const useStyles = makeStyles((theme) =>({
  table: {
    marginTop:65,
    minWidth: 650
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  
}));

const Data=()=> {
    const [rows,setRows] = useState([]);
    const [d,setDelete] = useState(true);
    
    useEffect(()=>{
        axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res=>{
        setRows(res.data)
    })
    .catch(err=>console.log(err))
    
    }, [])

    const classes = useStyles();
    const totalDelete = () =>{
      setDelete(false);
      setRows(rows.filter(item=>item.id ===100));
    }
    const handleFilter = (e) =>{
      setRows(rows.filter(item=>(item.name.toLowerCase()).includes(e.toLowerCase())))
      //setRows(rows.filter(item=>item.name===e))
    }

    const handleDelete = (id) =>{
      setRows(rows.filter(item=>item.id !==id));
    }
   
    return (
      
      
        <TableContainer component={Paper}>
          <div className={classes.grow}>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>

        
          <Typography className={classes.title} variant="h6" noWrap>
            Filter
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              onChange={(event)=>{handleFilter(event.target.value)}}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          


          <div className={classes.grow} />
         
        </Toolbar>
      </AppBar>
    </div>
          
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{fontSize:25,fontFamily:'inherit',fontStyle:'oblique'}}>UserName</TableCell>
            <TableCell style={{fontSize:25,fontFamily:'inherit',fontStyle:'oblique'}}>Name</TableCell>
            <TableCell style={{fontSize:25,fontFamily:'inherit',fontStyle:'oblique'}}>Email</TableCell>
            <TableCell style={{fontSize:25,fontFamily:'inherit',fontStyle:'oblique'}}>Phone Number</TableCell>
            <TableCell style={{fontSize:25,fontFamily:'inherit',fontStyle:'oblique'}}>Website</TableCell>
            {d?
            <>
            <TableCell onClick={()=>{totalDelete()}} ><DeleteIcon></DeleteIcon></TableCell>
            </>:""
            }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows!==[] && rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell >{row.name}</TableCell>
              <TableCell >{row.email}</TableCell>
              <TableCell >{row.phone}</TableCell>
              <TableCell >{row.website}</TableCell>
              <TableCell onClick={()=>{console.log(row.id);handleDelete(row.id)}} ><DeleteIcon></DeleteIcon></TableCell>
            </TableRow>
          ))}
         
        </TableBody>
      </Table>
    </TableContainer>
    )
}

export default Data
