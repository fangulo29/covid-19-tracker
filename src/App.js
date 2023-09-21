import React, { Suspense, lazy } from "react";
import { Route, useLocation, Routes, Navigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const Home = lazy(() => import("./pages/Home"));
const HistoricStats = lazy(() => import("./pages/HistoricStats"));

const drawerWidth = 240;

function App(props) {
  const location = useLocation();

  const pages = [
    {
      pageLink: "/currentstats",
      view: Home,
      displayName: "Current stats",
      showInNavbar: true,
    },
    {
      pageLink: "/historicstats",
      view: HistoricStats,
      displayName: "Historic Stats",
      showInNavbar: true,
    },
  ];

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar>Covid-19 USA Tacker</Toolbar>
      <Divider />
      <List>
        {pages.map((page, index) => (
          <ListItem disablePadding>
            <ListItemButton to={page.pageLink} key={index} disablePadding>
              <ListItemText primary={page.displayName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className="App">
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              ⬅️
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              Covid-19 USA Tacker
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />
          <Container>
            <Suspense fallback={<div />}>
              <Routes location={location}>
                {pages.map((page, index) => {
                  return (
                    <Route
                      exact
                      path={page.pageLink}
                      element={<page.view />}
                      key={index}
                    />
                  );
                })}
                <Route
                  path="/"
                  element={<Navigate replace to="/currentstats" />}
                />
              </Routes>
            </Suspense>
          </Container>
        </Box>
      </Box>
    </div>
  );
}

export default App;
