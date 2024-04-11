import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Input from "./Component/InputFields/Input";
import DiasplayCard from './Component/CardSection/DiasplayCard'
import { toggleContext } from "./Context";
import './Dark.scss';
import ReactGA from "react-ga4";

function App() {
  const [toggle, setToggle] = useState('light')

  const MEASUREMENT_ID = 'G-JSPFL4DQE5';
  ReactGA.initialize(MEASUREMENT_ID);
  return (
    <>
      <toggleContext.Provider value={{ toggle, setToggle }}>
        <Router>
          <Routes>
            <Route exect path='/' element={<DiasplayCard />} ></Route>
            <Route exect path='/userinput' element={<Input />} ></Route>
          </Routes>
        </Router>
      </toggleContext.Provider>
    </>
  )
}

export default App
