import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {TravelList} from "./travelList";


function Application() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path={"/"} element={<TravelList/>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<Application />, document.getElementById("app"));
