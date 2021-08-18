import React, { Component } from 'react'

export const CartCard = ({ title = false, cartId, productName, discount, cost, quantity }) => {

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="table-width">  {title ? 'cartId' : cartId} </div>
                <div className="table-width">  {title ? 'discount' : discount} </div>
                <div className="table-width">  {title ? 'productName' : productName} </div>
                <div className="table-width">  {title ? 'quantity' : quantity} </div>
                <div className="table-width">  {title ? 'cost' : cost} </div>
            </div>
            <hr />
        </>
    )
}