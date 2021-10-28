import React, { useEffect, useState } from 'react';
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// components
import Header from "./components/nav/Header";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import RegisterComplete from "./pages/auth/RegisterComplete";
import ForgotPassword from "./pages/auth/ForgotPassword";
import History from "./pages/user/History";
import UserRoute from './components/routes/UserRoute';
import AdminRoute from './components/routes/AdminRoute';
import Password from "./pages/user/Password";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BookCreate from "./pages/admin/book/BookCreate";
import BookUpdate from "./pages/admin/book/BookUpdate";
import ReserveCreate from "./pages/admin/reserve/ReserveCreate";
import ReserveUpdate from "./pages/admin/reserve/ReserveUpdate";

import { auth } from "./firebase";
import { currentUser } from "./functions/user";

const App = () => {
  const [userState, setUserState] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        currentUser(idTokenResult.token)
          .then((res) => {
            setUserState({
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            });
          })
          .catch((err) => console.log(err));
      }
    });
    // good practice of firebase - cleanup
    return () => unsubscribe();
  }, []);

  return (
    <>
      <Header userState={userState} setUserState={setUserState} />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login">
          <Login userState={userState} setUserState={setUserState} />
        </Route>
        <Route exact path="/register">
          <Register userState={userState}/>
        </Route>
        <Route exact path="/register/complete">
          <RegisterComplete setUserState={setUserState} />
        </Route>
        <Route exact path="/forgot/password">
          <ForgotPassword userState={userState} />
        </Route>
        <UserRoute exact path="/user/history" userState={userState} component={History}/>
        <UserRoute exact path="/user/password" userState={userState} component={Password}/>
        <AdminRoute exact path="/admin/dashboard" userState={userState} component={AdminDashboard}/>
        <AdminRoute exact path="/admin/book" userState={userState} component={BookCreate}/>
        <AdminRoute exact path="/admin/book:slug" userState={userState} component={BookUpdate}/>
        <AdminRoute exact path="/admin/reserve" userState={userState} component={ReserveCreate}/>
        <AdminRoute exact path="/admin/reserve:slug" userState={userState} component={ReserveUpdate}/>
      </Switch>
    </>
  )
};

export default App;