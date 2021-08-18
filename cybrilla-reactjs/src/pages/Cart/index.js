import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { getCartList } from "action/cart"

import { CartCard } from '../../component/Cart/index'

export class CartClass extends Component {

    state = {
        cartProductList: [],
        additionalDiscountPrice: 0,
        totalWithDiscountsPrice: 0,
        totalWithOutDiscountsPrice: 0
    }

    componentDidMount() {

        this.props.getCartList({ userId: 'User4', cartId: 1 }).then((data) => {
            this.setState({
                cartProductList: data.data.cartDetails,
                additionalDiscountPrice: data.data.additionalDiscount,
                totalWithDiscountsPrice: data.data.totalWithDiscounts,
                totalWithOutDiscountsPrice: data.data.totalWithOutDiscounts
            })

        })

    }



    render() {
        let { cartProductList = [], additionalDiscountPrice, totalWithDiscountsPrice, totalWithOutDiscountsPrice } = this.state
        return (
            <>
                <div className="container">
                    <CartCard title={true} />
                    {
                        cartProductList.map((data, index) => {
                            return (
                                <div className="" key={'product' + index}>
                                    <CartCard {...data} addToCart={this.handelAddCart} />
                                </div>
                            )
                        })
                    }


                    <div className="d-flex justify-content-between">
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}> Total  <hr /></div>
                        <div style={{ 'width': '20%' }}>  {totalWithOutDiscountsPrice}  ₹<hr /></div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}> Discount
            <hr />

                        </div>
                        <div style={{ 'width': '20%' }}> {additionalDiscountPrice} ₹
                        <hr /></div>
                    </div>

                    <div className="d-flex justify-content-between">
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}>  </div>
                        <div style={{ 'width': '20%' }}> <h4>Total</h4>  <hr /></div>
                        <div style={{ 'width': '20%' }}> <h4> {additionalDiscountPrice > 0 ? totalWithDiscountsPrice : totalWithOutDiscountsPrice} ₹</h4> <hr /></div>
                    </div>

                </div>

            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getCartList
    }, dispatch)
}


export const Cart = connect(null, mapDispatchToProps)(CartClass)
