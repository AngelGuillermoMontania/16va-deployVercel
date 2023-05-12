import * as React from "react";
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
import Cart from "./Cart";
import { TbShoe } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useEffect } from "react";
import ButtonLogin from "./ButtonLogin";
import ButtonLogout from "./ButtonLogout";

import { useAuth0 } from "@auth0/auth0-react";

const pages = ["Deportivas", "Zapatos", "Urbanas"];

function NavBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const { isAuthenticated, user } = useAuth0();

  console.log(user);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { recargarCarrito, setCart } = useContext(CartContext);

  useEffect(() => {
    const carritoStorage = JSON.parse(localStorage.getItem("cart"));
    setCart(carritoStorage);
  }, []);

  return (
    <AppBar position="static" style={{ backgroundColor: "rgb(26, 32, 39)" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              color: "white",
              display: "flex",
              alignItems: "center",
            }}
          >
            <TbShoe style={{ fontSize: "40px" }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
              }}
            >
              CalzaTodo
            </Typography>
          </Link>

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
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Link to={`/category/${page}`} relative="path">
                    <Typography textAlign="center">{page}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
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
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page} to={`/category/${page}`} relative="path">
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Link to="/cart">
            <Cart />
          </Link>
          {user?.email === "adaAdmin@gmail.com" ? (
            <Typography>ADMIN</Typography>
          ) : (
            ""
          )}

          {isAuthenticated ? (
            <>
              <Avatar
                alt="not found"
                src={user.picture}
                style={{ margin: "0 10px" }}
              />{" "}
              <ButtonLogout />
            </>
          ) : (
            <ButtonLogin />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
