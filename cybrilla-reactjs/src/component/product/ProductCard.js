import React, { useState } from 'react'

export const ProductCard = ({ title = false, productId, productName, quantityAvailable, cost, addToProductCart }) => {
    const [productCount, setProductCount] = useState(1);

    return (
        <>
            <div className="d-flex justify-content-between">
                <div className="table-width">  {title ? 'productName' : productName} </div>
                <div className="table-width">  {title ? 'quantityAvailable' : quantityAvailable} </div>
                <div className="table-width">  {title ? 'quantityAvailable' :
                    <>
                        <input type="number"
                            value={productCount}
                            onChange={(e) => {
                                if (e.target.value > 0 && e.target.value <= quantityAvailable) {
                                    setProductCount(e.target.value)
                                }
                            }} />
                    </>
                } </div>
                <div className="table-width">  
                    {title ? 'cost' : cost} 
                </div>
                <div className="table-width">  
                    {
                        title ? 'action' : 
                        <button className="btn btn-danger btn-large" 
                            onClick={() => addToProductCart(productId, productCount)}>
                            Add to cart
                        </button>
                    }  
                </div>
            </div>
            <hr />
        </>
    )
}