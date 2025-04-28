import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          KartingRM
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/karts">
            Karts
          </Button>
          <Button color="inherit" component={Link} to="/calendar">
            Calendario
          </Button>
          <Button color="inherit" component={Link} to="/rent">
            Reservacion
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
