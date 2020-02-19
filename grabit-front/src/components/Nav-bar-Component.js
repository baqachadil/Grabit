import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import FacebookAuth from './facebook-Component';
import axios from 'axios'


const useStylesModal = makeStyles(theme => ({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const classesModal = useStylesModal();
  const [opened, setOpened] = React.useState(false);
  const [token, setToken] = React.useState()
  const [currentUser, setcurrentUser] = React.useState()
  
  useEffect(() => {
    if(typeof currentUser === 'undefined'){
      const config = {
        headers: {
          Authorization: "Bearer "+localStorage.getItem('JwtToken'),
        }
      }
      axios.get('/users/getCurrentUser',config).then(res => {
        setcurrentUser({name: res.data.Name, image: res.data.image})
      })
    } 
  }, [currentUser])


  useEffect(() => {
      if(localStorage.getItem('JwtToken')){
        setAuth(true)
        setToken(localStorage.getItem('JwtToken'))             
      }else{
        setAuth(false)
      }

  },[token])

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogOut = () => {
      setAuth(false)      
      setToken('')      
      localStorage.removeItem('JwtToken')
  }

  const componentClicked = () => {
    setOpened(false)
    setAnchorEl(null);
  }

    const responseFacebook = async data =>{
        const user = {
            id: data.id,
            Name: data.name,
            email: data.email,
            image: data.picture.data.url
        }
        axios.post('/users/auth',user).then(res => {
            localStorage.setItem('JwtToken', res.data.token)
            setToken(res.data.token)
            setAuth(true)
        }).catch(err => {
            console.log(err.message)
        })

    } 

  const handleOpenModal = () => {
    setOpened(true);
  };

  const handleCloseModal = () => {
    setOpened(false);
  };

  return (
    <div className={classes.root}>
      
      <AppBar style={{minWidth : '350px'}} position="static">
        <Toolbar>        
          <img alt='GrabitLogo' src="/GrabitLogo.png"/>
          <Typography variant="h6" className={classes.title}>
            Grabit
          </Typography>
          {auth && (
            <div>
            <Grid container spacing={0}>
              <Grid item xs={6} sm={6} lg={6}>
                <span >Hello, {currentUser?.name}</span>
              </Grid>
              <Grid item xs={6} sm={6} lg={6}>
                <Avatar style={{cursor: 'pointer'}} onClick={handleMenu} alt={currentUser?.name} src={currentUser?.image} />
              </Grid>
            </Grid>                            
              <Menu
                id="menu-appbar"
                getContentAnchorEl={null}
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={onLogOut}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
          {!auth && 
            <div>
      <Button  color="inherit" onClick={handleOpenModal}>
        Login
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classesModal.modal}
        open={opened}
        onClose={handleCloseModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={opened}>
          <div className={classesModal.paper}>
            <FacebookAuth componentClicked={componentClicked} responseFacebook={responseFacebook} />
          </div>
        </Fade>
      </Modal>
    </div>
          } 
        </Toolbar>
      </AppBar>
    </div>
  );
}