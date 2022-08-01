import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import {Product} from "models/Product";
import CartIcon from "@material-ui/icons/ShoppingCart";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";
import IconButton from "@material-ui/core/IconButton";
import {useDispatch, useSelector} from "react-redux";
import {addToCart, selectCartItems, removeFromCart} from "store/cartSlice";
import {ONE} from '../../constants/contants'

type AddProductToCartProps = {
  product: Product
};

export default function AddProductToCart({ product }: AddProductToCartProps) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.product.id === product.id);

  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    if (cartItem ? product.count <= cartItem.count : product.count < ONE) {
      setIsDisabled(true);
    }
  }, [product]);

  return (
    <>
      {cartItem ? (
        <>
          <IconButton onClick={() => dispatch(removeFromCart(product))}>
            <Remove color={"secondary"} />
          </IconButton>
          <Typography align="center">{cartItem.count}</Typography>
          <IconButton
            disabled={isDisabled}
            onClick={() => dispatch(addToCart(product))}
          >
            <Add color={"secondary"} />
          </IconButton>
        </>
      ) : (
        <IconButton
          disabled={isDisabled}
          onClick={() => dispatch(addToCart(product))}
        >
          <CartIcon color={"secondary"} />
        </IconButton>
      )}
    </>
  );
}