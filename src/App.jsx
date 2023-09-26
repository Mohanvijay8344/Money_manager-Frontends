import Color from "./Color";
import "./App.css";
import { useState } from "react";
import { PriceHistoryTable } from "./PriceHistoryTable";
import { TotalRates } from "./TotalRates";
import { useEffect } from "react";
import { API } from "./global.js";
import { Routes, Route, Link, Navigate,useNavigate } from "react-router-dom";
import { Forgot } from "./Forgot";
import { SignIn } from "./SignIn";
import SignUp from "./signup";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';

function checkAuth(res) {
  if (res.status === 401) {
    throw Error("Unauthorized");
  } else {
    return res.json();
  }
}


export default function App() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/Money`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("An error occurred while fetching data:", error);
      }
    };
  
    fetchData();
  }, []);
  

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  
  return (
    <div>
      <MenuAppBar />
      <p className="welcome">
        <h1>Welcome to Money Manager ❤️💕😍</h1>
      </p>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route
          path="money-manager"
          element={
            <ProtectedRoute>
              <TotalRates users={users} etUsers={setUsers} />
              <PriceHistoryTable setUsers={setUsers} users={users} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  return token ? <section>{children}</section> : <Navigate replace to="/" />;
}

function Error() {
  return (
    <div className="error">
      <img
        className="error"
        src="https://t3.ftcdn.net/jpg/02/29/46/30/360_F_229463039_B4KwKD6ifdRV8G5S0sqrzBrAfHNzpReq.jpg"
        alt="error"
      />
    </div>
  );
}

export function MenuAppBar() {

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    localStorage.removeItem('token');
    window.location.reload();

  };


  return (
    <Box sx={{ flexGrow: 1 }}>
      
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Welcome Admin !!!
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <PowerSettingsNewIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                
                <MenuItem onClick={handleClose}>LogOut</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

