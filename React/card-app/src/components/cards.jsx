import React from "react";
import Avatar from "./avatar";

function cards(props){
    
    //console.log(props);

    const items = []
    for(var i=0; i<props.contacts.length; i++){
        items.push(
            <div className="card" key={i}> 
                <div className="top">
                    <h2 className="name">{props.contacts[i].name}</h2>
                    <Avatar imgURL={props.contacts[i].imgURL}/>
                </div>

                <div className="bottom">
                    <p className="info">{props.contacts[i].phone} </p>
                    <p className="info">{props.contacts[i].email} </p>
                </div>

            </div>
        )
    }

    return (
        <div>
            {items}
        </div>
    )
}

export default cards;