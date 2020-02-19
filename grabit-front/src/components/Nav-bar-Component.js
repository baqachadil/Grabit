import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
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
  const background = '/static/headerImg.png'
  
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
      console.log("connecting to fb ....")
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
    <Grid container justify='center' spacing={2} style={{height: '650px', backgroundImage: `url(${background})`,backgroundPosition:'center', backgroundRepeat: 'no-repeat', padding:'60px' }}  alignItems="flex-start">
      <Grid item xs={1}></Grid>
      <Grid item xs={3}>
        <img alt='GrabitLogo' src="/static/GrabitLogo.png"/>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={2}>
      {auth ? 
                <div>
                  <img style={{cursor: 'pointer', borderRadius: '100%'}} onClick={handleMenu} alt={currentUser?.name} src={currentUser?.image}/>                  
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
                :
                <div>
                  <Button onClick={handleOpenModal} style={{backgroundColor: 'red', color: 'white', marginTop: '5px', minWidth: '70px', width: '100px'}}>Sign in</Button>
                  <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classesModal.modal}
                      open={opened}
                      onClose={handleCloseModal}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{timeout: 500,}}
                  >
                  <Fade style={{ borderRadius: '3%', textAlign: 'center'}} in={opened}>
                    <div className={classesModal.paper}>
                      <h3>Sign in</h3>
                      <hr />
                      <FacebookAuth componentClicked={componentClicked} responseFacebook={responseFacebook} />
                    </div>
                  </Fade>
                </Modal>
              </div>                
              } 
      </Grid>
      <Grid item xs={12} style={{textAlign: 'center'}}>
            <span style={{color: 'white', fontSize: '60px', margin: 'auto', fontFamily :'Montserrat'}}>
              we <i><b>deliver</b></i> it to your <b>door</b> within <br/>
              <b>one hour</b>
            </span>
      </Grid>
      <Grid item xs={4}>
            <div style={{  height:'80px', border: '1px white solid', borderRadius:'3%', padding:'30px'}}>
                <img src="/static/helmet.png" style={{top: '10px',left: '10px' }} />
                <h4 style={{color:'white', fontFamily:'Montserrat'}}>sign up as Driver</h4>
            </div>
      </Grid>
      <Grid item xs={4}>
            <div style={{  height:'80px', border: '1px white solid', borderRadius:'3%', padding:'30px'}}>
                <img src="/static/user.png" style={{top: '10px',left: '10px' }} />  
                <h4 style={{color:'white', fontFamily:'Montserrat'}}>sign up as Customer</h4>          
            </div>
      </Grid>
    </Grid>
  );
}