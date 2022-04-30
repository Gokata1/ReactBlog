import React from 'react';
import Topbar from './components/topbar/Topbar.jsx';
import Home from './pages/home/Home.jsx';
import Create from './pages/create/Create.jsx'
import Single from './pages/single/Single.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

import { Routes, Route } from 'react-router-dom';
import Update from './pages/update/Update.jsx';

export default function App() {
  return (
    <>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/create" element={<Create/>} />
        <Route path="/single/:id" element={<Single/>} />
        <Route path="/single/:id/update" element={<Update/>} />
      </Routes>
    </>
  )
}
