import React from 'react'
import {useSelector} from 'react-redux'
import { toast } from "react-toastify";
import '../../../Assets/toast.css'; 


//styles
import styled from "styled-components";

toast.configure()

const TotalToOrder = () => {
    const customId = "custom-id-yes";
    const itemsFromCart = useSelector(state=>state.cart.itemsToCart);
    let total = 0;
    if(itemsFromCart!=undefined){itemsFromCart.map(elem => {total = total + (elem.price)*(elem.quantity)} )}
    
    const clickHandler = () => {
       toast('Debe estar logueado para comprar, doble click en "comprar" para loguearse',{
        toastId: customId
      }) 
    }
    const doubleClickHandler = () => {
        window.location.href = "http://localhost:3000/log-in"; 
     }

    return (
        <StyledTotal>
            <div className="topp">
                <div className="textt">
                    Total:
                </div>
                <div className="numberr">
                    ${total}
                </div>
            </div>
            <div className="buttonContainer">
                <button className="payMee" onClick={clickHandler} onDoubleClick={doubleClickHandler}>Comprar</button>
            </div>
            
        </StyledTotal>
    )
}

const StyledTotal = styled.div`
    //background: black;
    height: 12vh;
    width: 65%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    //align-items: center;
    z-index:1;
    margin-top:5rem;
    margin-bottom:10rem;
    .buttonContainer{
        //background:violet;
        width:87%;
        display:flex;
        justify-content:flex-end;
        .payMee{
            z-index:1;
            display:flex;
            justify-content:center;
            padding:1rem 5.5rem;
            background:#755588;
            color:white;
            border:none;
            border-radius: 20px;
            font-size:1.2rem;
        }
    }
    //background:green;
    .topp{
        height:3rem;
        width:100%;
        font-size:1.8rem;
        //background:red;
        display: flex;
        justify-content: flex-end;
        align-items: center;
    .textt{
        display:flex;
        justify-content: flex-end;
        align-items: center;
        text-align:right;
        width:auto;
        //background:yellow;
    }
    .numberr{
        //background:blue;
        width:auto;
        margin-left:1rem;
        padding-right:13%;
        
    }
  }
  
`;

export default TotalToOrder
