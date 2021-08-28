import React, { Component } from 'react';
import { Route, Redirect } from "react-router-dom";

class routerGuard extends Component {
    render() {
        const { routerConfig, location } = this.props;
        const { pathname } = location;
        const isLogin = localStorage.getItem("token");

        const targetRouterConfig = routerConfig.find(item => item.path === pathname);
        if (targetRouterConfig && !targetRouterConfig.auth && !isLogin) {
            const { component } = targetRouterConfig;
            return <Route exact path={pathname} component={component} />;
        }
        if (isLogin) {
            if (pathname === "/login") {
                return <Redirect to="/" />;
            } else {
                if (targetRouterConfig) {
                    return (
                        <Route path={pathname} component={targetRouterConfig.component} />
                    );
                } else {
                    return <Redirect to="/404" />;
                }
            }
        } else {
            if (targetRouterConfig && targetRouterConfig.auth) {
                return <Redirect to="/login" />;
            } else {
                return <Redirect to="/404" />;
            }
        }

    }
}

export default routerGuard;