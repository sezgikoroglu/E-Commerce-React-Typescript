import { Link, Outlet } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Drawer, Box, Typography, IconButton } from "@mui/material";
import { useState } from "react";
import { Basket } from "../component/basket";
import { Badge } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Tooltip from "@mui/material/Tooltip";
const Layout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const basket = useSelector((state: RootState) => state.basket);
  return (
    <div>
      <header className="header-01">
        <div className="c-wrapper">
          <Link to={"/"} className="c-item-02">
            E-Commerce
          </Link>
          <Badge badgeContent={basket.items.length} color="info">
            <ShoppingCartCheckoutIcon
              className="basket-icon"
              onClick={() => setIsDrawerOpen(true)}
            ></ShoppingCartCheckoutIcon>
          </Badge>

          <Drawer
            anchor="right"
            open={isDrawerOpen}
            onClose={() => setIsDrawerOpen(false)}
          >
            <Box p={2} width="400px" role="presentation" textAlign="center">
              <Typography variant="h6" component="div">
                <div className="title-card">My Card</div>
                <Tooltip title="Close">
                  <button
                    className="x-btn"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    X
                  </button>
                </Tooltip>
                <Basket />
              </Typography>
            </Box>
          </Drawer>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <footer></footer>
    </div>
  );
};

export default Layout;
