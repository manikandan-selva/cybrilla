import React, { Component } from 'react'
import cartIconImg from '../assets/images/shopping-cart.png'
import { history } from "../helpers";
import { connect } from 'react-redux';

export class MainLayoutClass extends Component {

    render() {

        let { children, count } = this.props

        return (
            <>
                <header className="cybrilla-header">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-6">
                                <img onClick={() => history.push('/')} src="https://www.cybrilla.com/images/Logo.png" />
                            </div>
                            <div className="col-sm-6 text-right">
                                <span className="cartIcon">
                                    <img onClick={() => history.push('/cart')} className='cart' src={cartIconImg} />
                                    <span>{count}</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </header>
                {children}
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.cart.data
});

export const MainLayout = connect(mapStateToProps, null)(MainLayoutClass);

