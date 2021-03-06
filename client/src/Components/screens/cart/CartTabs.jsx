import { useQuery } from '@apollo/client';
import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import GET_ORDERS_BY_USER_ID_IN_CART from '../../../Apollo/queries/getOrdersByUserIdInCart';

const CartTabs = () => {
let storage = window.localStorage;
let userId = parseInt(storage.id);
  const { data } = useQuery(GET_ORDERS_BY_USER_ID_IN_CART, {
    variables: { idUser: userId },
    fetchPolicy: "no-cache"
  });
  let logged = storage.token ? true : false; 
  
  const itemsFromCart = useSelector((state) => state.cart.itemsToCart); 
  let valor = 0; 
  let sum = 0;

  if (itemsFromCart !== undefined) {
    itemsFromCart.map((elem) => {
      sum = sum + elem.quantity;
    });
  }
  if(data !== undefined){
    if (data.getOrdersByUserIdInCart.orders.length != 0 ){
      data.getOrdersByUserIdInCart.orders[0].lineal_order.map((element) =>{
        valor = valor + element.quantity
      }); 
    }
  } 
    return (
        <StyledTabs>
            <ul role="tablist" >
                <li className="selected"><Link to="/cart" className="text-decoration-none text-dark tabLink">Cart ({logged ? valor : sum})</Link></li>
                <li><Link to="#" className="text-decoration-none text-muted tabLink">Wishlist (0)</Link></li>
            </ul>
        </StyledTabs>
    )
}

const StyledTabs = styled.div`
width: 80%;
height: fit-content;
border-bottom: 1px solid #e6e6e6;

ul{
display: flex;
padding: 0;
margin: 0;
    li{
        list-style: none;
        padding: 0 4rem 1rem;

        .tabLink{
            font-weight: bold;
        }
    }
    .selected{
            border-bottom: 2px solid #333;
    }
}

`


export default CartTabs
