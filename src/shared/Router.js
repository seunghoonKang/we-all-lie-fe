import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import Home from '../pages/Home';
import Room from '../pages/Room';
import User from '../pages/User';
import Kakao from '../components/login/kakao';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="api/auth/kakao/callback" component={Kakao}></Route>
        <Route path="/home" element={<Home />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="/user/:id" element={<User />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
