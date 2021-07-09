import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Components/Home";
import AboutUs from './Components/About';
import ContactUs from './Components/Contact';
import NavBar from './Components/NavBar'
import Mango from "./Components/Mango";
import Cart from "./Components/Cart";
import Signin from "./Components/Signin";
import Register from "./Components/Register";
import ShippingAddress from "./Components/ShippingAddress";
import PaymentMethod from "./Components/PaymentMethod";
import PlaceOrder from "./Components/PlaceOrder";
import Orders from "./Components/Orders";
import OrderHistory from "./Components/OrderHistory";
import Profile from "./Components/Profile";
import PrivateRoute from "./Components/PrivateRoute";
import ProductList from "./Components/ProductList";
import AdminRoute from './Components/AdminRoute'
import ProductEdit from "./Components/ProductEdit";
import OrderList from "./Components/OrderList";
import UserList from "./Components/UserList";
import UserEdit from "./Components/UserEdit";
import Footer from './Components/Footer'

function App() {

  return (
    <div className='App'>
        <Router>
            <NavBar />
            <Switch>
                <Route exact path="/"> <Home /> </Route>
                <Route path="/cart/:id?" component={Cart}></Route>
                <Route path="/mango/:id" component={Mango}></Route>
                <Route path="/product/:id/edit" exact component={ProductEdit}></Route>
                <Route path="/signin" component={Signin}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/shipping" component={ShippingAddress}></Route>
                <Route path="/payment" component={PaymentMethod}></Route>
                <Route path="/placeorder" component={PlaceOrder}></Route>
                <Route path="/orders/:id" component={Orders}></Route>
                <Route path="/orderhistory" component={OrderHistory}></Route>
                <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
                <AdminRoute path="/productlist" component={ProductList}></AdminRoute>
                <AdminRoute path="/orderlist" component={OrderList}></AdminRoute>
                <AdminRoute path="/userlist" component={UserList}></AdminRoute>
                <AdminRoute path="/user/:id/edit" component={UserEdit}></AdminRoute>
                <Route exact path="/about-us"><AboutUs /></Route>
                <Route exact path="/contact-us"><ContactUs /></Route>
            </Switch>
        </Router>
        <Footer />
    </div>
  );
}

export default App;
