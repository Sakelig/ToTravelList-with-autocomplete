import React from "react";

export function CountryCard({country, completed, handleDelete, handleToggle}) {

    return <div className="view">
        {completed ? <button onClick={handleToggle} className="complete yes"/> :
            <button onClick={handleToggle} className="complete no"/>}
        <label>{country}</label>
        <button className="destroy" onClick={handleDelete}/>
    </div>;
}