import React from "react";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import clsx from 'clsx';
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationsActive from "@material-ui/icons/Notifications";
import Popup from "reactjs-popup";
import AssignmentSharpIcon from "@material-ui/icons/AssignmentSharp";
import HomeIcon from "@material-ui/icons/Home";
import firebaseApp from "./../../Config/Firebase/Firebase";
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import { IoMdCart, IoIosLogOut } from "react-icons/io";
import { FaDropbox, FaProductHunt, FaTrash, FaEdit } from "react-icons/fa";
import DashboardIcon from './../../assets/dashboard.png';
import StateIcon from './../../assets/apartment.png';
import ClassIcon from './../../assets/class.png';
import SubjectIcon from './../../assets/subject.png';
import QuestionIcon from './../../assets/question.png';
import classroomIcon from './../../assets/classroom.png'

import "./Appbar.css";
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
    backgroundColor: "white",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  let logout = () => {
    firebaseApp
      .auth()
      .signOut()
      .then((res) => {
        console.log(" Sign-out successful.");
        props.props.push("/");
        localStorage.romoveItem("currentuser");
        localStorage.romoveItem("teacherEmail");
      })
      .catch(function (error) {
        console.log(error.message);
        // An error happened.
      });
  };
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  function handleDrawerOpen() {
    setOpen(true);
  }

  function handleDrawerClose() {
    setOpen(false);
  }

  const handleMobileMenuClose = () => {
    logout();

    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    // alert()
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      style={{ marginTop: 40 }}
    >
      {/* <MenuItem onClick={handleMenuClose}>Profile</MenuItem> */}
      <MenuItem onClick={handleMenuClose}>Log out</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            {props.notification !== undefined ? props.notification.map((val, i) => (
              <NotificationsIcon />
            )) : null}
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  console.log(props.notification);
  return (
    <div className={classes.grow}>
      <AppBar
        position="static"
        style={{ padding: 5, backgroundColor: "#08a0d3" }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
          >
            <HomeIcon style={{ fontSize: 35 }} />
          </IconButton>
          <Typography className="_title" variant="h6" noWrap>
            QUIZ ADMIN PANEL
          </Typography>

          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
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
          <ListItem button onClick={() => props.props.push('/instruction')} style={{ padding: "10px" }}>
            <img src={DashboardIcon} width="25px" /> <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Dashboard</span>
          </ListItem>
          <ListItem button onClick={() => props.props.push('/AllClasses')} style={{ padding: "10px" }}>
            <img src={classroomIcon} width="25px" />  <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>All Classes</span>
          </ListItem>
          <ListItem button onClick={() => props.props.push('/AddState')} style={{ padding: "10px" }}>
            <img src={StateIcon} width="25px" />  <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Add State</span>
          </ListItem>
          <ListItem button onClick={() => props.props.push('/ClassCategory')} style={{ padding: "10px" }}>
            <img src={ClassIcon} width="25px" />  <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Add Class</span>
          </ListItem>
          <ListItem button onClick={() => props.props.push('/ChapterSubject')} style={{ padding: "10px" }}>
            <img src={SubjectIcon} width="25px" />  <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Add Subjects</span>
          </ListItem>
          <ListItem button onClick={() => props.props.push('/AddQuestion')} style={{ padding: "10px" }}>
            <img src={QuestionIcon} width="25px" />  <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Add Questions</span>
          </ListItem>
          <ListItem button
            style={{ padding: "10px" }}
            onClick={async () => {
              // try{
              //   let user = await logOut();
              //   console.log(user);
              //   history.push('/')
              // }
              // catch(err){
              //   console.log(err.message)
              // }
            }}>
            <IoIosLogOut size='30' color="#08a0d3" /> <span style={{ marginLeft: '20px', color: "#08a0d3", fontFamily: "'Source Sans Pro', sans-serif", fontSize: 20 }}>Log Out</span>
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
