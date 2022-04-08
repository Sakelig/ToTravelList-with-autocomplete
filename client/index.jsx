import React, {useState} from "react";
import ReactDOM from "react-dom";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {useLoading} from "./useLoading";
import {fetchJSON} from "./fetchJSON";


function CountryCard({country, completed}) {



    return <div className="view">
        {completed ? <button className="complete yes"/> : <button className="complete no"/>}
        <label>{country}</label>
        <button className="destroy" onClick={() => country}/>
    </div>;
}

function TravelList() {

    const [input, setInput] = useState("")
    const [suggestions, setSuggestions] = useState([])
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

    console.log(data[0].name)

    function onSuggestHandler(suggestion) {
        setInput(suggestion)
        setSuggestions([])
    }

    function onChangeHandler(text) {
        let matches = []

        // Find matching countries
        if (text.length > 0) {
            matches = data.filter(country => {
                const regex = new RegExp(`^${text}`, "gi");
                return country.name.match(regex);
            })
        }

        // Check if the country is already added to addedCountries
        if (matches.length > 0) {
            matches = matches.filter(country => {
                return !addedCountries.some(addedCountry => addedCountry.country === country.name)
            })
        }

        console.log("matches", matches)
        setSuggestions(matches)
        setInput(text)
    }

    return <div>
        <section id="todoapp">
            <header id="header">
                <h1>Travel-List</h1>
                <input id="new-todo" placeholder="Country I want to visit"
                       value={input}
                       onChange={(e) => onChangeHandler(e.target.value)}
                       onBlur={() => {
                           setTimeout(() => {
                               setSuggestions([])
                           }, 100)
                       }
                       }
                       onKeyPress={(e) => {
                           if (e.key === "Enter") {
                               e.preventDefault()
                               console.log(e.target.value)
                               // check if  country is already added to addedCountries
                               let country = addedCountries.find(country => country.country.toLowerCase() === e.target.value.toLowerCase())
                               if (country) {
                                   alert(country.country+ ' is already added')
                               } else {
                                   setAddedCountries([...addedCountries, {country: e.target.value, completed: false}])
                               }
                               console.log(country)
                               setInput("")
                           }
                       }
                       }/>
                {suggestions && suggestions.map((suggestions, i) =>
                    <div key={i} onClick={() => onSuggestHandler(suggestions.name)}>
                        <span className="suggestion">{suggestions.name}</span>
                    </div>
                )}
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
