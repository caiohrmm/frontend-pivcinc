import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useState, useContext } from "react";

import LogoImage from "../../../../public/logo.png";

import { Context } from "../../../context/UserContext";
import { Link } from "react-router-dom";

import ModalComponent from "./modal/ModalComponent";

function Navbar() {
  const { authenticated } = useContext(Context);

  const { logout } = useContext(Context);

  const pagesAuth = ["Seguindo", "Postagens", "Meu Perfil"];

  const pagesWithoutAuth = ["Fazer Login", "Registrar"];

  const [open, setOpen] = useState(false);

  const pageLinks = {
    Seguindo: "/following",
    Postagens: "/posts",
    "Meu Perfil": "/user/profile",
    "Fazer Login": "/login",
    Registrar: "/register",
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{ display: "flex", justifyContent: "center", height: "100px" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={LogoImage}
              alt="Logo"
              style={{
                height: "40px",
                width: "auto",
                marginRight: "0.5em",
                marginBottom: "3.5px",
              }}
            />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {authenticated ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/dashboard"} className="navbar-links">
                      <Typography textAlign="center">Postagens</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/dashboard"} className="navbar-links">
                      <Typography textAlign="center">Seguindo</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/user/profile"} className="navbar-links">
                      <Typography textAlign="center">Meu Perfil</Typography>
                    </Link>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/register"} className="navbar-links">
                      <Typography textAlign="center">Registrar</Typography>
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to={"/login"} className="navbar-links">
                      <Typography textAlign="center">Fazer Login</Typography>
                    </Link>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={LogoImage}
              alt="Logo"
              style={{ height: "40px", width: "auto", marginRight: "5px" }}
            />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {authenticated
              ? pagesAuth.map((page) => (
                  <>
                    <Link to={pageLinks[page]} className="navbar-links">
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  </>
                ))
              : pagesWithoutAuth.map((page) => (
                  <>
                    <Link to={pageLinks[page]} className="navbar-links">
                      <Button
                        key={page}
                        onClick={handleCloseNavMenu}
                        sx={{ my: 2, color: "white", display: "block" }}
                      >
                        {page}
                      </Button>
                    </Link>
                  </>
                ))}
          </Box>

          {authenticated && (
            <>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Link to={"/user/profile"} className="navbar-links">
                      <Typography textAlign="center">Meu Perfil</Typography>
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Dashboard</Typography>
                  </MenuItem>
                  <MenuItem onClick={() => setIsOpen(true)}>
                    <Typography textAlign="center">Logout</Typography>
                  </MenuItem>
                  <ModalComponent
                    isOpen={isOpen}
                    handleModal={setIsOpen}
                    title={"Você está a um passo de sair do sistema!"}
                    buttonConfirm={"Sair"}
                    action={logout}
                  />
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
