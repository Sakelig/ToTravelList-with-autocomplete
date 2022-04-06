import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useLoading} from "./useLoading";
import {fetchJSON} from "./fetchJSON";


function CountryCard({country, completed}) {
    return <div className="view">
        {completed ? <button className="complete yes"/> : <button className="complete no"/>}
        <label>{country}</label>
        <button className="destroy"/>
    </div>;
}

function TravelList() {

    const [input, setInput] = useState("")
    const [addedCountries, setAddedCountries] = useState([
        {
            country: "Norway",
            completed: true
        },
        {
            country: "Sweden",
            completed: true
        },
        {
            country: "Argentina",
            completed: false
        },
        {
            country: "Mexico",
            completed: false
        }
    ])


    const { loading, error, data } = useLoading(async () =>
        fetchJSON("https://restcountries.com/v2/all")
    );

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return (
            <div>
                <h1>Error</h1>
                <div>{error.toString()}</div>
            </div>
        );
    }

    console.log(data[1].name)



    return <div>
        <section id="todoapp">
            <header id="header">
                <h1>Travel-List</h1>
                <input id="new-todo" placeholder="Country I want to visit"
                       value={input}
                       onChange={(e) => setInput(e.target.value)}
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               e.preventDefault()
                               console.log(e.target.value)
                                setAddedCountries(
                                    prevState => [...prevState, {country: input, completed: false}]
                                )
                           }
                       }
                       }/>
            </header>
            <section id="main">
                <ul id="todo-list">
                    {addedCountries.map((country) => (
                        <li key={country.country}>
                            <CountryCard country={country.country} completed={country.completed} />
                        </li>
                    ))}
                </ul>
            </section>
        </section>
    </div>
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
