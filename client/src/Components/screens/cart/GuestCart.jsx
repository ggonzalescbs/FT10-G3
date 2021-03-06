import React from "react";
import { useSelector } from "react-redux";
import { useQuery, gql } from "@apollo/client";
// import {useDispatch} from 'react-redux';
// import {removeAll} from '../../../actions/cartActions';
//styles
import styled from "styled-components";
//components
import ProductOnCart from "./ProductOnCart";
import EmptyAlert from "./EmptyAlert"
import TotalToOrder from "./TotalToOrder"

const GuestCart = () => {
  // const dispatch = useDispatch()
  let { itemsToCart } = useSelector((state) => state.cart);
  let productsArray = itemsToCart.map((elem) => elem.id);
  productsArray = JSON.stringify(productsArray);

  // const resetCartHandler = () => {
  //   dispatch(removeAll())
  // }

  const getProductByArray = gql`
    {
        getProductByArray(array:${productsArray}) {
            id
            image
            name
            price
            stock
        }
    }
    `;
  let { data } = useQuery(getProductByArray);
 
  if (data !== undefined) {
    itemsToCart.forEach((item) => {
      data["getProductByArray"].forEach((elem) => {
        if (item.id === elem.id) {
          item.name = elem.name;
          item.price = elem.price;
          item.stock = elem.stock;
          item.image = elem.image;
        }
      });
    });
    localStorage.setItem(`cart`, JSON.stringify(itemsToCart));
  }
  return (
    <StyledCart>
        {data && itemsToCart.length !==0 ? (
          itemsToCart.map((elem) => (
            <ProductOnCart
              id={elem.id}
              name={elem.name}
              price={elem.price}
              stock={elem.stock}
              image={elem.image}
              quantity={elem.quantity}
            />
          ))
        ) : (
          <EmptyAlert/>
        )}
        <TotalToOrder/> 
    </StyledCart>
  );
};

const StyledCart = styled.div`
  //background: red;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-wrap:wrap;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index:2;
  button{
    z-index:1;
  }
  
`;

export default GuestCart;
