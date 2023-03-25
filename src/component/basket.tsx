import { Drawer, Box, Typography } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import { setBasketItems } from "../store/features/basket/basket";

export const Basket = () => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket.items);

  const changeAmount = (item: any, val: number, index: number) => {
    let newAmount = item.amount + val;
    newAmount < 1 ? (newAmount = 1) : (newAmount = newAmount);

    let items = [...basket];
    items[index] = { ...item, amount: newAmount };
    dispatch(setBasketItems(items));
    localStorage.setItem("basket", JSON.stringify(items));
  };

  return (
    <>
      <ul className="basket-ul">
        {basket.map((item, index) => (
          <>
            <li className="basket-item" key={"item-b" + item.id}>
              <img src={item.thumbnail} alt="" />
              <div className="div-amount">
                <button
                  disabled={item.amount == 1 ? true : false}
                  onClick={() => changeAmount(item, -1, index)}
                  className="counter right"
                >
                  -
                </button>
                <span className="amount">{item.amount}</span>
                <button
                  onClick={() => changeAmount(item, 1, index)}
                  className="counter left"
                >
                  +
                </button>
              </div>
              <div className="price">{item.price} $</div>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteOutlinedIcon
                    className="delete"
                    onClick={() => {
                      const items = basket.filter((x) => x.id !== item.id);
                      dispatch(setBasketItems(items));
                      localStorage.setItem("basket", JSON.stringify(items));
                    }}
                  ></DeleteOutlinedIcon>
                </IconButton>
              </Tooltip>
            </li>
            <div className="total">
              Toplam :{" "}
              {basket
                .reduce((toplam, product) => {
                  return toplam + product.amount * Number(product.price);
                }, 0)
                .toLocaleString("tr-TR")}{" "}
              $
            </div>
          </>
        ))}
        {basket.length == 0 && <p>Sepetinizde ürün bulunmamaktadır.</p>}
      </ul>
    </>
  );
};
