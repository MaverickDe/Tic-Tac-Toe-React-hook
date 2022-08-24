import React   from "react";
import ReactDOM  from "react-dom/client";
import {BrowserRouter as Router , Routes,Route} from "react-router-dom"

// import './App.css';
import Tiktakto from './tiktakto';
// import Counts from './component2';

// import reportWebVitals from './reportWebVitals';

// const element =<h1>hello world</h1>

// ReactDOM.render(App,document.getElementById('root'))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div className="body" style={{
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column"
  }}>
   <Tiktakto />
  </div>
);


