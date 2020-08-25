import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { IoMdCart,IoIosLogOut } from "react-icons/io";
import history from '../history'
import {logOut} from '../Config/Functions/Functions'
import { FaDropbox, FaProductHunt, FaTrash, FaEdit } from "react-icons/fa";
import Badge from '@material-ui/core/Badge';
import Popup from "reactjs-popup";
import Button from '@material-ui/core/Button';
import logo from '../Images/logo.png';
import './Drawer.css'




const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  sectionDesktop: {
    marginLeft:"78%",
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  tdwidth:{
    width:100
  },

}));

export default function (props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }


  var value = props.value;
  const scrollContainerStyle = { width: "350px", maxHeight: "300px" }

  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        style={{color: "#fff", backgroundColor: "#6cb860",}}
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} width="70" height="70" />
          <p style={{fontSize:'1.2em',fontFamily:'roboto'}}>Lavish Electronics</p>

          <div  className={classes.sectionDesktop} >
            <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={value ? value.length : 0} color="secondary">
                <Popup
                  className="popup-content"
                  trigger={<img src="http://pngimg.com/uploads/shopping_cart/shopping_cart_PNG37.png" width="25" />}
                  position="bottom right"
                  on="hover"
                >
                  <div>
                  <div
                    className="scrollbar scrollbar-primary  mt-5 mx-auto"
                    style={scrollContainerStyle}
                  >
                    <div >
                      <table>
                        {value.map((val,i)=>{
                          return <tr className="products">
                          <td>
                          <Badge badgeContent={val.quantity} color="secondary">
                            <img
                              src={val.image}
                              align="middle"
                              className="td-width"
                              width="50"
                              height="50"
                            />
                          </Badge>
                        </td>
                        <td className="td-name">
                          <span>
                            {val.name}
                          </span>
                          <br />
                          <span className="td-price">Rs. {val.SellPrice}</span>
                        </td>
                        <td>
                          <span onClick={()=>{
                            value.splice(i,1);
                            localStorage.setItem('cartDetail',JSON.stringify(value))
                          }} className="td-close">X</span>
                        </td>
                        </tr>
                        })}
                      </table>
                    </div>
                    </div>
                    <Button  size="large" onClick={()=>{history.push('/CartDetail',{value})}} style={{ color: "#fff", backgroundColor: "#6cb860", marginTop: "10px",  }}>
                    <IoMdCart /> View Cart
                      </Button>
                    </div>
                </Popup>
              </Badge>
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <List>
          <ListItem button onClick={()=>history.push('/Dashboard',{value})}>
          <img src={DashboardIcon}  width="100px"/> <span style={{marginLeft: '20px'}}>Dashboard</span> 
          </ListItem> 
          <ListItem button onClick={()=>history.push('/AddProduct',{value})}>
          <FaProductHunt /> <span style={{marginLeft: '20px'}}>Add Product</span>
          </ListItem>
          <ListItem button onClick={()=>history.push('/EditProduct',{value})}>
          <FaEdit /> <span style={{marginLeft: '20px'}}>Edit Product</span>
          </ListItem>
          <ListItem button onClick={()=>history.push('/DeleteProduct',{value})}>
          <FaTrash /> <span style={{marginLeft: '20px'}}>Delete Product</span>
          </ListItem>
          <ListItem button onClick={async ()=>{
            try{
              let user = await logOut();
              console.log(user);
              history.push('/',{value})
            }
            catch(err){
              console.log(err.message)
            }
          }}>
          <IoIosLogOut size='20' /> <span style={{marginLeft: '20px'}}>Log Out</span>
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        
      </main>
    </div>
  );
}