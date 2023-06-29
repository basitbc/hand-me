import auth from "./auth/reducer";
import register from "./register/reducer";

import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import products from "./products/reducer";
import customers from "./customers/reducer";
import priceList from "./priceList/reducer";
import csv from "./csv/reducer";
import account from "./accounts/reducer";
import cart from "./cart/reducer";
import asyncStorage from "./asyncStorage/reducer";
import order from "./orders/reducer";

const createReducer = (asyncReducers) =>
  combineReducers({
    auth,
    register,
    products,
    customers,
    csv,
    priceList,
    order,
    asyncStorage,
    account,
    cart,

    router: routerReducer,
    ...asyncReducers,
  });

export default createReducer;
