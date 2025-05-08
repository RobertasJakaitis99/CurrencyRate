import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Typography, Container, Box, Button, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Container sx={{ mt: 5 }}>
        <Paper elevation={2} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
          <Typography variant="h4" gutterBottom>
            {t("home.welcome")}
          </Typography>
          <Typography variant="body1" paragraph>
            {t("home.description")}
          </Typography>

          {/* Pridėtas mygtukas, kuris nukreipia tiesiai į konverterį */}
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              variant="contained"
              component={Link}
              to="/converter"
              size="large"
              color="primary"
            >
              {t("home.tryConverter")}
            </Button>
          </Box>
        </Paper>

        {/* Papildoma informacija */}
        <Box
          mt={5}
          display="flex"
          flexWrap="wrap"
          gap={3}
          justifyContent="space-between"
        >
          <Paper
            elevation={1}
            sx={{ p: 3, flex: "1 1 300px", borderRadius: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              Valiutų konvertavimas
            </Typography>
            <Typography variant="body2">
              Konvertuokite valiutas realiu laiku naudodami mūsų patogų įrankį.
              Palaikome daugiau nei 30 skirtingų valiutų.
            </Typography>
          </Paper>

          <Paper
            elevation={1}
            sx={{ p: 3, flex: "1 1 300px", borderRadius: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              Konversijų istorija
            </Typography>
            <Typography variant="body2">
              Prisijungę galėsite matyti savo atliktų konversijų istoriją,
              redaguoti ir trinti įrašus.
            </Typography>
          </Paper>

          <Paper
            elevation={1}
            sx={{ p: 3, flex: "1 1 300px", borderRadius: 2 }}
          >
            <Typography variant="h6" gutterBottom>
              Profilio valdymas
            </Typography>
            <Typography variant="body2">
              Tvarkykite savo paskyros informaciją, keiskite slaptažodį ir kitus
              nustatymus.
            </Typography>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
