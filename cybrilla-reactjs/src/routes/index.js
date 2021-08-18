import React, { Component } from 'react';
import { Route, Router, Redirect } from "react-router-dom";

import { ProductList, Cart } from '../pages/index'
import {MainLayout} from '../layout/index'

// import Routers from "./routes"

// import * as Layout from "../layout";
// import * as Pages from "../pages"

import { history } from "../helpers"

class RoutesClass extends Component {

    constructor(props) {
        super(props)
        this.state = {
            renderRoute: false,
            pathname: null,
            loading: true
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillReceiveProps({ userPermissionDetails }) {
    }


    render() {

        return (
            <Router history={history} >

                <MainLayout>
                    <Route exact={true} path="/" component={ProductList}></Route>
                    <Route exact={true} path="/cart" component={Cart}></Route>
                </MainLayout>


                {/* {Routers.map(({ component, redirect, path, exact = false, auth = true, childrens = [] }) => {

                    if (childrens.length > 0) {

                        return (
                            <Route
                                path={path}
                                exact={exact}
                                key={path}
                                render={(props) => {

                                    if (redirect) {
                                        if (props.location.pathname == path) {
                                            props.history.push(redirect)
                                        }
                                    }

                                    const LayoutComponent = Layout[component]

                                    return (

                                        <LayoutComponent {...props} >

                                            {childrens.map(({ component: ChildrenComponent, path: childrenPath, exact = false, auth = true }) => {

                                                return <Route
                                                    path={path + childrenPath}
                                                    exact={exact}
                                                    key={path + childrenPath}
                                                    render={(props) => {

                                                        let PageComponent = Pages[ChildrenComponent]

                                                        return <PageComponent {...props} />
                                                    }}

                                                />

                                            })}
                                        </LayoutComponent>
                                    )

                                }}

                            />
                        )


                    }

                    return <Route
                        path={path}
                        exact={exact}
                        key={component || 2322}
                        render={(props) => {
                            if (component) {
                                let PageComponent = Pages[component]
                                return <PageComponent />
                            }
                            if (redirect) {
                                return <Redirect to={redirect} />
                            }
                            return <div></div>
                        }}

                    />

                })} */}

            </Router>
        );

    }

}



export default RoutesClass