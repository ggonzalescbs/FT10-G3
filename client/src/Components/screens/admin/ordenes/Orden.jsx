import React, { useState } from "react";
import styled from "styled-components";
import { Steps } from "rsuite";

import "rsuite/lib/styles/index.less";
/* import "./prueba.css" */
import { useQuery, useMutation } from "@apollo/client";
import { HiOutlineDocumentSearch } from "react-icons/hi";
import { Link } from "react-router-dom";

// @-WenLi
//Recibe id de la orden y la orden...va renderizando los datos que necesita
export default function Orden({ id, orden }) {
  const [orderStatus, setOrderStatus] = useState("unpaid");

  
  let status;
  if (orden.status === "unpaid") status = 0;
  if (orden.status === "paid") status = 1;
  if (orden.status === "received") status = 2;

  const instance = (
    <Steps current={1}>
      <Steps.Item onClick={() => console.log("cambiar status a paid")} />
      <Steps.Item onClick={() => console.log("cambiar status a send")} />
      <Steps.Item onClick={() => console.log("cambiar status a recived")} />
    </Steps>
  );

  if (orden) {
    return (
      <StyledOrden>
        <div className="element-container" id={id}>
          <div className="info-container">
            <div className="text-container">
              <span>Date</span>
              <p>{orden.date}</p>
            </div>
            <div className="text-container">
              <span>Order</span>
              <p>{id}</p>
            </div>
            <div className="text-container">
              <span>UserId</span>
              <p>{orden.userId}</p>
            </div>

            <div className="text-container">
              <span>User Name</span>
              <p>{orden.name}</p>
            </div>
            <div className="status-container">
              <div className="titulos">
                <span>Paid</span>
                <span>Sent</span>
                <span>Received</span>
              </div>
              {instance}
            </div>
            <div className="text-container">
              <span>Cancelled</span>


              {orden.cancelled === false ? (
                <p>O</p>
              ) : (
                <p className="order-cacelled">X</p>
              )}

  
            </div>
            <div className="text-container">
              <span>Total</span>
              <p>{orden.price[0]} </p>
              {/* <p>{orden.price.reduce((total, price) => total + price)} </p> */}
            </div>

            <div className="edit-button">
              <span style={{ color: "green" }}>Detail</span>
              <button>
                <Link to={`/admin/order/${id}`}>
                  <HiOutlineDocumentSearch size="1.8rem" color="green" />
                </Link>
              </button>
            </div>
          </div>
        </div>
      </StyledOrden>
    );
  } else {
    return "Loading";
  }
}

const StyledOrden = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 100%;
  margin-top: 2rem;
  .status-container {
    width: 350px;
    height: 80px;
    padding: 0.5rem;
    align-items: center;
  }
  .info-container {
    height: 80%;
    width: 90%;
    display: flex;
    justify-content: space-between;
  }
  .element-container {
    width: 100%;
    height: 16vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(236, 227, 250);
    border-radius: 40px;
  }
  .element-container span {
    font-weight: 700;
    color: rgb(123, 87, 156);
  }
  .text-container {
    width: 250px;
    height: 80px;
    padding: 0.5rem;
    overflow: hidden;
  }
  .text-container p {
    margin: 0;
    color: grey;
    font-weight: 700;
  }
  .edit-button {
    padding: 0.5rem;
    height: 100%;
    justify-self: center;
    align-self: center;
    justify-content: flex-start;
    align-items: center;
    display: flex;
    flex-direction: column;
  }
  .edit-button button {
    margin-top: 0.5rem;
    border: none;
    background: transparent;
  }
`;
