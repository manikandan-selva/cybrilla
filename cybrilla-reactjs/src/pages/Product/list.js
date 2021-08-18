import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from "redux"
import { getProductList, addItemToCart } from "action/product"
import { ProductCard } from '../../component/product/index'
import { getCartList } from "action/cart"

export class productListClass extends Component {

    state = {
        totalProductList: []
    }

    componentDidMount() {
        this.getProductList()
    }

    getProductList = () => {
        this.props.getProductList({ page: 1 }).then((data) => {
            this.setState({
                totalProductList: data.data,
            })
            this.props.getCartList()
        })
    }

    handelAddCart = (cartProductId, cartCount) => {
        let body = {
            "userId": "User4",
            "cartId": 1,
            "productId": cartProductId,
            "quantity": cartCount
        }
        this.props.addItemToCart(body).then((data) => {
            this.getProductList()
        })
    }


    render() {
        let { totalProductList = [] } = this.state
        return (
            <>
                <div className="container">
                    <ProductCard title={true} />
                    {
                        totalProductList.map((data, index) => {
                            return (
                                <div key={'product' + index}>
                                    <ProductCard {...data} title={false} addToProductCart={this.handelAddCart} />
                                </div>
                            )
                        })
                    }
                </div>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getProductList,
        addItemToCart,
        getCartList
    }, dispatch)
}


export const ProductList = connect(null, mapDispatchToProps)(productListClass)
