import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function TravelList() {



    return <body>
            <section id="todoapp">
                <header id="header">
                    <h1>Travel-List</h1>
                    <input id="new-todo" placeholder="Country I want to visit" value=""/>
                </header>
                <section id="main">
                    <ul id="todo-list">
                        
                        <li>
                            <div className="view">
                                <button className="complete yes"/>
                                <label>Norway</label>
                                <button className="destroy"/>
                            </div>
                        </li>
                        <li>
                            <div className="view">
                                <button className="complete yes"/>
                                <label>Sweden</label>
                                <button className="destroy"/>
                            </div>
                        </li>
                        <li>
                            <div className="view">
                                <button className="complete no"/>
                                <label>Argentina</label>
                                <button className="destroy"/>
                            </div>
                        </li>
                        <li>
                            <div className="view">
                                <button className="complete no"/>
                                <label>Mexico</label>
                                <button className="destroy"/>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
    </body>
}

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
