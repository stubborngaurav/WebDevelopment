import React from "react";
import Avatar from "./avatar";

function card(props){
    return(
    <div className="card"> 
    <div className="top">
        <h2 className="name">{props.name}</h2>
        <Avatar imgURL={props.imgURL}/>
    </div>

    <div className="bottom">
        <p className="info">{props.phone} </p>
        <p className="info">{props.email} </p>
    </div>

</div>)
}

export default card;