import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Bienvenido a KartingRM
        </Typography>
        <Typography variant="body1" gutterBottom>
          Proyecto de Taller de Ingenieria de Software
        </Typography>
        <Typography variant="body1">
          Escoge una opcion xd
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
